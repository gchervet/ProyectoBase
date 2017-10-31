using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class KPIInasistenciasDTO
    {
        public KPIInasistenciasDTO(sp_KPI_Inansistencias_Result kpiInasistenciasResult)
        {
            this.Legajo = kpiInasistenciasResult.Legajo;
            this.Nombre = kpiInasistenciasResult.Nombre;
            this.Apellido = kpiInasistenciasResult.Apellido;
            this.Dni = kpiInasistenciasResult.Dni;
            this.Carrera = kpiInasistenciasResult.Carrera;
            this.Ciclo = kpiInasistenciasResult.Ciclo;
            this.Cuatri = kpiInasistenciasResult.Cuatri;
            this.Materia = kpiInasistenciasResult.Materia;
            this.Telefono = kpiInasistenciasResult.Telefono;
            this.Mail = kpiInasistenciasResult.Mail;
            this.Inansistencia = kpiInasistenciasResult.Inansistencia;
            this.MaxNroClase = kpiInasistenciasResult.MaxNroClase;
            this.TotalDeInasistencias = kpiInasistenciasResult.TotalDeInasistencias;
            this.Promedio = kpiInasistenciasResult.Promedio;
        }

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

        public Nullable<int> Inansistencia { get; set; }
        public Nullable<int> MaxNroClase { get; set; }
        public Nullable<int> TotalDeInasistencias { get; set; }

        public Nullable<decimal> Promedio { get; set; }
        public Nullable<decimal> PromedioExamenesReprobados { get; set; }
        public Nullable<decimal> PromedioFinalesReprobados { get; set; }

        public int? TotalExamenesDesaprobados { get; set; }
        public int? ExamenesDesaprobados { get; set; }

        public int? FinalesDesaprobados { get; set; }
        public int? TotalFinalesDesaprobados { get; set; }
    }
}
