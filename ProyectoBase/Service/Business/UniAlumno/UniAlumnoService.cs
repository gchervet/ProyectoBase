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

        public static List<KPIInasistenciasDTO> GetKPIInasistencias(int? ciclo, int? cuatri, int? legajo, int? sede, string carrera, string nombre, string apellido, decimal? dni, int? kpiInasistenciaMayor, int? kpiInasistenciaMenor, int? kpi_reprobados_mayor, int? kpi_reprobados_menor)
        {
            List<sp_KPI_Inansistencias_Result> kpiInasistenciaModelList = UniAlumnoDAL.GetKPIInasistencias(ciclo, cuatri, legajo, sede, carrera, nombre, apellido, dni, kpiInasistenciaMayor, kpiInasistenciaMenor);
            List<ExamenReprobadoDTO> examenReprobadoList = GetExamenesReprobados(ciclo, cuatri, legajo, sede, carrera, nombre, apellido, dni, kpi_reprobados_mayor, kpi_reprobados_menor);
            List<KPIInasistenciasDTO> rtn = new List<KPIInasistenciasDTO>();

            foreach (sp_KPI_Inansistencias_Result kpiInasistenciaModel in kpiInasistenciaModelList)
            {
                KPIInasistenciasDTO newKPIInasistencia = new KPIInasistenciasDTO(kpiInasistenciaModel);
                ExamenReprobadoDTO examenPorLegajoYMateria = examenReprobadoList.Where(x => x.Legajo == kpiInasistenciaModel.Legajo && x.Materia == kpiInasistenciaModel.Materia && x.Ciclo == kpiInasistenciaModel.Ciclo && x.Cuatri == kpiInasistenciaModel.Cuatri).FirstOrDefault();

                if (examenPorLegajoYMateria != null)
                {
                    newKPIInasistencia.ExamenesDesaprobados = examenPorLegajoYMateria.ExamenesDesaprobados;
                    newKPIInasistencia.TotalExamenesDesaprobados = examenPorLegajoYMateria.TotalExamenesDesaprobados;
                    newKPIInasistencia.PromedioExamenesReprobados = examenPorLegajoYMateria.Promedio;
                    //newKPIInasistencia.PromedioFinalesReprobados = examenPorLegajoYMateria.Promedio;
                }

                rtn.Add(newKPIInasistencia);
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

        public static List<ExamenReprobadoDTO> GetExamenesReprobados(int? ciclo, int? cuatri, int? legajo, int? sede, string carrera, string nombre, string apellido, decimal? dni, int? kpi_reprobados_mayor, int? kpi_reprobados_menor)
        {
            List<sp_KPI_Examenes_Reprobados_Result> examenReprobadoModelList = UniAlumnoDAL.GetExamenesReprobados(ciclo, cuatri, legajo, sede, carrera, nombre, apellido, dni, kpi_reprobados_mayor, kpi_reprobados_menor);
            List<ExamenReprobadoDTO> rtn = new List<ExamenReprobadoDTO>();

            foreach (sp_KPI_Examenes_Reprobados_Result examenReprobadoModel in examenReprobadoModelList)
            {
                rtn.Add(new ExamenReprobadoDTO(examenReprobadoModel));
            }
            return rtn;
        }
    }
}
