using System.Linq.Expressions;
using TestToShow.Domain.Common.Entities;
using TestToShow.Infrastructure.Persistence.Converters;
using Microsoft.EntityFrameworkCore;

namespace TestToShow.Infrastructure.Persistence.DbContexts;

public class BaseDbContext<TDbContext>(DbContextOptions<TDbContext> options)
    : DbContext(options) where TDbContext : DbContext
{
    public override int SaveChanges()
    {
        // Before saving changes, update timestamps
        UpdateTimestamps();

        // Call the base SaveChanges method to persist changes to the database
        return base.SaveChanges();
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        // Before saving changes, update timestamps
        UpdateTimestamps();

        // Call the base SaveChangesAsync method to persist changes to the database
        return await base.SaveChangesAsync(cancellationToken);
    }

    private void UpdateTimestamps()
    {
        var entries = ChangeTracker.Entries<BaseEntity>();

        foreach (var entry in entries)
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = DateTime.UtcNow;
            }

            // Update the timestamp for all entities
            entry.Entity.UpdatedAt = DateTime.UtcNow;
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        ApplyGlobalFilters(modelBuilder);
        AddDateTimeConverters(modelBuilder);
        modelBuilder.HasPostgresExtension("uuid-ossp");
    }


    private void ApplyGlobalFilters(ModelBuilder modelBuilder)
    {
        var entityTypes = modelBuilder.Model.GetEntityTypes();

        foreach (var entityType in entityTypes)
        {
            if (IsBaseEntity(entityType.ClrType))
            {
                var filter = CreateIsDeletedFilterExpression(entityType.ClrType);
                modelBuilder.Entity(entityType.ClrType).HasQueryFilter(filter);
            }
        }
    }

    private bool IsBaseEntity(Type type) =>
        typeof(BaseEntity).IsAssignableFrom(type);

    private static LambdaExpression CreateIsDeletedFilterExpression(Type entityType)
    {
        var parameter = Expression.Parameter(entityType, "e");
        var property = Expression.Property(parameter, nameof(BaseEntity.IsDeleted));
        var IsDeletedFalse = Expression.Equal(property, Expression.Constant(false));
        return Expression.Lambda(IsDeletedFalse, parameter);
    }

    private void AddDateTimeConverters(ModelBuilder modelBuilder)
    {
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTime))
                {
                    property.SetValueConverter(new DateTimeToUtcConverter());
                }
            }
        }
    }
}