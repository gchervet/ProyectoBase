using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UniRegionalDTO
    {
        public UniRegionalDTO(uniRegionales uniRegionalModel)
        {
            this.Codigo = uniRegionalModel.codigo;
            this.Nombre = uniRegionalModel.Nombre;
            this.NombreCustom = uniRegionalModel.NombreCustom;
        }
        public int Codigo { get; set; }
        public string Nombre { get; set; }
        public string NombreCustom { get; set; }
    }
}
