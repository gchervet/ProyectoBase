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

namespace Distribution.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        /// <summary>
        /// Autentica a un usuario y crea un token de sesion que dura el tiempo indicado.
        /// </summary>
        /// <param name="user">LoginUser con user, pass y tiempo de expiracion</param>
        /// <returns>Un objeto que representa </returns>
        [Route("Authenticate")]
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage Authenticate(LoginUserDTO user)
        {
            UserService userService = new UserService();
            return HttpResponseController.Return_200_OK(userService.LogIn(user));
        }
    }
}