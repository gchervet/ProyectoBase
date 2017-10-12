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

        public static List<UniPlanDTO> GetAll()
        {
            List<UniPlanDTO> rtn = new List<UniPlanDTO>();
            List<uniPlanes> uniPlanesModelList = UniPlanDAL.GetAll();

            foreach (uniPlanes uniPlanesModel in uniPlanesModelList)
            {
                UniPlanDTO uniPlan = new UniPlanDTO(uniPlanesModel);
                uniPlan.MateriaList = GetPlanByCodigoCarrera(uniPlanesModel.codcar);
                rtn.Add(uniPlan);
            }
            return rtn;
        }
    }
}
