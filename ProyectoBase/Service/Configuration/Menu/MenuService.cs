using ConfigurationData;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class MenuService
    {
        public static MenuDTO GetById(int idMenu)
        {
            Menu menuModel = MenuDAL.GetById(idMenu);

            if (menuModel != null)
            {
                MenuDTO rtn = new MenuDTO(menuModel);
                rtn.PermissionList = GetMenuPermissionByMenuId(idMenu);
                return rtn;
            }

            return null;
        }

        public static List<PermissionDTO> GetMenuPermissionByMenuId(int idMenu)
        {
            List<PermissionDTO> rtn = new List<PermissionDTO>();
            List<MenuPermission> menuPermissionModelList = MenuDAL.GetMenuPermissionByMenuId(idMenu);

            foreach (MenuPermission menuPermissionModel in menuPermissionModelList)
            {
                PermissionDTO permission = PermissionService.GetById(menuPermissionModel.IdPermission);

                if (permission != null)
                {
                    rtn.Add(permission);
                }
            }
            return rtn;
        }

        public static List<MenuGroupDTO> GetAll()
        {
            List<MenuGroupDTO> rtn = new List<MenuGroupDTO>();
            List<SP_MenuGroup_Menu_GetAll_Result> menuGroupModelList = MenuDAL.GetAll();

            foreach (SP_MenuGroup_Menu_GetAll_Result menuGroupModel in menuGroupModelList)
            {
                if (rtn.Any(x => x.Id == menuGroupModel.IdMenuGroup))
                {
                    // El grupo ya fue generado en la lista de devolución.
                    MenuGroupDTO actualMenu = rtn.Where(z => z.Id == menuGroupModel.IdMenuGroup).FirstOrDefault();

                    if (actualMenu != null)
                    {
                        if (!actualMenu.MenuList.Any(y => y.Id == menuGroupModel.IdMenu))
                        {
                            actualMenu.MenuList.Add(MenuService.GetById(menuGroupModel.IdMenu));
                        }
                    }
                }
                else
                {
                    // El grupo no fue generado en la lista de devolución. Se genera.

                    MenuGroupDTO menuGroup = new MenuGroupDTO();
                    menuGroup.Id = menuGroupModel.IdMenuGroup;
                    menuGroup.Name = menuGroupModel.MenuGroupName;
                    menuGroup.MenuList = new List<MenuDTO>();
                    menuGroup.MenuList.Add(MenuService.GetById(menuGroupModel.IdMenu));

                    rtn.Add(menuGroup);
                }
            }
            return rtn;
        }
    }
}
