using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace TestToShow.Infrastructure.Persistence.Converters;

public class DateTimeToUtcConverter() : ValueConverter<DateTime, DateTime>(v => v.ToUniversalTime(),
    v => DateTime.SpecifyKind(v, DateTimeKind.Utc));