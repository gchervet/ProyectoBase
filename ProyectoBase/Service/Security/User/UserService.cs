using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;

namespace Service
{
    public class UserService
    {
        public LoginResponseDTO LogIn(LoginUserDTO user)
        {
            LdapAuthentication ldapAuth = new LdapAuthentication("LDAP://AR-WINDC-01.central.kennedy.edu.ar");
            int loginAttemptCode = default(int);

            try
            {
                loginAttemptCode = ldapAuth.IsAuthenticated("KENNEDY", user.UserName, user.Password);
                if (loginAttemptCode == 1)
                {


                    return new LoginResponseDTO(true, string.Empty, string.Empty, HttpStatusCode.OK, FailedLoginEnum.LoggedWithoutError.GetHashCode());
                }
                return new LoginResponseDTO(false, "Could not log into the server", string.Empty, HttpStatusCode.Forbidden, loginAttemptCode);
            }
            catch(Exception e)
            {
                switch (e.HResult)
                {
                    case -2147023570:
                        return new LoginResponseDTO(false, "Could not log into the server", e.Message, HttpStatusCode.Forbidden, FailedLoginEnum.InvalidCredentials.GetHashCode());
                    default:
                        break;
                }
                return new LoginResponseDTO(false, "Could not log into the server", e.Message, HttpStatusCode.Forbidden, loginAttemptCode);
            }
        }
    }
}
