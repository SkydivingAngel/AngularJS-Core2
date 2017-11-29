namespace AngularJsCore
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Rewrite;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            ViewsRedirectRule.SiteAddress = GetServerAdress(configuration);
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();

            var options = new RewriteOptions()
                .Add(new ViewsRedirectRule(
                    matchPaths: new[] { "/login", "/home", "/prodotti" },
                    newPath: "/"));

            app.UseRewriter(options);

            app.UseMvc();
        }

        public string GetServerAdress(IConfiguration configuration)
        {
            return configuration.GetSection("WebSiteAddress").GetValue<string>("DEFAULT");
        }
    }
}
