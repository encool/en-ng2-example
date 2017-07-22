import { Component, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { ModalService } from '../service/modal.service'
import { DictdataService } from '../service/dictdata.service'
import { MenuService } from '../core/menu/menu.service'
import { Menu } from '../core/menu/menu'


import "@angular/material/prebuilt-themes/indigo-pink.css"
import '../../css/mapp.css'
// require('jquery')
// let toastr = require('toastr')
// import { Modal } from 'angular2-modal/plugins/bootstrap';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    menus: Menu[] = new Array();
    constructor(private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver,
        public modalService: ModalService, private dictdataService: DictdataService, private menuService: MenuService, ) {
        let _modalContext = {
            vcRef: vcRef,
            componentFactoryResolver: componentFactoryResolver
        }
        modalService._modal_context = _modalContext;
    }
    ngOnInit() {
        this.menuService.getMenus().then(menus => {
            this.menus = menus
        })

        this.dictdataService.getDictDataMaps(["工作流_审核状态", "工作流_处理结论", "工作流_事项分类"])
    }
}