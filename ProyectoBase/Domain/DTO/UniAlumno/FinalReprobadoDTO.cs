using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class FinalReprobadoDTO
    {
        public FinalReprobadoDTO(sp_KPI_Finales_Reprobados_Result examenReprobadoModel)
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
            this.FinalesDesaprobados = examenReprobadoModel.FinalesDesaprobados;
            this.TotalFinalesDesaprobados = examenReprobadoModel.TotalFinalesDesaprobados;
            this.Promedio = examenReprobadoModel.Promedio;
            this.TotalCantidadFinalesTomadosPorMateria = examenReprobadoModel.TotalCantidadFinalesTomadosPorMateria;
        }

        public int Legajo { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public Nullable<decimal> Dni { get; set; }
        public string Carrera { get; set; }
        public int? Ciclo { get; set; }
        public int? Cuatri { get; set; }
        public string Materia { get; set; }
        public string Telefono { get; set; }
        public string Mail { get; set; }
        public Nullable<int> FinalesDesaprobados { get; set; }
        public Nullable<int> TotalFinalesDesaprobados { get; set; }
        public Nullable<decimal> Promedio { get; set; }
        public int? TotalCantidadFinalesTomadosPorMateria { get; set; }
    }
}
