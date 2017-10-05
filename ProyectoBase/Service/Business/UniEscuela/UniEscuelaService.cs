using Data;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class UniEscuelaService
    {
        public List<UniEscuelaDTO> GetAll()
        {
            List<UniEscuelaDTO> rtn = new List<UniEscuelaDTO>();

            List<uniEscuelas> uniEscuelasModelList = UniEscuelaDAL.GetAll();
            foreach (uniEscuelas uniEscuelasModel in uniEscuelasModelList)
            {
                UniEscuelaDTO uniEscuela = new UniEscuelaDTO(uniEscuelasModel);
                if(uniEscuela != null)
                {
                    List<UniEscuelasModalidades> uniEscuelasModalidadesModelList = UniEscuelaDAL.GetModalidadByCodigoEscuela(uniEscuela.Codigo);
                    foreach (UniEscuelasModalidades uniEscuelasModalidadesModel in uniEscuelasModalidadesModelList)
                    {
                        uniEscuela.ModalidadList.Add(new UniEscuelaModalidadDTO(uniEscuelasModalidadesModel));
                    }
                }
                rtn.Add(uniEscuela);
            }
            return rtn;
        }
    }
}
