import { Component, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { ModalService } from './service/modal.service'
// import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver,
        public modalService: ModalService) {
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
    }
}