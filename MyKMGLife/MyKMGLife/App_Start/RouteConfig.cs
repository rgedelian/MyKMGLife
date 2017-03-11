using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace MyKMGLife
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("*.js|css|swf|eot|ttf|woff|woff2|svg|otf");
            routes.IgnoreRoute("Content/{*pathInfo}");
            routes.IgnoreRoute("Fonts/{*pathInfo}");
            routes.IgnoreRoute("Scripts/{*pathInfo}");
            routes.IgnoreRoute("kmg-app/{*pathInfo}");

            // enables use of attributes to control routes
            routes.MapMvcAttributeRoutes();

            // Route override for all requests to go to index (for SPA).  this should probably be the last route
            routes.MapRoute(
                name: "SPAroute",
                url: "{*.}",
                defaults: new { controller = "SPA", action = "Index" }
            );
        }
    }
}
