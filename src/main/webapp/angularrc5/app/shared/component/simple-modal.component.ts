import { Component, OnInit, ViewChild, ViewContainerRef, Compiler, Type, ComponentRef, ApplicationRef } from '@angular/core';
import { SysmanageModule } from '../../sysmanage/sysmanage.module'
import { ModalAction } from '../object/modal-action'
import { onModalAction } from '../interface/modal_hook'

@Component({
    moduleId: module.id,
    selector: 's-modal',
    templateUrl: 'simple-modal.component.html'
})
export class SimpleModalComponent implements OnInit {

    @ViewChild('wrapper', { read: ViewContainerRef }) wrapperRef: ViewContainerRef;

    _actions: ModalAction[]
    _width: string
    _modalstack = []
    _content: onModalAction
    _message: Function
    _dismiss: Function
    _success: Function

    constructor(private _comp: Compiler, private myComp: ApplicationRef) {
        this._width = "600px"
    }

    ngOnInit() { 
        $('#mysimpleModal').on('hidden.bs.modal', (e) => {debugger
            let cmpRef: ComponentRef<any> = this._modalstack.pop();
            if(cmpRef){
                cmpRef.destroy()
            }
        })
    }

    openConfirm(message, ref: ComponentRef<any>, success?: Function, dismisss?: Function) {
        this._message = message
        this._modalstack.push(ref)
        $("#mysimpleModal").modal("show")
        this._success = success
    }

    open(com: any, ngModule: any, ref: ComponentRef<any>, params: any, success?: Function, dismisss?: Function) {
        this._comp.compileComponentAsync(com, ngModule).then(f => {
            let cmpRef: ComponentRef<any> = this.wrapperRef.createComponent(f);
            this._content = cmpRef.instance
            this._modalstack.push(ref)
            cmpRef.instance.$model = params;
            this._success = success
            this._dismiss = dismisss
            $("#mysimpleModal").modal("show")
        });
        // var f = this._comp.compileComponentSync(com,ngModule)
        // let cmpRef:ComponentRef<any> = this.wrapperRef.createComponent(f)
        // this._success = success
        // this._dismiss = dismisss
        // $("#mysimpleModal").modal("show")
    }

    setActionBtnClass(action: ModalAction) {
        var style = "btn-default"
        var classes = {
            btn: true
        }
        if (action.style) {
            style = "btn-" + action.style
        }
        classes[style] = true;
        return classes
    }

    onAction(action: ModalAction) {
        if (action.cancel) {
            this.hide()
            this.onDismiss(action)
            return
        }

        if (this._content != undefined && this._content.onModalAction) {
            this._content.onModalAction(action).then(
                (data) => {
                    this._success(data);
                    this.hide()
                    // let cmpRef: ComponentRef<any> = this._modalstack.pop();
                    // cmpRef.destroy()
                },
                data => {
                    console.log("modal action be rejected," + data)
                })
        } else if (action.close) {
            this._success(action);
            this.hide()
            // let cmpRef: ComponentRef<any> = this._modalstack.pop();
            // cmpRef.destroy()
        } else {
            toastr.warning("need handle action:" + action.name)
        }
    }

    // onSuccess() {debugger
    //     if (this._content.modalOnSave) {
    //         this._content.modalOnSave().then((data) => {
    //             this._success(data);
    //             $("#mysimpleModal").modal("hide")
    //             let cmpRef: ComponentRef<any> = this._modalstack.pop();
    //             cmpRef.destroy()
    //         }, data => {
    //             alert("should not close now")
    //         })
    //     } else if (this._success) {
    //         this._success();
    //         $("#mysimpleModal").modal("hide")
    //         let cmpRef: ComponentRef<any> = this._modalstack.pop();
    //         cmpRef.destroy()
    //     }

    // }

    onDismiss(action) {
        if (this._dismiss) {
            this._dismiss(action);
        }
        // let cmpRef: ComponentRef<any> = this._modalstack.pop();
        // cmpRef.destroy()
    }

    show() {
        $("#mysimpleModal").modal("show")
    }

    hide() {
        $("#mysimpleModal").modal("hide")
    }
}