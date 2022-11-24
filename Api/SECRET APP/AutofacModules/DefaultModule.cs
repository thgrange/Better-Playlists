using Autofac;
using Autofac.Core;
using Autofac.Core.Registration;
using Database.Interfaces.Repositories;
using Database.Repositories;

namespace SECRET_APP.AutofacModules
{
	public class DefaultModule : Module
	{
		protected override void Load(ContainerBuilder builder)
		{
			builder.RegisterModule(new ServiceModule());
			builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().PropertiesAutowired().InstancePerRequest();
		}		
	}
}
