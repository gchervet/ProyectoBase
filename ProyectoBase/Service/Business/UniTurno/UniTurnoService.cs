using Data;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class UniTurnoService
    {
        public static List<UniTurnoDTO> GetAll()
        {
            List<UniTurnoDTO> rtn = new List<UniTurnoDTO>();

            List<uniTurnosHabilitados> uniTurnosHabilitadosModelList = UniTurnoDAL.GetAll();
            foreach (uniTurnosHabilitados uniTurnosHabilitadosModel in uniTurnosHabilitadosModelList)
            {
                UniTurnoDTO uniTurno = new UniTurnoDTO(uniTurnosHabilitadosModel);
                rtn.Add(uniTurno);
            }
            return rtn;
        }
    }
}
