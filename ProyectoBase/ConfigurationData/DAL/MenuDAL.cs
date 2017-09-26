using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConfigurationData
{
    public class MenuDAL
    {
        public static List<SP_MenuGroup_Menu_GetAll_Result> GetAll()
        {
            using (var configuration_context = new Configuration_Entities())
            {
                return configuration_context.SP_MenuGroup_Menu_GetAll().ToList();
            }
        }

        public static Menu GetById(int idMenu)
        {
            using (var configuration_context = new Configuration_Entities())
            {
                return configuration_context.Menu.Where(x => x.Id == idMenu).FirstOrDefault();
            }
        }

        public static List<MenuPermission> GetMenuPermissionByMenuId(int idMenu)
        {
            using (var configuration_context = new Configuration_Entities())
            {
                return configuration_context.MenuPermission.Where(x => x.IdMenu == idMenu).ToList();
            }
        }
    }
}
