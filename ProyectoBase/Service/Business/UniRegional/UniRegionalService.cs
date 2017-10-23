using Data;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class UniRegionalService
    {
        public static List<UniRegionalDTO> GetAll()
        {
            List<UniRegionalDTO> rtn = new List<UniRegionalDTO>();
            List<uniRegionales> uniRegionalModelList = UniRegionalDAL.GetAll();

            foreach (uniRegionales uniRegionalModel in uniRegionalModelList)
            {
                rtn.Add(new UniRegionalDTO(uniRegionalModel));
            }
            return rtn;
        }
    }
}
