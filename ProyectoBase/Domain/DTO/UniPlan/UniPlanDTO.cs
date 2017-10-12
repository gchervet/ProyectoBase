using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UniPlanDTO
    {
        // TODO MODIFICAR NOMBRES
        public string CodCar { get; set; }
        public Nullable<int> CantOp { get; set; }
        public string nomcar { get; set; }
        public Nullable<System.DateTime> fvig { get; set; }
        public Nullable<int> tipo { get; set; }
        public Nullable<System.DateTime> fcadu { get; set; }
        public Nullable<int> cantmat { get; set; }
        public string usrnom { get; set; }
        public Nullable<System.DateTime> ftrn { get; set; }
        public Nullable<int> c_uniaca { get; set; }
        public Nullable<int> c_titulo { get; set; }
        public string codesc { get; set; }
        public int version { get; set; }
        public Nullable<int> cantidad_anios { get; set; }
        public string Titulo { get; set; }
        public string TituloIntermedio { get; set; }
        public Nullable<int> AnioTituloIntermedio { get; set; }
        public Nullable<bool> publicable { get; set; }
    }
}
