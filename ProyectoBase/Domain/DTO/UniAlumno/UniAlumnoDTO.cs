using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UniAlumnoDTO
    {
        // TODO: llevar Name a NombreCompleto
        public UniAlumnoDTO(Data.uniAlumnos uniAlumno)
        {
            if (uniAlumno != null)
            {
                Name = uniAlumno.nombre + " " + uniAlumno.apellido;
            }
        }

        public UniAlumnoDTO(sp_get_alumno_by_legajo_match_Result alumnoModel)
        {
            this.Nombre = alumnoModel.nombre;
            this.Apellido = alumnoModel.apellido;
            this.DNI = alumnoModel.docnac;
            this.LegajoProvisorio = alumnoModel.legProvi;
            this.LegajoDefinitivo = alumnoModel.legdef;
        }
        public string Name { get; set; }

        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public Nullable<decimal> DNI { get; set; }
        public Nullable<int> LegajoProvisorio { get; set; }
        public Nullable<int> LegajoDefinitivo { get; set; }
    }
}
