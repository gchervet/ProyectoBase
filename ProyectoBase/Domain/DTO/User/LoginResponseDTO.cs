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
        public LoginResponseDTO(bool validLogin, string responseMessage, string error, HttpStatusCode responseStatus, int failedLoginCode)
        {
            ValidLogin = validLogin;
            ResponseMessage = responseMessage;
            Error = error;
            ResponseStatus = responseStatus;
            FailedLoginCode = (FailedLoginEnum)failedLoginCode;
        }

        public bool ValidLogin { get; set; }
        public string ResponseMessage { get; set; }
        public string Error { get; set; }
        public FailedLoginEnum FailedLoginCode { get; set; }
        public HttpStatusCode ResponseStatus { get; set; }
    }
}
