#!/bin/bash
# MATRIXA ASP.NET Core Backend Setup Script
# Run this once you have installed the .NET 8 SDK

echo "Setting up MATRIXA Clean Architecture Backend..."

mkdir -p backend
cd backend

dotnet new sln -n Matrixa

dotnet new webapi -n Matrixa.API
dotnet new classlib -n Matrixa.Application
dotnet new classlib -n Matrixa.Domain
dotnet new classlib -n Matrixa.Infrastructure

dotnet sln add Matrixa.API/Matrixa.API.csproj \
               Matrixa.Application/Matrixa.Application.csproj \
               Matrixa.Domain/Matrixa.Domain.csproj \
               Matrixa.Infrastructure/Matrixa.Infrastructure.csproj

dotnet add Matrixa.API/Matrixa.API.csproj reference Matrixa.Application/Matrixa.Application.csproj
dotnet add Matrixa.Infrastructure/Matrixa.Infrastructure.csproj reference Matrixa.Application/Matrixa.Application.csproj
dotnet add Matrixa.Application/Matrixa.Application.csproj reference Matrixa.Domain/Matrixa.Domain.csproj

mkdir -p Matrixa.Domain/Entities Matrixa.Domain/Enums Matrixa.Domain/Interfaces
mkdir -p Matrixa.Application/DTOs Matrixa.Application/Interfaces Matrixa.Application/Services

rm -f Matrixa.API/WeatherForecast.cs Matrixa.API/Controllers/WeatherForecastController.cs
rm -f Matrixa.Application/Class1.cs Matrixa.Domain/Class1.cs Matrixa.Infrastructure/Class1.cs

echo "Backend scaffolding complete."
