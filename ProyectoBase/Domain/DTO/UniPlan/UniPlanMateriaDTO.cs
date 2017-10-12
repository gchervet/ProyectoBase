using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UniPlanMateriaDTO
    {
        public UniPlanMateriaDTO(sp_get_PlanesMateriasDetalladasByCodigoPlan_Result uniPlanesMateriasModel)
        {
            this.CodigoMateria = uniPlanesMateriasModel.codigo;
            this.Fila = uniPlanesMateriasModel.Fila;
            this.Anio = uniPlanesMateriasModel.anio;
            this.Cuatri = uniPlanesMateriasModel.cuatri;
            this.TipoMateria = uniPlanesMateriasModel.TipoMateria;
            this.Idioma = uniPlanesMateriasModel.Idioma;
            this.Modalidad = uniPlanesMateriasModel.modalidad;
            this.Clasespresenciales = uniPlanesMateriasModel.clasespresenciales;
            this.Modulosdistancia = uniPlanesMateriasModel.modulosdistancia;
            this.Anual = uniPlanesMateriasModel.anual;
            this.NombreMateria = uniPlanesMateriasModel.NombreMateria;
            this.ConceptoId = uniPlanesMateriasModel.ConceptoId;
        }

        public string CodigoMateria { get; set; }
        public int Fila { get; set; }
        public Nullable<int> Anio { get; set; }
        public Nullable<int> Cuatri { get; set; }
        //public Nullable<int> Obliga1 { get; set; }
        public int TipoMateria { get; set; }
        public bool Idioma { get; set; }
        public Nullable<int> Modalidad { get; set; }
        public Nullable<int> Clasespresenciales { get; set; }
        public Nullable<int> Modulosdistancia { get; set; }
        public Nullable<bool> Anual { get; set; }
        public string NombreMateria { get; set; }
        public string ConceptoId { get; set; }
    }
}
