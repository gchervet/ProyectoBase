using Domain;
using Newtonsoft.Json;
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
        public HttpResponseMessage GetKPIMorosos(int? ciclo, int? cuatri, int? legajo, int? sede, string carrera, string nombre, string apellido, decimal? dni, int? kpi_monto_mayor, int? kpi_monto_menor)
        {
            try
            {
                string tokenString = string.Empty;
                string userString = string.Empty;
                try
                {
                    tokenString = this.ActionContext.Request.Headers.GetValues("Authorization").ToList().FirstOrDefault();
                    userString = this.ActionContext.Request.Headers.GetValues("User").ToList().FirstOrDefault();
                }
                catch
                {
                    return HttpResponseController.Return_401_Unauthorized(string.Empty);

                }

                if (SessionTokenService.ValidRequestByUserAndToken(tokenString, userString))
                {
                    return HttpResponseController.Return_200_OK(UniAlumnoService.GetKPIMorosos(ciclo, cuatri, legajo, sede, carrera, nombre, apellido, dni, kpi_monto_mayor, kpi_monto_menor));
                }
                return HttpResponseController.Return_401_Unauthorized(string.Empty);
            }
            catch
            {
                return HttpResponseController.Return_500_InternalServerError(string.Empty);
            }
        }

        /// <summary>
        /// Obtiene un objeto de alumno. El legajo puede ser provisorio o definitivo.
        /// </summary>
        /// <param name="legajo">Número de legajo.</param>
        /// <returns>Objeto UniAlumnoDTO.</returns>
        [Route("GetMorososTotal")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetMorososTotal(int? ciclo, int? cuatri)
        {
            try
            {
                string tokenString = this.ActionContext.Request.Headers.GetValues("Authorization").ToList().FirstOrDefault();
                string userString = this.ActionContext.Request.Headers.GetValues("User").ToList().FirstOrDefault();

                if (SessionTokenService.ValidRequestByUserAndToken(tokenString, userString))
                {
                    return HttpResponseController.Return_200_OK(UniAlumnoService.GetMorososTotal(ciclo, cuatri));
                }
                return HttpResponseController.Return_401_Unauthorized(string.Empty);
            }
            catch
            {
                return HttpResponseController.Return_500_InternalServerError(string.Empty);
            }
        }

        /// <summary>
        /// Obtiene un objeto de alumno. El legajo puede ser provisorio o definitivo.
        /// </summary>
        /// <param name="legajo">Número de legajo.</param>
        /// <returns>Objeto UniAlumnoDTO.</returns>
        [Route("GetKPIInasistencias")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetKPIInasistencias(int? ciclo, int? cuatri, int? legajo, int? sede, string carrera, string nombre, string apellido, decimal? dni, int? kpi_inasistencia_mayor, int? kpi_inasistencia_menor, int? kpi_reprobados_mayor, int? kpi_reprobados_menor, int? kpi_finales_mayor, int? kpi_finales_menor)
        {
            try
            {
                string tokenString = this.ActionContext.Request.Headers.GetValues("Authorization").ToList().FirstOrDefault();
                string userString = this.ActionContext.Request.Headers.GetValues("User").ToList().FirstOrDefault();

                if (SessionTokenService.ValidRequestByUserAndToken(tokenString, userString))
                {
                    return HttpResponseController.Return_200_OK(UniAlumnoService.GetKPIInasistencias(ciclo, cuatri, legajo, sede, carrera, nombre, apellido, dni, kpi_inasistencia_mayor, kpi_inasistencia_menor, kpi_reprobados_mayor, kpi_reprobados_menor, kpi_finales_mayor, kpi_finales_menor));
                }
                return HttpResponseController.Return_401_Unauthorized(string.Empty);
            }
            catch
            {
                return HttpResponseController.Return_500_InternalServerError(string.Empty);
            }
        }

        /// <summary>
        /// Obtiene un objeto de alumno. El legajo puede ser provisorio o definitivo.
        /// </summary>
        /// <param name="legajo">Número de legajo.</param>
        /// <returns>Objeto UniAlumnoDTO.</returns>
        [Route("GetKPIInasistenciasTotalPromedios")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetKPIInasistenciasTotalDeAlumnos(int? ciclo, int? cuatri)
        {
            try
            {
                string tokenString = this.ActionContext.Request.Headers.GetValues("Authorization").ToList().FirstOrDefault();
                string userString = this.ActionContext.Request.Headers.GetValues("User").ToList().FirstOrDefault();

                if (SessionTokenService.ValidRequestByUserAndToken(tokenString, userString))
                {
                    return HttpResponseController.Return_200_OK(UniAlumnoService.GetKPIInasistenciasTotalPromedios(ciclo, cuatri));
                }
                return HttpResponseController.Return_401_Unauthorized(string.Empty);
            }
            catch
            {
                return HttpResponseController.Return_500_InternalServerError(string.Empty);
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
                return HttpResponseController.Return_500_InternalServerError(string.Empty);
            }
        }

        /// <summary>
        /// Obtiene un objeto de alumno. El legajo puede ser provisorio o definitivo.
        /// </summary>
        /// <param name="legajo">Número de legajo.</param>
        /// <returns>Objeto UniAlumnoDTO.</returns>
        [Route("GetExamenesReprobados")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetExamenesReprobados(int? ciclo, int? cuatri, int? legajo, int? sede, string carrera, string nombre, string apellido, decimal? dni, int? kpi_reprobados_mayor, int? kpi_reprobados_menor)
        {
            try
            {
                string tokenString = this.ActionContext.Request.Headers.GetValues("Authorization").ToList().FirstOrDefault();
                string userString = this.ActionContext.Request.Headers.GetValues("User").ToList().FirstOrDefault();

                if (SessionTokenService.ValidRequestByUserAndToken(tokenString, userString))
                {
                    return HttpResponseController.Return_200_OK(UniAlumnoService.GetExamenesReprobados(ciclo, cuatri, legajo, sede, carrera, nombre, apellido, dni, kpi_reprobados_mayor, kpi_reprobados_menor));
                }
                return HttpResponseController.Return_401_Unauthorized(string.Empty);
            }
            catch
            {
                return HttpResponseController.Return_500_InternalServerError(string.Empty);
            }
        }

        /// <summary>
        /// Obtiene un objeto de alumno. El legajo puede ser provisorio o definitivo.
        /// </summary>
        /// <param name="legajo">Número de legajo.</param>
        /// <returns>Objeto UniAlumnoDTO.</returns>
        [Route("GetExamenesReprobadosTotal")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetExamenesReprobadosTotal(int? ciclo, int? cuatri)
        {
            try
            {
                string tokenString = this.ActionContext.Request.Headers.GetValues("Authorization").ToList().FirstOrDefault();
                string userString = this.ActionContext.Request.Headers.GetValues("User").ToList().FirstOrDefault();

                if (SessionTokenService.ValidRequestByUserAndToken(tokenString, userString))
                {
                    return HttpResponseController.Return_200_OK(UniAlumnoService.GetExamenesReprobadosTotal(ciclo, cuatri));
                }
                return HttpResponseController.Return_401_Unauthorized(string.Empty);
            }
            catch
            {
                return HttpResponseController.Return_500_InternalServerError(string.Empty);
            }
        }

        /// <summary>
        /// Obtiene un objeto de alumno. El legajo puede ser provisorio o definitivo.
        /// </summary>
        /// <param name="legajo">Número de legajo.</param>
        /// <returns>Objeto UniAlumnoDTO.</returns>
        [Route("GetFinalesReprobados")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetFinalesReprobados(int? ciclo, int? cuatri, int? legajo, int? sede, string carrera, string nombre, string apellido, decimal? dni, int? kpi_reprobados_mayor, int? kpi_reprobados_menor)
        {
            try
            {
                string tokenString = this.ActionContext.Request.Headers.GetValues("Authorization").ToList().FirstOrDefault();
                string userString = this.ActionContext.Request.Headers.GetValues("User").ToList().FirstOrDefault();

                if (SessionTokenService.ValidRequestByUserAndToken(tokenString, userString))
                {
                    return HttpResponseController.Return_200_OK(UniAlumnoService.GetFinalesReprobados(ciclo, cuatri, legajo, sede, carrera, nombre, apellido, dni, kpi_reprobados_mayor, kpi_reprobados_menor));
                }
                return HttpResponseController.Return_401_Unauthorized(string.Empty);
            }
            catch
            {
                return HttpResponseController.Return_500_InternalServerError(string.Empty);
            }
        }

        /// <summary>
        /// Obtiene un objeto de alumno. El legajo puede ser provisorio o definitivo.
        /// </summary>
        /// <param name="legajo">Número de legajo.</param>
        /// <returns>Objeto UniAlumnoDTO.</returns>
        [Route("GetFinalesReprobadosTotal")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetFinalesReprobadosTotal(int? ciclo, int? cuatri)
        {
            try
            {
                string tokenString = this.ActionContext.Request.Headers.GetValues("Authorization").ToList().FirstOrDefault();
                string userString = this.ActionContext.Request.Headers.GetValues("User").ToList().FirstOrDefault();

                if (SessionTokenService.ValidRequestByUserAndToken(tokenString, userString))
                {
                    return HttpResponseController.Return_200_OK(UniAlumnoService.GetFinalesReprobadosTotal(ciclo, cuatri));
                }
                return HttpResponseController.Return_401_Unauthorized(string.Empty);
            }
            catch
            {
                return HttpResponseController.Return_500_InternalServerError(string.Empty);
            }
        }
    }
}