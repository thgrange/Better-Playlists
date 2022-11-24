using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using Database.Interfaces.Repositories;
using Database.Models.Context;
using Database.Repositories;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using SECRET_APP.AutofacModules;
using SECRET_APP.Interfaces;
using Services.Impl;
using Services.Interfaces;
using System;
using System.Reflection;
using System.Web.Http.Dependencies;
using System.Web.Mvc;

namespace SECRET_APP
{
	public class Startup
	{
		public IConfiguration Configuration { get; }
		public ContainerBuilder containerBuilder { get; }

		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
			containerBuilder = new ContainerBuilder();
		}

		public void ConfigureServices(IServiceCollection services)
		{
			services.AddControllers();
			services.AddEndpointsApiExplorer();
			services.AddSwaggerGen();
			services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
				.AddCookie(options =>
				{
					options.LoginPath = "/login";
					options.AccessDeniedPath = "/Account/Forbidden/";
					options.LogoutPath = "/logout";
				});
			services.AddAuthentication(options =>
			{
				options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
			});
			ConfigureInstances(services);
		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			app.UseRouting();
			app.UseAuthorization();
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
			if (env.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}
			app.UseHttpsRedirection();
		}

		public void RegisterGenerics(IServiceCollection services, Assembly assembly, Type genericType)
		{
			AppDomain.CurrentDomain.GetAssemblies()
				.FirstOrDefault(a => a.FullName == assembly.FullName)
				.GetTypes()
				.Where(x => x.IsAssignableFrom(genericType) && !x.IsAbstract && !x.IsInterface)
				.ToList()
				.ForEach(t =>
				{
					services.AddTransient(genericType, t);
				});
		}

		private void ConfigureInstances(IServiceCollection services)
		{
			services.AddScoped<ILoginService, LoginService>();
			services.AddScoped<IUnitOfWork, UnitOfWork>();
			RegisterGenerics(services, Assembly.GetExecutingAssembly(), typeof(IHandler<>));
		}
	}
}
