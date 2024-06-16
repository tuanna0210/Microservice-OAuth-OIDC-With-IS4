using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Order.API.Contracts.Configurations;
using Order.API.Contracts.Services;
using Order.API.HttpMessageHandlers;
using System.Reflection;

namespace Order.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IProductService, ProductService>();

            services.Configure<Authorization>(configuration.GetSection("Authorization"));
            var authorizationConfig = configuration.GetSection("Authorization").Get<Authorization>();

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
                options.Audience = configuration.GetSection("Authorization:ApiResource:Name").Get<string>(); ;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateAudience = true,//Validate weather of not the "aud" claim contains this resource (options.Audience) as audience
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
            });

            //Register HttpClients
            services.AddTransient<ProtectedApiBearerTokenHandler>();


            services.AddHttpClient<IOauthService, OauthService>();
            services.AddHttpClient<IProductService, ProductService>(client =>
                {
                    client.BaseAddress = new Uri(configuration.GetSection("ServiceEndpoints:CatalogService").Get<string>()!);
                    client.DefaultRequestHeaders.Add("Accept", "application/json");
                })
                .AddHttpMessageHandler<ProtectedApiBearerTokenHandler>();//Add bearer token for protected resources's request
                                                                         //Can also use RefreshTokenDelegatingHandler fron IdentityModel package for more functionality

            return services;
        }
        public static WebApplication UseServices(this WebApplication app)
        {
            return app;
        }
    }
}
