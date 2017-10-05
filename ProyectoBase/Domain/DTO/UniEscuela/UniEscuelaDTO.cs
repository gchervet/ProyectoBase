using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UniEscuelaDTO
    {
        public UniEscuelaDTO(uniEscuelas uniEscuelasModel)
        {
            Codigo = uniEscuelasModel.Codigo;
            Nombre = uniEscuelasModel.Nombre;
            Nivel = uniEscuelasModel.Nivel;
            HabilitaInscripcion = uniEscuelasModel.HabilitaInscripcion;
            Publicar = uniEscuelasModel.Publicar;
            FacultadId = uniEscuelasModel.FacultadId;
            Tipo = uniEscuelasModel.Tipo;

            ModalidadList = new List<UniEscuelaModalidadDTO>();
        }
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public string Nivel { get; set; }
        public Nullable<bool> HabilitaInscripcion { get; set; }
        public Nullable<bool> Publicar { get; set; }
        public Nullable<int> FacultadId { get; set; }
        public string Tipo { get; set; }

        public List<UniEscuelaModalidadDTO> ModalidadList { get; set; }
    }
}