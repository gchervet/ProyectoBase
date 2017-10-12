using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class UniPlanDAL
    {
        public static List<sp_get_PlanesMateriasDetalladasByCodigoPlan_Result> GetPlanByCodigoCarrera(string codcar)
        {
            if(codcar != null)
            {
                using (var context = new Uni_Entities())
                {
                    return context.sp_get_PlanesMateriasDetalladasByCodigoPlan(codcar).ToList();
                }
            }
            return new List<sp_get_PlanesMateriasDetalladasByCodigoPlan_Result>();
        }
    }
}
