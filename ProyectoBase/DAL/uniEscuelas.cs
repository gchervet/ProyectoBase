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
    using System.Collections.Generic;
    
    public partial class uniEscuelas
    {
        public uniEscuelas()
        {
            this.UniEscuelasModalidades = new HashSet<UniEscuelasModalidades>();
            this.uniPlanes = new HashSet<uniPlanes>();
        }
    
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public string Nivel { get; set; }
        public Nullable<bool> HabilitaInscripcion { get; set; }
        public Nullable<bool> Publicar { get; set; }
        public Nullable<int> FacultadId { get; set; }
        public string Tipo { get; set; }
    
        public virtual ICollection<UniEscuelasModalidades> UniEscuelasModalidades { get; set; }
        public virtual ICollection<uniPlanes> uniPlanes { get; set; }
    }
}
