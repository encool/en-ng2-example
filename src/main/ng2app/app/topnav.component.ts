import { Component } from '@angular/core';
import { SecurityService } from './service/security.service'

import { Router } from '@angular/router';

import { Menu } from './object/menu';
import { MenuService } from './service/menu.service';

@Component({
    selector: 'top-nav',
    templateUrl: './topnav.component.html'
})
export class TopnavComponent {

    constructor(private securityService: SecurityService, private menuService: MenuService,
        private router: Router) {

    }

    onMenuToggle($event) {
        let e = $(".nav-md .container.body .col-md-3.left_col")
        let ml = e.css("margin-left")
        // debugger
        //大屏不需要处理
        if (ml == "0px") {
            return
        } else {
            e.css("margin-left", "0px")
            let right_col = $(".nav-md .container.body .right_col ")
            right_col.on("click", () => {
                e.css("margin-left", "-220px")
                right_col.unbind()
            })
            // debugger
        }
    }

    onBrdcrmbClick(m: Menu) {
        this.router.navigate([m.l, m])
    }

    logout() {
        this.securityService.logout()
    }

}