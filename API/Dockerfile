FROM mcr.microsoft.com/dotnet/core/sdk:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:7.0 AS build
WORKDIR /src
COPY *.csproj .
RUN dotnet restore *.csproj
COPY . .
WORKDIR "/src/app"
RUN dotnet build "*.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "*.csproj" -c Release -o /app/publish /p:useAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "E-Store.dll"]