using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class ExamenReprobadoDTO
    {
        public ExamenReprobadoDTO(sp_KPI_Examenes_Reprobados_Result examenReprobadoModel)
        {
            this.Legajo = examenReprobadoModel.Legajo;
            this.Nombre = examenReprobadoModel.Nombre;
            this.Apellido = examenReprobadoModel.Apellido;
            this.Dni = examenReprobadoModel.Dni;
            this.Carrera = examenReprobadoModel.Carrera;
            this.Ciclo = examenReprobadoModel.Ciclo;
            this.Cuatri = examenReprobadoModel.Cuatri;
            this.Materia = examenReprobadoModel.Materia;
            this.Telefono = examenReprobadoModel.Telefono;
            this.Mail = examenReprobadoModel.Mail;
            this.ExamenesDesaprobados = examenReprobadoModel.ExamenesDesaprobados;
            this.TotalExamenesDesaprobados = examenReprobadoModel.TotalExamenesDesaprobados;
            this.Promedio = examenReprobadoModel.Promedio;
            this.TotalCantidadExamenesTomadosPorMateria = examenReprobadoModel.TotalCantidadExamenesTomadosPorMateria;
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
        public Nullable<int> ExamenesDesaprobados { get; set; }
        public Nullable<int> TotalExamenesDesaprobados { get; set; }
        public Nullable<decimal> Promedio { get; set; }
        public int? TotalCantidadExamenesTomadosPorMateria { get; set; }
    }
}
