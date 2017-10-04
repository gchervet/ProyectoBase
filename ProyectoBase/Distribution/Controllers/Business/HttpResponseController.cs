using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Distribution
{
    /// <summary>
    /// Clase administradora de tipos que representan devoluciones Http
    /// </summary>
    public class HttpResponseController : ApiController
    {
        /// <summary>
        /// Genera una devolución HTTP de status 200.
        /// </summary>
        /// <param name="contentObject">Contenido JSON de la devolución</param>
        /// <returns>Objeto HttpResponseMessage que representa la devolución 200.</returns>
        public static HttpResponseMessage Return_200_OK(object contentObject)
        {
            return new HttpResponseMessage()
            {
                Content = new StringContent(new JavaScriptSerializer().Serialize(contentObject), Encoding.UTF8, "application/json")
            };
        }

        /// <summary>
        /// Genera una devolución HTTP de status 401.
        /// </summary>
        /// <param name="responseMessage">Mensaje de devolución opcional.</param>
        /// <returns>Objeto HttpResponseMessage que representa la devolución 401.</returns>
        public static HttpResponseMessage Return_401_Unauthorized(string responseMessage)
        {
            return new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.Unauthorized,
                Content = new StringContent(responseMessage)
            };
        }
    }
}