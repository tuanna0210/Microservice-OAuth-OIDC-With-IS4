FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/ECommerce.Admin.Api/ECommerce.Admin.Api.csproj", "src/ECommerce.Admin.Api/"]
COPY ["src/ECommerce.Admin.EntityFramework.Shared/ECommerce.Admin.EntityFramework.Shared.csproj", "src/ECommerce.Admin.EntityFramework.Shared/"]
COPY ["src/ECommerce.Admin.EntityFramework.SqlServer/ECommerce.Admin.EntityFramework.SqlServer.csproj", "src/ECommerce.Admin.EntityFramework.SqlServer/"]
COPY ["src/ECommerce.Shared/ECommerce.Shared.csproj", "src/ECommerce.Shared/"]
COPY ["src/ECommerce.Admin.EntityFramework.PostgreSQL/ECommerce.Admin.EntityFramework.PostgreSQL.csproj", "src/ECommerce.Admin.EntityFramework.PostgreSQL/"]
COPY ["src/ECommerce.Admin.EntityFramework.MySql/ECommerce.Admin.EntityFramework.MySql.csproj", "src/ECommerce.Admin.EntityFramework.MySql/"]
RUN dotnet restore "src/ECommerce.Admin.Api/ECommerce.Admin.Api.csproj"
COPY . .
WORKDIR "/src/src/ECommerce.Admin.Api"
RUN dotnet build "ECommerce.Admin.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ECommerce.Admin.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_FORWARDEDHEADERS_ENABLED=true
ENTRYPOINT ["dotnet", "ECommerce.Admin.Api.dll"]