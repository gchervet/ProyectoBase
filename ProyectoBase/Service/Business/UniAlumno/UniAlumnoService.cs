using Data;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class UniAlumnoService
    {
        public static UniAlumnoDTO GetByLegajo(int legajo)
        {
            uniAlumnos uniAlumno = UniAlumnoDAL.GetByLegajo(legajo);
            if (uniAlumno != null)
            {
                return new UniAlumnoDTO(uniAlumno);
            }
            return null;
        }
    }
}
