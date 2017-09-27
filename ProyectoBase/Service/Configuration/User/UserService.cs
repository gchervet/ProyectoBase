using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Web.Configuration;
using ConfigurationData;

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
                    /* El usuario existe, se genera un token y se devuelven sus permisos .
                       Para mayor seguridad, el TokenKey se une con el DomainName. 
                       Recordar que estos valores provienen desde el web.config. */
                    SessionTokenDTO sessionTokenDTO = SessionTokenService.Create(user,
                                                                                WebConfigurationManager.AppSettings["DomainName"] +
                                                                                WebConfigurationManager.AppSettings["TokenKey"],
                                                                                null);

                    //TODO BUSCAR LOS PERMISOS DESDE LA BASE
                    List<string> userPermissions = GetUserPermissionListByUsername(user.UserName);

                    int tokenExpirationMinutes = Int32.Parse(WebConfigurationManager.AppSettings["TokenExpiryMinutes"]);

                    return new LoginResponseDTO(true, string.Empty, string.Empty, HttpStatusCode.OK, FailedLoginEnum.LoggedWithoutError.GetHashCode(), sessionTokenDTO.Token, user.UserName, userPermissions, tokenExpirationMinutes);
                }
                return new LoginResponseDTO(false, "Could not log into the server", string.Empty, HttpStatusCode.Forbidden, loginAttemptCode, null, null, null, 0);
            }
            catch (Exception e)
            {
                switch (e.HResult)
                {
                    case -2147023570:
                        return new LoginResponseDTO(false, "Could not log into the server", e.Message, HttpStatusCode.Forbidden, FailedLoginEnum.InvalidCredentials.GetHashCode(), null, null, null, 0);
                    default:
                        break;
                }
                return new LoginResponseDTO(false, "Could not log into the server", e.Message, HttpStatusCode.Forbidden, loginAttemptCode, null, null, null, 0);
            }
        }

        public static List<string> GetUserPermissionListByUsername(string username)
        {
            List<string> rtn = new List<string>();
            if (username != null)
            {
                List<Permission> permissionModelList = UserDAL.GetUserPermissionList(username);

                foreach (Permission permissionModel in permissionModelList)
                {
                    if (!rtn.Any(z => z == permissionModel.Name))
                    {
                        rtn.Add(permissionModel.Name);
                    }
                }
            }
            return rtn;
        }
    }
}
