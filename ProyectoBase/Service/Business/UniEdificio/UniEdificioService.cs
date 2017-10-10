using Data;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class UniEdificioService
    {
        public static List<UniEdificioDTO> GetAll()
        {
            List<UniEdificioDTO> rtn = new List<UniEdificioDTO>();

            List<uniEdificios> uniEdificioModelList = UniEdificioDAL.GetAll();
            foreach (uniEdificios uniEdificioModel in uniEdificioModelList)
            {
                UniEdificioDTO uniEdificio = new UniEdificioDTO(uniEdificioModel);
                rtn.Add(uniEdificio);
            }
            return rtn;
        }

        public static UniEdificioDTO GetEdificioByCodins(string codins)
        {
            uniEdificios uniEdificioModel = UniEdificioDAL.GetEdificioByCodins(codins);
            if(uniEdificioModel != null)
            {
                return new UniEdificioDTO(uniEdificioModel);
            }
            return null;
        }
    }
}
