using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using SOFA_API.Hubs;

namespace SOFA_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            string securityKey = Configuration["JWT:SecretKey"];
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["JWT:Issuser"],
                        ValidAudience = Configuration["JWT:Audience"],
                        IssuerSigningKey = symmetricSecurityKey
                    };
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/message")))
                            {
                                context.Token = accessToken;
                            }
                            if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/notification")))
                            {
                                context.Token = accessToken;
                            }
                            if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/online")))
                            {
                                context.Token = accessToken;
                            }
                            return Task.CompletedTask;
                        }
                    };
                });
            services.AddCors(option =>
            {
                option.AddPolicy("AllowOrigin", builder => builder.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());
            });
            services.AddControllers();

            services.AddSignalR(options=>
            {
                options.EnableDetailedErrors = true;
            });
            services.AddSingleton<IUserIdProvider, UserProvider>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("AllowOrigin");
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                Path.Combine(@"C:/inetpub/wwwroot/assets/")),
                RequestPath = "/assets"
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<MessageHub>("/message");
                endpoints.MapHub<NotificationHub>("/notification");
                endpoints.MapHub<NotificationHub>("/online");
                endpoints.MapControllers();
            });
        }
    }
}
