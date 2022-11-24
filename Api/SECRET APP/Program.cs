using Database.Models.Context;
using Microsoft.EntityFrameworkCore;
using SECRET_APP;

internal class Program
{
	private static void Main(string[] args)
	{
		CreateHostBuilder(args).Build().Run();
	}

	public static IHostBuilder CreateHostBuilder(string[] args) =>
		Host.CreateDefaultBuilder(args)
			.ConfigureServices((context, services) =>
			{
				services.AddDbContext<Context>(options =>
					options.UseSqlServer(context.Configuration.GetConnectionString("DBConnection"))
				);
			})
			.ConfigureWebHostDefaults(webBuilder =>
			{
				webBuilder.UseStartup<Startup>();
			});
}