using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class LoginResponseDTO
    {
        public LoginResponseDTO(bool validLogin, string responseMessage, string error, HttpStatusCode responseStatus, int failedLoginCode, string token, string name, List<String> permissions)
        {
            ValidLogin = validLogin;
            ResponseMessage = responseMessage;
            Error = error;
            ResponseStatus = responseStatus;
            FailedLoginCode = (FailedLoginEnum)failedLoginCode;

            Token = token;
            this.name = name;
            this.permissions = permissions;
        }

        public bool ValidLogin { get; set; }
        public string ResponseMessage { get; set; }
        public string Error { get; set; }
        public FailedLoginEnum FailedLoginCode { get; set; }
        public HttpStatusCode ResponseStatus { get; set; }

        /* Seguridad del front end */
        public string Token { get; set; }
        public string name { get; set; }
        public List<String> permissions { get; set; }
    }
}
