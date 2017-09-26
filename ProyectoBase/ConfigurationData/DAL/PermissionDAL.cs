using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConfigurationData
{
    public class PermissionDAL
    {
        public static Permission GetById(int idPermission)
        {
            using (var configuration_context = new Configuration_Entities())
            {
                return configuration_context.Permission.Where(x => x.Id == idPermission).FirstOrDefault();
            }
        }

        public static List<MenuPermission> GetMenuPermissionByPermissionId(int idPermission)
        {
            using (var configuration_context = new Configuration_Entities())
            {
                return configuration_context.MenuPermission.Where(x => x.IdPermission == idPermission).ToList();
            }
        }
    }
}
