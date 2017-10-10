using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class UniEdificioDAL
    {
        public static List<uniEdificios> GetAll()
        {
            using (var context = new Uni_Entities())
            {
                return context.uniEdificios.ToList();
            }
        }

        public static uniEdificios GetEdificioByCodins(string codins)
        {
            if (codins != null)
            {
                using (var context = new Uni_Entities())
                {
                    return context.uniEdificios.Where(z => z.codins == codins).FirstOrDefault();
                }
            }
            return null;
        }
    }
}
