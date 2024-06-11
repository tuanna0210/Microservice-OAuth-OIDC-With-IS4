FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/ECommerce.Admin/ECommerce.Admin.csproj", "src/ECommerce.Admin/"]
COPY ["src/ECommerce.Admin.EntityFramework.Shared/ECommerce.Admin.EntityFramework.Shared.csproj", "src/ECommerce.Admin.EntityFramework.Shared/"]
COPY ["src/ECommerce.Admin.EntityFramework.SqlServer/ECommerce.Admin.EntityFramework.SqlServer.csproj", "src/ECommerce.Admin.EntityFramework.SqlServer/"]
COPY ["src/ECommerce.Shared/ECommerce.Shared.csproj", "src/ECommerce.Shared/"]
COPY ["src/ECommerce.Admin.EntityFramework.PostgreSQL/ECommerce.Admin.EntityFramework.PostgreSQL.csproj", "src/ECommerce.Admin.EntityFramework.PostgreSQL/"]
COPY ["src/ECommerce.Admin.EntityFramework.MySql/ECommerce.Admin.EntityFramework.MySql.csproj", "src/ECommerce.Admin.EntityFramework.MySql/"]
RUN dotnet restore "src/ECommerce.Admin/ECommerce.Admin.csproj"
COPY . .
WORKDIR "/src/src/ECommerce.Admin"
RUN dotnet build "ECommerce.Admin.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ECommerce.Admin.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_FORWARDEDHEADERS_ENABLED=true
ENTRYPOINT ["dotnet", "ECommerce.Admin.dll"]