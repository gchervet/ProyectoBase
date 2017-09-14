using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class LoginUserDTO
    {
        [Display(Name = "Contraseña")]
        public string Password
        {
            get;
            set;
        }

        public int? SessionHours
        {
            get;
            set;
        }

        [Required(ErrorMessage = "Ingrese su nombre de usuario o correo electrónico")]
        public string UserName
        {
            get;
            set;
        }

        public string DeviceId { get; set; }
    }
}
