using Autofac;
using Services.Impl;
using Services.Interfaces;

namespace SECRET_APP.AutofacModules
{
	public class ServiceModule : Module
	{
		protected override void Load(ContainerBuilder builder)
		{
			builder.RegisterType<LoginService>().As<ILoginService>().PropertiesAutowired().InstancePerRequest();
		}
	}
}
