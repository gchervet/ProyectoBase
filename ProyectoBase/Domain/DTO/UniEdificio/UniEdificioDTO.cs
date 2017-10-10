using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UniEdificioDTO
    {

        public UniEdificioDTO(uniEdificios uniEdificioModel)
        {
            this.CodIns = uniEdificioModel.codins;
            this.NomIns = uniEdificioModel.nomins;
            this.DomIns = uniEdificioModel.domins;
            this.Usrnom = uniEdificioModel.usrnom;
            this.Ftrn = uniEdificioModel.ftrn;
            this.CantLab = uniEdificioModel.cantlab;
            this.CantTal = uniEdificioModel.canttal;
            this.CantAul = uniEdificioModel.cantaul;
            this.CantCli = uniEdificioModel.cantcli;
            this.CantCco = uniEdificioModel.cantcco;
            this.Regional = uniEdificioModel.regional;
        }

        public string CodIns { get; set; }
        public string NomIns { get; set; }
        public string DomIns { get; set; }
        public Nullable<int> CantAlu { get; set; }
        public string Usrnom { get; set; }
        public Nullable<System.DateTime> Ftrn { get; set; }
        public Nullable<int> CantLab { get; set; }
        public Nullable<int> CantTal { get; set; }
        public Nullable<int> CantAul { get; set; }
        public Nullable<int> CantCli { get; set; }
        public Nullable<int> CantCco { get; set; }
        public Nullable<int> Regional { get; set; }
    }
}
