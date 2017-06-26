import { Component, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { ModalService } from './service/modal.service'
import { DictdataService } from './service/dictdata.service'

require('jquery')
let toastr = require('toastr')
// import { Modal } from 'angular2-modal/plugins/bootstrap';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver,
        public modalService: ModalService, private dictdataService: DictdataService) {
        let _modalContext = {
            vcRef: vcRef,
            componentFactoryResolver: componentFactoryResolver
        }
        modalService._modal_context = _modalContext;
    }
    ngOnInit() {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-center",
            "preventDuplicates": false,
            "onclick": null,
            "timeOut": 3000,
            "extendedTimeOut": 1000,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }

        this.dictdataService.getDictDataMaps(["工作流_审核状态", "工作流_处理结论", "工作流_事项分类"])
    }
}