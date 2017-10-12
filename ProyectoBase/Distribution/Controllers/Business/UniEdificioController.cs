using Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Distribution
{
    [RoutePrefix("api/UniEdificio")]
    public class UniEdificioController : ApiController
    {
        /// <summary>
        /// Obtiene un objeto de alumno. El legajo puede ser provisorio o definitivo.
        /// </summary>
        /// <param name="legajo">Número de legajo.</param>
        /// <returns>Objeto UniAlumnoDTO.</returns>
        [Route("GetAll")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetAll()
        {
            try
            {
                string tokenString = this.ActionContext.Request.Headers.GetValues("Authorization").ToList().FirstOrDefault();
                string userString = this.ActionContext.Request.Headers.GetValues("User").ToList().FirstOrDefault();

                if (SessionTokenService.ValidRequestByUserAndToken(tokenString, userString))
                {
                    return HttpResponseController.Return_200_OK(UniEdificioService.GetAll());
                }
                return HttpResponseController.Return_401_Unauthorized(string.Empty);
            }
            catch
            {
                return HttpResponseController.Return_401_Unauthorized(string.Empty);
            }
        }

        /// <summary>
        /// Obtiene un objeto de alumno. El legajo puede ser provisorio o definitivo.
        /// </summary>
        /// <param name="legajo">Número de legajo.</param>
        /// <returns>Objeto UniAlumnoDTO.</returns>
        [Route("GetEdificioByCodins")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetEdificioByCodins(string codins)
        {
            try
            {
                string tokenString = this.ActionContext.Request.Headers.GetValues("Authorization").ToList().FirstOrDefault();
                string userString = this.ActionContext.Request.Headers.GetValues("User").ToList().FirstOrDefault();

                if (SessionTokenService.ValidRequestByUserAndToken(tokenString, userString))
                {
                    return HttpResponseController.Return_200_OK(UniEdificioService.GetEdificioByCodins(codins));
                }
                return HttpResponseController.Return_401_Unauthorized(string.Empty);
            }
            catch
            {
                return HttpResponseController.Return_401_Unauthorized(string.Empty);
            }
        }
    }
}