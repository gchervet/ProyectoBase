using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UniTurnoDTO
    {

        public UniTurnoDTO(uniTurnosHabilitados uniEdificioModel)
        {
            this.CodEsc = uniEdificioModel.codesc;
            this.Modalidad = uniEdificioModel.modalidad;
            this.Turno = uniEdificioModel.turno;
            this.Regional = uniEdificioModel.regional;
            this.Anio = uniEdificioModel.anio;
            this.Activo = uniEdificioModel.activo;
            this.Usrnom = uniEdificioModel.usrnom;
            this.Ftrn = uniEdificioModel.ftrn;
            this.Fila = uniEdificioModel.fila;
        }

        public string CodEsc { get; set; }
        public string Modalidad { get; set; }
        public string Turno { get; set; }
        public int Regional { get; set; }
        public int Anio { get; set; }
        public bool Activo { get; set; }
        public string Usrnom { get; set; }
        public Nullable<System.DateTime> Ftrn { get; set; }
        public int Fila { get; set; }
    }
}
