using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UniPlanDTO
    {
        public UniPlanDTO(uniPlanes uniPlanesModel)
        {
            this.CodCar = uniPlanesModel.codcar;
            this.CantOp = uniPlanesModel.cantop;
            this.NombreCarrera = uniPlanesModel.nomcar;
            this.Tipo = uniPlanesModel.tipo;
            this.CantMaterias = uniPlanesModel.cantmat;
            this.CodEsc = uniPlanesModel.codesc;
            this.CantidadAnios = uniPlanesModel.cantidad_anios;
            this.Titulo = uniPlanesModel.Titulo;
            this.TituloIntermedio = uniPlanesModel.TituloIntermedio;
            this.AnioTituloIntermedio = uniPlanesModel.AnioTituloIntermedio;
            this.Publicable = uniPlanesModel.publicable;

            this.MateriaList = new List<UniPlanMateriaDTO>();
        }

        // TODO MODIFICAR NOMBRES
        public string CodCar { get; set; }
        public Nullable<int> CantOp { get; set; }
        public string NombreCarrera { get; set; }
        public Nullable<int> Tipo { get; set; }
        public Nullable<int> CantMaterias { get; set; }
        public string CodEsc { get; set; }
        public Nullable<int> CantidadAnios { get; set; }
        public string Titulo { get; set; }
        public string TituloIntermedio { get; set; }
        public Nullable<int> AnioTituloIntermedio { get; set; }
        public Nullable<bool> Publicable { get; set; }

        public List<UniPlanMateriaDTO> MateriaList { get; set; }
    }
}
