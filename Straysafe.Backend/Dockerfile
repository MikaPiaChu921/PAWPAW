# See https://aka.ms/customizecontainer to learn how to customize your debug container 
# and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Create a directory for the app to write files
RUN mkdir -p /app/wwwroot/files && \
    chown -R app:app /app/wwwroot/files && \
    chmod -R 755 /app/wwwroot/files

# GIVING WRITE ACCESS
USER root
RUN chmod -R 755 /app/wwwroot/files

# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Straysafe.Backend.csproj", "."]
RUN dotnet restore "./Straysafe.Backend.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "Straysafe.Backend.csproj" -c Release -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
RUN dotnet publish "Straysafe.Backend.csproj" -c Release -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .


ENTRYPOINT ["dotnet", "Straysafe.Backend.dll"]
