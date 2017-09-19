using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Web.Configuration;

namespace Service
{
    public class UserService
    {
        public LoginResponseDTO LogIn(LoginUserDTO user)
        {
            LdapAuthentication ldapAuth = new LdapAuthentication(WebConfigurationManager.AppSettings["PFUserName"]);
            int loginAttemptCode = default(int);

            try
            {
                loginAttemptCode = ldapAuth.IsAuthenticated(WebConfigurationManager.AppSettings["DomainName"], user.UserName, user.Password);
                if (loginAttemptCode == 1)
                {
                    // El usuario existe, se genera un token y se devuelven sus permisos
                    SessionTokenDTO sessionTokenDTO = SessionTokenService.Create(user, WebConfigurationManager.AppSettings["DomainName"] + WebConfigurationManager.AppSettings["TokenKey"], null);
                    List<string> userPermissions = new List<string>();
                    userPermissions.Add("administration");

                    return new LoginResponseDTO(true, string.Empty, string.Empty, HttpStatusCode.OK, FailedLoginEnum.LoggedWithoutError.GetHashCode(), sessionTokenDTO.Token, user.UserName, userPermissions);
                }
                return new LoginResponseDTO(false, "Could not log into the server", string.Empty, HttpStatusCode.Forbidden, loginAttemptCode, null, null, null);
            }
            catch(Exception e)
            {
                switch (e.HResult)
                {
                    case -2147023570:
                        return new LoginResponseDTO(false, "Could not log into the server", e.Message, HttpStatusCode.Forbidden, FailedLoginEnum.InvalidCredentials.GetHashCode(), null, null, null);
                    default:
                        break;
                }
                return new LoginResponseDTO(false, "Could not log into the server", e.Message, HttpStatusCode.Forbidden, loginAttemptCode, null, null, null);
            }
        }
    }
}
