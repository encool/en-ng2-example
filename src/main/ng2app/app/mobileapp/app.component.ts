import { Component, ViewContainerRef, ComponentFactoryResolver, HostListener } from '@angular/core';
import { Router } from '@angular/router'

import { ModalService } from '../service/modal.service'
import { DictdataService } from '../service/dictdata.service'
import { MenuService } from '../core/menu/menu.service'
import { SecurityService } from '../core/security/security.service'
import { Menu } from '../core/menu/menu'


import "@angular/material/prebuilt-themes/indigo-pink.css"
import '../../css/mapp.css'

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {

    isSideBySide = false;

    private sideBySideWidth = 992;

    menus: Menu[] = new Array();
    userDTO: any

    get mode() { return this.isSideBySide ? 'side' : 'over'; }

    constructor(private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver,
        public router: Router, private dictdataService: DictdataService, private menuService: MenuService,
        private securityService: SecurityService) {
        let _modalContext = {
            vcRef: vcRef,
            componentFactoryResolver: componentFactoryResolver
        }
        // modalService._modal_context = _modalContext;
    }
    ngOnInit() {
        this.onResize(window.innerWidth);

        this.menuService.getMenus().then(menus => {
            this.menus = menus
        })

        this.dictdataService.getDictDataMaps(["工作流_审核状态", "工作流_处理结论", "工作流_事项分类"])

        this.securityService.getSubject().subscribe((data) => {
            this.userDTO = data.userDTO
        }
        )
    }

    @HostListener('window:resize', ['$event.target.innerWidth'])
    onResize(width) {
        this.isSideBySide = width > this.sideBySideWidth;
    }

    menuClick(menu) {
        switch (menu) {
            case "todo":
                this.router.navigate(['workflow/tasktodo',])
                break;
            case "start":
                this.router.navigate(['workflow/serviceproductentry',])
                break;
            default:
                break;
        }

    }
}