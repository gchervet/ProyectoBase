using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class UniRegionalDAL
    {

        public static List<uniRegionales> GetAll()
        {
            using(var context = new Uni_Entities())
            {
                return context.uniRegionales.ToList();
            }
        }
    }
}
