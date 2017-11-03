using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class LegajoMateriaDTO
    {
        public LegajoMateriaDTO(int legajo, string materia)
        {
            this.legajo = legajo;
            this.materia = materia;
        }

        public int legajo { get; set; }
        public string materia { get; set; }
    }
}
