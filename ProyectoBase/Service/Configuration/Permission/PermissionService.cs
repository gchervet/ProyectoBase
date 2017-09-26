using ConfigurationData;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class PermissionService
    {
        public static Domain.PermissionDTO GetById(int idPermission)
        {
            Permission permissionModel = PermissionDAL.GetById(idPermission);
            if(permissionModel != null)
            {
                return new PermissionDTO(permissionModel);
            }
            return null;
        }
    }
}
