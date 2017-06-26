import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../menu/menu';
import { MenuService } from '../menu/menu.service';
import { SecurityService } from '../security/security.service';


@Component({
    selector: 'my-menubar',
    templateUrl: './menusidebar.component.html',
})
export class MenusidebarComponent {
    menus: Menu[];
    selectedMenus: Menu[];

    userDTO: any = {}

    constructor(private securityService: SecurityService, private menuService: MenuService,
        private router: Router) {

    }

    geMenus() {
        return this.menuService.getMenus();
    }

    ngOnInit() {
        this.geMenus().then(menus => {
            this.menus = menus;
            console.log("this.menus", this.menus)
        });
        this.securityService.getSubject().subscribe((data) => {
            this.userDTO = data.userDTO
        }
        )
    }

    ngAfterViewInit() {

    }

    ngDoCheck() {

    }

    setfirstLiClass(menu: Menu) {
        let selectedMenus = this.menuService.selectedMenus
        let firstLevelMenu = selectedMenus.length > 0
            ? selectedMenus[selectedMenus.length - 1] : undefined
        let firstActive
        if (firstLevelMenu) {
            firstActive = (firstLevelMenu.t == menu.t)
        } else {
            firstActive = false
        }
        let classes = {
            active: firstActive
        };
        return classes
    }

    setOtherLiClass(menu: Menu) {
        let selectedMenus = this.menuService.selectedMenus
        let active
        for (let i in selectedMenus) {
            let cMenu = selectedMenus[i]
            if (cMenu.l == menu.l) {
                active = true
                break
            } else {
                active = false
            }
        }
        let classes = {
            'current-page': active
        };
        return classes
    }

    setIconClasses(menu) {
        var icon = menu.i;
        let classes = {
            fa: true
        };
        classes[icon] = true;
        return classes;
    }

    setMenuId(menu, index, isherf) {
        var a = decodeURI(menu.t);
        a = a.replace(/%/g, 'a');
        if (isherf) {
            return '#' + a
        } else {
            return a
        }
    }

    setrouterLink(menu, index, isherf) {
        if (menu.l) {
            return [menu.l, menu];
        } else {
            return []
        }
    }

    menuClick(menu: Menu, e) {
        if (menu.l) {
            this.right_colClick()
            this.router.navigate([menu.l, menu])
        }
        var $this = $(e.target);
        var parent = $this.data('parent');
        var actives = parent && $(parent).find('.collapse.in');
        if (actives && actives.length) {
            let hasData = actives.data('collapse');
            if (hasData && hasData.transitioning) {
                return;
            }
            actives.collapse('hide');
        }
    }

    private right_colClick() {
        let right_col = $(".nav-md .container.body .right_col ")
        right_col.click()
    }
}