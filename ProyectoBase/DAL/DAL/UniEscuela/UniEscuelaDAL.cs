using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class UniEscuelaDAL
    {
        public static List<uniEscuelas> GetAll()
        {
            using (var context = new Uni_Entities())
            {
                return context.uniEscuelas.ToList();
            }
        }

        public static List<UniEscuelasModalidades> GetModalidadByCodigoEscuela(string codigo)
        {
            if(codigo != null)
            {
                using (var context = new Uni_Entities())
                {
                    return context.UniEscuelasModalidades.Where(z => z.CodigoEscuela == codigo).ToList();
                }
            }
            return new List<UniEscuelasModalidades>();
        }
    }
}
