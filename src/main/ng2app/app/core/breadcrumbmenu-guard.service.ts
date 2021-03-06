import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from '@angular/router';

import { MenuService } from './menu/menu.service';
import { Menu } from './menu/menu';

@Injectable()
export class BreadcrumbmenuGuard implements CanActivate {

  constructor(private menuService: MenuService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // debugger
    let p = route.params
    let url: string = state.url;
    return true
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let menu: any = route.params
    if (menu.l) {
      this.menuService.getMenus().then(menus => {
        this.menuService.initBreadcrumbArray()
        this.setBreadcrumbArray(menu, menus)
        this.menuService.setMenuSelected(menu.l)
      })
    }
    return true
  }

  setBreadcrumbArray(target: Menu, menus: Array<Menu>): boolean {
    for (let m in menus) {
      let menu: Menu = menus[m]
      this.menuService.breadcrumbArray.push(menu)
      //get it
      if (menu.l == target.l) {
        return true
      } else if (menu.c && menu.c.length > 0) { //查詢咨菜單
        let isInChildren = this.setBreadcrumbArray(target, menu.c)
        if (isInChildren) {
          return true
        } else {
          this.menuService.breadcrumbArray.pop()
        }
      } else { //出棧
        this.menuService.breadcrumbArray.pop()
      }
    }
    menus.forEach(i => {

    })
  }
}
