using Domain;
using Service;
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
    [RoutePrefix("api/UniAlumno")]
    public class UniAlumnoController : ApiController
    {
        /// <summary>
        /// Obtiene un objeto de alumno. El legajo puede ser provisorio o definitivo.
        /// </summary>
        /// <param name="legajo">Número de legajo.</param>
        /// <returns>Objeto UniAlumnoDTO.</returns>
        [Route("GetByLegajo")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetByLegajo(int legajo)
        {
            try
            {
                string tokenString = this.ActionContext.Request.Headers.GetValues("Authorization").ToList().FirstOrDefault();
                string userString = this.ActionContext.Request.Headers.GetValues("User").ToList().FirstOrDefault();

                if (SessionTokenService.ValidRequestByUserAndToken(tokenString, userString))
                {
                    return HttpResponseController.Return_200_OK(UniAlumnoService.GetByLegajo(legajo));
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