using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Distribution
{
    public static class WebApiConfig
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();

        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services            
            logger.Info(" - APPLICATION START");

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
