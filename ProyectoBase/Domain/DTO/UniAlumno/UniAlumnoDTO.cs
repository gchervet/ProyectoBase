using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UniAlumnoDTO
    {
        public UniAlumnoDTO(Data.uniAlumnos uniAlumno)
        {
            if (uniAlumno != null)
            {
                Name = uniAlumno.nombre + " " + uniAlumno.apellido;
            }
        }
        public string Name { get; set; }
    }
}
