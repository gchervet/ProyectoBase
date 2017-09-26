using ConfigurationData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class MenuDTO
    {
        public MenuDTO(Menu menuModel)
        {
            Id = menuModel.Id;
            Name = menuModel.Name;
            IdMenuGroup = menuModel.IdMenuGroup;
            Detail = menuModel.Detail;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int IdMenuGroup { get; set; }
        public string Detail { get; set; }

        public List<PermissionDTO> PermissionList { get; set; }
    }
}
