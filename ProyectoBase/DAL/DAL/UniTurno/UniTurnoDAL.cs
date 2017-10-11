using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class UniTurnoDAL
    {
        public static List<uniTurnosHabilitados> GetAll()
        {
            using (var context = new Uni_Entities())
            {
                return context.uniTurnosHabilitados.ToList();
            }
        }
    }
}
