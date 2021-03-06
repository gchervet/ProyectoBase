﻿using CommonLib;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;

namespace Service
{
    public class SessionTokenService
    {
        /// <summary>
        /// Crea nuevo SessionToken y lo registra en la base de datos, si ya existía anteriormente actualiza su fecha de expiración.
        /// </summary>
        /// <param name="user">EL User al que corresponde el token</param>
        /// <param name="deviceIdentifier">Identificador del dispositivo que esta utilizando el usuario</param>
        /// <param name="expireHours">La cantidad de horas hasta que expira el token. Si es null no expirará.</param>
        /// <returns>El token creado</returns>
        public static SessionTokenDTO Create(LoginUserDTO user, string tokenKey, int? expireHours)
        {
            SessionTokenDTO sessionTokenDto = new SessionTokenDTO
            {
                /* Para mayor seguridad, se repite el totenKey dos veces al armar el token */
                Token = AesEncryption.GetInstance().Encrypt(user.UserName + tokenKey + tokenKey),
                IdUser = user.UserName
            };

            /* Genera el token en la BDD */
            //sessionTokenDto = Create(sessionTokenDto);

            return sessionTokenDto;
        }

        public static bool ValidRequestByUserAndToken(string tokenString, string userString)
        {
            SessionTokenDTO sessionTokenTry = Create(new LoginUserDTO() { UserName = userString },
                                                        WebConfigurationManager.AppSettings["DomainName"] +
                                                        WebConfigurationManager.AppSettings["TokenKey"],
                                                        null);
            if (sessionTokenTry != null)
            {
                return String.Equals("Basic " + sessionTokenTry.Token, tokenString);
            }
            return false;
        }
    }
}
