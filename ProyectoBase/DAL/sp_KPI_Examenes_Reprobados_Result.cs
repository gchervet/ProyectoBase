//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Data
{
    using System;
    
    public partial class sp_KPI_Examenes_Reprobados_Result
    {
        public int Legajo { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public Nullable<decimal> Dni { get; set; }
        public string Carrera { get; set; }
        public int Ciclo { get; set; }
        public int Cuatri { get; set; }
        public string Materia { get; set; }
        public string Telefono { get; set; }
        public string Mail { get; set; }
        public Nullable<int> ExamenesDesaprobados { get; set; }
        public Nullable<int> TotalExamenesDesaprobados { get; set; }
        public Nullable<decimal> Promedio { get; set; }
    }
}
