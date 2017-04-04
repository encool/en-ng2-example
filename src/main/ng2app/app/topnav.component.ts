import { Component } from '@angular/core';
import { SecurityService } from './service/security.service'

import { MenuService } from './service/menu.service';

@Component({
    selector: 'top-nav',
    templateUrl: './topnav.component.html'
})
export class TopnavComponent {

    constructor(private securityService: SecurityService, private menuService: MenuService) {

    }

    logout() {
        this.securityService.logout()
    }

}