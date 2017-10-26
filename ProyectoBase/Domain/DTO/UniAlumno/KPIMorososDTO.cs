using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class KPIMorososDTO
    {
        public KPIMorososDTO(sp_KPI_Morosos_Result kpiMorososResult)
        {
            this.Legajo = kpiMorososResult.Legajo;
            this.Carrera = kpiMorososResult.Carrera;
            this.Apellido = kpiMorososResult.Apellido;
            this.Nombre = kpiMorososResult.Nombre;
            this.Dni = kpiMorososResult.Dni;
            this.DeudaToal = kpiMorososResult.DeudaToal;
            this.DiasDeuda = kpiMorososResult.DiasDeuda;
            this.FechaUltimoPago = kpiMorososResult.FechaUltimoPago;
            this.ImporteUltimoPago = kpiMorososResult.ImporteUltimoPago;
            this.UltimaActAca = kpiMorososResult.UltimaActAca;
            this.Telefono = kpiMorososResult.Telefono;
            this.Mail = kpiMorososResult.Mail;
        }
        public int Legajo { get; set; }
        public string Carrera { get; set; }
        public string Apellido { get; set; }
        public string Nombre { get; set; }
        public Nullable<decimal> Dni { get; set; }
        public Nullable<decimal> DeudaToal { get; set; }
        public Nullable<int> DiasDeuda { get; set; }
        public Nullable<System.DateTime> FechaUltimoPago { get; set; }
        public Nullable<decimal> ImporteUltimoPago { get; set; }
        public Nullable<System.DateTime> UltimaActAca { get; set; }
        public string Telefono { get; set; }
        public string Mail { get; set; }
    }
}
