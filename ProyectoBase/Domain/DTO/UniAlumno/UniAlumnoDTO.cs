using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UniAlumnoDTO
    {
        public UniAlumnoDTO(string name)
        {
            Name = name;
        }
        public string Name { get; set; }
    }
}
