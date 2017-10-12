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
        public static List<UniPlanMateriaDTO> GetPlanByCodigoCarrera(string codcar)
        {
            List<UniPlanMateriaDTO> rtn = new List<UniPlanMateriaDTO>();
            List<sp_get_PlanesMateriasDetalladasByCodigoPlan_Result> uniPlanesByCodigoPlanList = UniPlanDAL.GetPlanByCodigoCarrera(codcar);

            foreach (sp_get_PlanesMateriasDetalladasByCodigoPlan_Result uniPlanesByCodigoPlan in uniPlanesByCodigoPlanList)
            {
                rtn.Add(new UniPlanMateriaDTO(uniPlanesByCodigoPlan));
            }
            return rtn;
        }
    }
}
