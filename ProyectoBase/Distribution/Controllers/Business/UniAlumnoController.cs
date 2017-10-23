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
                    return HttpResponseController.Return_200_OK(UniRegionalService.GetAll());
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
        [Route("GetKPIMorosos")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetKPIMorosos(int? minimoDiasDeuda, int? minimoDiasPago, int? legajo, int? sede, string carrera, string nombre, string apellido, decimal? dni, int? kpi_monto_mayor, int? kpi_monto_menor)
        {
            try
            {
                string tokenString = this.ActionContext.Request.Headers.GetValues("Authorization").ToList().FirstOrDefault();
                string userString = this.ActionContext.Request.Headers.GetValues("User").ToList().FirstOrDefault();

                if (SessionTokenService.ValidRequestByUserAndToken(tokenString, userString))
                {
                    return HttpResponseController.Return_200_OK(UniAlumnoService.GetKPIMorosos(minimoDiasDeuda, minimoDiasPago, legajo, sede, carrera, nombre, apellido, dni, kpi_monto_mayor, kpi_monto_menor));
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
        [Route("GetByLegajoMatch")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetByLegajoMatch(string legajo)
        {
            try
            {
                string tokenString = this.ActionContext.Request.Headers.GetValues("Authorization").ToList().FirstOrDefault();
                string userString = this.ActionContext.Request.Headers.GetValues("User").ToList().FirstOrDefault();

                if (SessionTokenService.ValidRequestByUserAndToken(tokenString, userString))
                {
                    return HttpResponseController.Return_200_OK(UniAlumnoService.GetByLegajoMatch(legajo));
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