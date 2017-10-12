using Domain;
using Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Distribution
{
    [RoutePrefix("api/UniEscuela")]
    public class UniEscuelaController: ApiController
    {
        /// <summary>
        /// Autentica a un usuario y crea un token de sesion que dura el tiempo indicado.
        /// </summary>
        /// <param name="user">LoginUser con user, pass y tiempo de expiracion</param>
        /// <returns>Un objeto que representa </returns>
        [Route("GetAll")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetAll()
        {
            UniEscuelaService uniEscuelaService = new UniEscuelaService();
            return HttpResponseController.Return_200_OK(uniEscuelaService.GetAll());
        }    
    }
}