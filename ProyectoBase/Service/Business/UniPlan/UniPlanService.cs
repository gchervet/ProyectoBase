using Data;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class UniPlanService
    {
        public static List<UniPlanDTO> GetPlanByCodigoCarrera(string codcar)
        {
            List<UniPlanDTO> rtn = new List<UniPlanDTO>();
            List<sp_get_PlanesMateriasDetalladasByCodigoPlan_Result> uniPlanesByCodigoPlan = UniPlanDAL.GetPlanByCodigoCarrera(codcar);
            
            return rtn;
        }
    }
}
