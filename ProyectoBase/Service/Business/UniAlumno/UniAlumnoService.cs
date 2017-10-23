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
    }
}
