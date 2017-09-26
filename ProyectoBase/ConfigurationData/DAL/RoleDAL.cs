using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq;
using System.Threading.Tasks;

namespace ConfigurationData
{
    public class RoleDAL
    {
        public static Role GetById(int idRole)
        {
            using (var configuration_context = new Configuration_Entities())
            {
                return configuration_context.Role.Where(x => x.Id == idRole).FirstOrDefault();
            }
        }

        public static List<UserRole> GetUserRolesByUsername(string username)
        {
            using (var configuration_context = new Configuration_Entities())
            {
                return configuration_context.UserRole.Where(x => x.Username == username).ToList();
            }
        }

        public static List<RolePermission> GetPermissionRolesByRoleId(int idRole)
        {
            using (var configuration_context = new Configuration_Entities())
            {
                return configuration_context.RolePermission.Where(x => x.IdRole == idRole).ToList();
            }
        }
    }
}
