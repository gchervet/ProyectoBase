﻿using Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Distribution
{
    [RoutePrefix("api/UniPlan")]
    public class UniPlanController : ApiController
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
            try
            {
                string tokenString = this.ActionContext.Request.Headers.GetValues("Authorization").ToList().FirstOrDefault();
                string userString = this.ActionContext.Request.Headers.GetValues("User").ToList().FirstOrDefault();

                if (SessionTokenService.ValidRequestByUserAndToken(tokenString, userString))
                {
                    return HttpResponseController.Return_200_OK(UniPlanService.GetAll());
                }
                return HttpResponseController.Return_401_Unauthorized(string.Empty);
            }
            catch
            {
                return HttpResponseController.Return_401_Unauthorized(string.Empty);
            }
        }

        /// <summary>
        /// Autentica a un usuario y crea un token de sesion que dura el tiempo indicado.
        /// </summary>
        /// <param name="user">LoginUser con user, pass y tiempo de expiracion</param>
        /// <returns>Un objeto que representa </returns>
        [Route("GetPlanByCodigoCarrera")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetPlanByCodigoCarrera(string codcar)
        {
            try
            {
                string tokenString = this.ActionContext.Request.Headers.GetValues("Authorization").ToList().FirstOrDefault();
                string userString = this.ActionContext.Request.Headers.GetValues("User").ToList().FirstOrDefault();

                if (SessionTokenService.ValidRequestByUserAndToken(tokenString, userString))
                {
                    return HttpResponseController.Return_200_OK(UniPlanService.GetPlanByCodigoCarrera(codcar));
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