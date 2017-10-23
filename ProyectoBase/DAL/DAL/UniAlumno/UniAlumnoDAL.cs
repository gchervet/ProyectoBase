﻿using System;
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

        //public static sp_uni_get_alumno_carrera_idEntidad_Result GetByIdEntidad(int idEntidad)
        //{
        //    using (var context = new Uni_Entities())
        //    {
        //        return context.sp_uni_get_alumno_carrera_idEntidad(idEntidad).FirstOrDefault();
        //    }
        //}

        public static sp_uni_get_datos_alumno_username_Result GetByUsername(string username)
        {
            using (var context = new Uni_Entities())
            {
                return context.sp_uni_get_datos_alumno_username(username).FirstOrDefault();
            }
        }

        public static List<sp_KPI_Morosos_Result> GetKPIMorosos(int? minimoDiasDeuda, int? minimoDiasPago, int? legajo, int? sede, string carrera, string nombre, string apellido, decimal? dni, int? kpi_monto_mayor, int? kpi_monto_menor)
        {
            using (var context = new Uni_Entities())
            {
                return context.sp_KPI_Morosos(minimoDiasDeuda, minimoDiasPago, legajo, sede, carrera, nombre, apellido, dni, kpi_monto_mayor, kpi_monto_menor).ToList();
            }
        }
    }
}
