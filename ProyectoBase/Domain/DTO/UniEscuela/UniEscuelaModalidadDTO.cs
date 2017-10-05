using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UniEscuelaModalidadDTO
    {
        public UniEscuelaModalidadDTO(UniEscuelasModalidades uniEscuelasModalidadesModel)
        {
            CodigoEscuela = uniEscuelasModalidadesModel.CodigoEscuela;
            CodigoModalidad = uniEscuelasModalidadesModel.CodigoModalidad;
        }
        public string CodigoEscuela { get; set; }
        public string CodigoModalidad { get; set; }
    }
}
