FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["TestToShowSeed/TestToShowSeed.csproj", "TestToShowSeed/"]
COPY ["TestToShow/TestToShow.csproj", "TestToShow/"]
RUN dotnet restore "TestToShowSeed/TestToShowSeed.csproj"
COPY . .
WORKDIR "/src/TestToShowSeed"
RUN dotnet build "TestToShowSeed.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "TestToShowSeed.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TestToShowSeed.dll"]
