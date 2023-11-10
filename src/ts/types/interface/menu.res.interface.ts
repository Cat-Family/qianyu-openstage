import { IconMapKey } from '../../../components/NavbarLinksGroup/NavbarLinksGroup';

export interface MenuTree {
  menuItem?: {
    catalogIcon: IconMapKey;
    catalogId: string;
    catalogLevel: number;
    catalogName: string;
    routers: {
      path: string;
      routeLevel: number;
      routerIcon: string;
      routerId: string;
      routerName: string;
    }[];
  };
  routerItem?: {
    path: string;
    routeLevel: number;
    routerIcon: IconMapKey;
    routerId: string;
    routerName: string;
  };
}

export interface LoadMenuTreeRes {
  code: number;
  data: MenuTree[];
  message: string;
}
