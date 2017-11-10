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

        public KPIInasistenciasDTO(ExamenReprobadoDTO examenReprobado)
        {
            this.Legajo = examenReprobado.Legajo;
            this.Nombre = examenReprobado.Nombre;
            this.Apellido = examenReprobado.Apellido;
            this.Dni = examenReprobado.Dni;
            this.Carrera = examenReprobado.Carrera;
            this.Ciclo = examenReprobado.Ciclo;
            this.Cuatri = examenReprobado.Cuatri;
            this.Materia = examenReprobado.Materia;
            this.Telefono = examenReprobado.Telefono;
            this.Mail = examenReprobado.Mail;


            this.ExamenesDesaprobados = examenReprobado.ExamenesDesaprobados;
            this.TotalExamenesDesaprobados = examenReprobado.TotalExamenesDesaprobados;
            this.PromedioExamenesReprobados = examenReprobado.Promedio;
        }

        public KPIInasistenciasDTO(FinalReprobadoDTO finalReprobado)
        {
            this.Legajo = finalReprobado.Legajo;
            this.Nombre = finalReprobado.Nombre;
            this.Apellido = finalReprobado.Apellido;
            this.Dni = finalReprobado.Dni;
            this.Carrera = finalReprobado.Carrera;
            this.Materia = finalReprobado.Materia;
            this.Telefono = finalReprobado.Telefono;
            this.Mail = finalReprobado.Mail;

            this.FinalesDesaprobados = finalReprobado.FinalesDesaprobados;
            this.TotalFinalesDesaprobados = finalReprobado.TotalFinalesDesaprobados;
            this.PromedioFinalesReprobados = finalReprobado.Promedio;
        }

        public KPIInasistenciasDTO(KPIMorososDTO moroso)
        {
            this.Legajo = moroso.Legajo;
            this.Nombre = moroso.Nombre;
            this.Apellido = moroso.Apellido;
            this.Dni = moroso.Dni;
            this.Carrera = moroso.Carrera;
            this.Telefono = moroso.Telefono;
            this.Mail = moroso.Mail;

            this.DeudaMonto = moroso.DeudaTotal;
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
        public int? TotalCantidadExamenesTomadosPorMateria { get; set; }

        public int? FinalesDesaprobados { get; set; }
        public int? TotalFinalesDesaprobados { get; set; }
        public int? TotalCantidadFinalesTomadosPorMateria { get; set; }

        public decimal? DeudaMonto { get; set; }
    }
}
