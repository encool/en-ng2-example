import { Component, ViewContainerRef } from '@angular/core';

// import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    //   constructor(overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    //     overlay.defaultViewContainer = vcRef;
    //   }
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