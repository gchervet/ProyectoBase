using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class UniAlumnoDAL
    {
        public static uniAlumnos GetByLegajo(int legajo)
        {
            using (var context = new Uni_Entities())
            {
                return context.uniAlumnos.First();
            }
        }

        public static sp_uni_get_alumno_carrera_idEntidad_Result GetByIdEntidad(int idEntidad)
        {
            using (var context = new Uni_Entities())
            {
                return context.sp_uni_get_alumno_carrera_idEntidad(idEntidad).FirstOrDefault();
            }
        }

        public static sp_uni_get_datos_alumno_username_Result GetByUsername(string username)
        {
            using (var context = new Uni_Entities())
            {
                return context.sp_uni_get_datos_alumno_username(username).FirstOrDefault();
            }
        }
    }
}
