FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/ECommerce.STS.Identity/ECommerce.STS.Identity.csproj", "src/ECommerce.STS.Identity/"]
COPY ["src/ECommerce.Admin.EntityFramework.Shared/ECommerce.Admin.EntityFramework.Shared.csproj", "src/ECommerce.Admin.EntityFramework.Shared/"]
COPY ["src/ECommerce.Shared/ECommerce.Shared.csproj", "src/ECommerce.Shared/"]
RUN dotnet restore "src/ECommerce.STS.Identity/ECommerce.STS.Identity.csproj"
COPY . .
WORKDIR "/src/src/ECommerce.STS.Identity"
RUN dotnet build "ECommerce.STS.Identity.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ECommerce.STS.Identity.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_FORWARDEDHEADERS_ENABLED=true
ENTRYPOINT ["dotnet", "ECommerce.STS.Identity.dll"]