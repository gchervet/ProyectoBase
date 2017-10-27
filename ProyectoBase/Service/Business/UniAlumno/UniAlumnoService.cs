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

        public static List<KPIMorososDTO> GetKPIMorosos(int? minimoDiasDeuda, int? minimoDiasPago, int? legajo, int? sede, string carrera, string nombre, string apellido, decimal? dni, int? kpi_monto_mayor, int? kpi_monto_menor)
        {
            List<sp_KPI_Morosos_Result> kpiMorososModelList = UniAlumnoDAL.GetKPIMorosos(minimoDiasDeuda, minimoDiasPago, legajo, sede, carrera, nombre, apellido, dni, kpi_monto_mayor, kpi_monto_menor);
            List<KPIMorososDTO> rtn = new List<KPIMorososDTO>();

            foreach (sp_KPI_Morosos_Result kpiMorososModel in kpiMorososModelList)
            {
                rtn.Add(new KPIMorososDTO(kpiMorososModel));
            }
            return rtn;
        }

        public static List<KPIInasistenciasDTO> GetKPIInasistencias(int? ciclo, int? cuatri, int? legajo, int? sede, string carrera, string nombre, string apellido, decimal? dni, int? kpiInasistenciaMayor, int? kpiInasistenciaMenor)
        {
            List<sp_KPI_Inansistencias_Result> kpiInasistenciaModelList = UniAlumnoDAL.GetKPIInasistencias(ciclo, cuatri, legajo, sede, carrera, nombre, apellido, dni, kpiInasistenciaMayor, kpiInasistenciaMenor);
            List<KPIInasistenciasDTO> rtn = new List<KPIInasistenciasDTO>();

            foreach (sp_KPI_Inansistencias_Result kpiInasistenciaModel in kpiInasistenciaModelList)
            {
                rtn.Add(new KPIInasistenciasDTO(kpiInasistenciaModel));
            }
            return rtn;
        }

        public static List<UniAlumnoDTO> GetByLegajoMatch(string legajo)
        {
            List<UniAlumnoDTO> rtn = new List<UniAlumnoDTO>();
            List<sp_get_alumno_by_legajo_match_Result> uniAlumnoModelList = UniAlumnoDAL.GetByLegajoMatch(legajo);

            foreach (sp_get_alumno_by_legajo_match_Result uniAlumnoModel in uniAlumnoModelList)
            {
                rtn.Add(new UniAlumnoDTO(uniAlumnoModel));
            }
            return rtn;
        }

        public static List<decimal> GetKPIInasistenciasTotalPromedios(int? ciclo, int? cuatri)
        {
            List<sp_KPI_Inansistencias_Result> kpiInasistenciaModelList = UniAlumnoDAL.GetKPIInasistencias(ciclo, cuatri, null, null, null, null, null, null, null, null);
            List<decimal> rtn = new List<decimal>();
            List<int> usedLegajos = new List<int>();

            foreach (sp_KPI_Inansistencias_Result kpiInasistenciaModel in kpiInasistenciaModelList)
            {
                if (!usedLegajos.Any(x => x == kpiInasistenciaModel.Legajo) && kpiInasistenciaModel.Promedio.HasValue)
                {
                    rtn.Add(kpiInasistenciaModel.Promedio.Value);
                    usedLegajos.Add(kpiInasistenciaModel.Legajo);
                }
            }
            return rtn;
        }
    }
}
