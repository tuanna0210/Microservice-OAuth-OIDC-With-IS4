using Carter;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;

namespace Catalog.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddCarter();

            services.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly());
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {

                options.Authority = configuration.GetSection("Authorization:IdentityServerBaseUrl").Get<string>();
                options.Audience = configuration.GetSection("Authorization:ApiResource:Name").Get<string>();
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateAudience = true,//Validate weather of not the "aud" claim contains this resource (options.Audience) as audience
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
            });
            return services;
        }

        public static WebApplication UseServices(this WebApplication app)
        {
            app.MapCarter();
            return app;
        }
    }
}
