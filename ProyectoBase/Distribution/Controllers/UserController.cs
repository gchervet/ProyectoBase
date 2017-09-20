using Domain;
using Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WA_AD_Login_01.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        /// <summary>
        /// Autentica a un usuario y crea un token de sesion que dura el tiempo indicado. Dura indeterminadamente si es null.
        /// </summary>
        /// <param name="user">LoginUser con user, pass y tiempo de expiracion</param>
        /// <returns>String identificador del token creado</returns>
        [Route("Authenticate")]
        [HttpPost]
        [AllowAnonymous]
        public LoginResponseDTO Authenticate(LoginUserDTO user)
        {
            //string test = HttpContext.Current.Session["HOLA"].ToString();
            //user.DeviceId = HttpContext.Current.Request.UserHostAddress;
            
            UserService userService = new UserService();
            return userService.LogIn(user);
        }
    }
}