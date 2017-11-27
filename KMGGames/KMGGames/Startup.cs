using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(KMGGames.Startup))]
namespace KMGGames
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
