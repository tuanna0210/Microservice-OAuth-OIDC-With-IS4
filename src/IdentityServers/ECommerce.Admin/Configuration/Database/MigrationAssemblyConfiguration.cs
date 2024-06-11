﻿using Skoruba.IdentityServer4.Admin.EntityFramework.Configuration.Configuration;
using System;
using System.Reflection;
using SqlMigrationAssembly = ECommerce.Admin.EntityFramework.SqlServer.Helpers.MigrationAssembly;

namespace ECommerce.Admin.Configuration.Database
{
    public static class MigrationAssemblyConfiguration
    {
        public static string GetMigrationAssemblyByProvider(DatabaseProviderConfiguration databaseProvider)
        {
            return databaseProvider.ProviderType switch
            {
                DatabaseProviderType.SqlServer => typeof(SqlMigrationAssembly).GetTypeInfo().Assembly.GetName().Name,
                _ => throw new ArgumentOutOfRangeException()
            };
        }
    }
}







