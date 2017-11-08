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

        public static List<sp_KPI_Morosos_Result> GetKPIMorosos(int? ciclo, int? cuatri, int? legajo, int? sede, string carrera, string nombre, string apellido, decimal? dni, int? kpi_monto_mayor, int? kpi_monto_menor)
        {
            using (var context = new Uni_Entities())
            {
                context.Database.CommandTimeout = 3000;
                return context.sp_KPI_Morosos(ciclo, cuatri, legajo, sede, carrera, nombre, apellido, dni, kpi_monto_mayor, kpi_monto_menor).ToList();
            }
        }

        public static List<sp_KPI_Inansistencias_Result> GetKPIInasistencias(int? ciclo, int? cuatri, int? legajo, int? sede, string carrera, string nombre, string apellido, decimal? dni, int? kpiInasistenciaMayor, int? kpiInasistenciaMenor)
        {
            using (var context = new Uni_Entities())
            {
                context.Database.CommandTimeout = 3000;
                return context.sp_KPI_Inansistencias(ciclo, cuatri, legajo, sede, carrera, nombre, apellido, dni, kpiInasistenciaMayor, kpiInasistenciaMenor).ToList();
            }
        }

        public static List<sp_get_alumno_by_legajo_match_Result> GetByLegajoMatch(string legajo)
        {
            using (var context = new Uni_Entities())
            {
                return context.sp_get_alumno_by_legajo_match(legajo).ToList();
            }
        }

        public static List<sp_KPI_Examenes_Reprobados_Result> GetExamenesReprobados(int? ciclo, int? cuatri, int? legajo, int? sede, string carrera, string nombre, string apellido, decimal? dni, int? kpi_reprobados_mayor, int? kpi_reprobados_menor)
        {
            using (var context = new Uni_Entities())
            {
                context.Database.CommandTimeout = 3000;
                return context.sp_KPI_Examenes_Reprobados(ciclo, cuatri, legajo, sede, carrera, nombre, apellido, dni, kpi_reprobados_mayor, kpi_reprobados_menor).ToList();
            }
        }

        public static List<sp_KPI_Finales_Reprobados_Result> GetFinalesReprobados(int? ciclo, int? cuatri, int? legajo, int? sede, string carrera, string nombre, string apellido, decimal? dni, int? kpi_reprobados_mayor, int? kpi_reprobados_menor)
        {
            using (var context = new Uni_Entities())
            {
                context.Database.CommandTimeout = 3000;
                return context.sp_KPI_Finales_Reprobados(ciclo, cuatri, legajo, sede, carrera, nombre, apellido, dni, kpi_reprobados_mayor, kpi_reprobados_menor).ToList();
            }
        }
    }
}
