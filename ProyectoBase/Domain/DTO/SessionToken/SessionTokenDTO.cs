using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class SessionTokenDTO
    {
        public int IdSessionToken { get; set; }

        public string IdUser { get; set; }

        public string Token { get; set; }

        //public System.DateTime ExpireDate { get; set; }

        //public bool CredentialdsChanged { get; set; }
    }
}
