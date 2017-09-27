using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConfigurationData
{
    public class UserDAL
    {
        public static List<UserRole> GetUserRole(string username)
        {
            if (username != null)
            {
                using (var configuration_context = new Configuration_Entities())
                {
                    return configuration_context.UserRole.Where(x => x.Username == username).ToList();
                }
            }
            return new List<UserRole>();
        }

        public static List<Permission> GetUserPermissionList(string username)
        {
            List<Permission> rtn = new List<Permission>();
            if (username != null)
            {
                using (var configuration_context = new Configuration_Entities())
                {
                    List<UserRole> userRoleList = GetUserRole(username);
                    foreach (UserRole userRole in userRoleList)
                    {
                        List<RolePermission> userRolePermissionList = configuration_context.RolePermission.Where(x => x.IdRole == userRole.IdRole).ToList();

                        foreach (RolePermission userRolePermission in userRolePermissionList)
                        {
                            Permission permissionToAdd = configuration_context.Permission.Where(x => x.Id == userRolePermission.IdPermission).FirstOrDefault();

                            if (permissionToAdd != null)
                            {
                                rtn.Add(permissionToAdd);
                            }
                        }
                    }
                }
            }
            return rtn;
        }
    }
}
