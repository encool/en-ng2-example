import { ComponentFactory,Component, OnInit, ViewChild, ViewContainerRef, Compiler, Type, ComponentRef, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { SysmanageModule } from '../../sysmanage/sysmanage.module'
import { ModalAction } from '../object/modal-action'
import { ModalHook } from '../interface/modal_hook'

@Component({
    selector: 's-modal',
    templateUrl: './simple-modal.component.html'
})
export class SimpleModalComponent implements OnInit {

    @ViewChild('wrapper', { read: ViewContainerRef }) wrapperRef: ViewContainerRef;

    _actions: ModalAction[]
    _width: string
    _height: string|number
    _title: string

    _content: ModalHook
    _message: Function
    _dismiss: Function
    _success: Function

    hidecallback: Function
    hidecallback_params:any

    constructor(private _comp: Compiler, private myComp: ApplicationRef) {
        this._width = "750px"
        this._height = "auto"
        this._title = "是否确认"
    }

    ngOnInit() { 
        this.hidecallback = this._dismiss
        $('#mysimpleModal').on('hidden.bs.modal', (e) => {
            if(this.hidecallback){
                this.hidecallback(this.hidecallback_params)
            }
            if(this._content.onModalNativeEvent){
                this._content.onModalNativeEvent('hidden.bs.modal',e)
            }
        })
        $('#mysimpleModal').on('shown.bs.modal', (e) => {
            this._width = this._width
            if(this._content.onModalNativeEvent){
                this._content.onModalNativeEvent('shown.bs.modal',e)
            }
        })
    }

    openConfirm(message,success?: Function, dismisss?: Function) {
        this._message = message
        this.show()
        this._success = success
        this._dismiss = dismisss
    }

    open(myComponentFactory:ComponentFactory<any>, params: any, success?: Function, dismisss?: Function) {
        let cmpRef: ComponentRef<any> = this.wrapperRef.createComponent(myComponentFactory);
        this._content = cmpRef.instance
        //兼容设置
        cmpRef.instance.$model = params
        cmpRef.instance.model = params
        this._success = success
        this._dismiss = dismisss
        this.show()
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
            this.hidecallback = this._dismiss
            this.hidecallback_params = {action:action}
            this.hide()
            return
        }

        if (this._content != undefined && this._content.onModalAction) {
            this._content.onModalAction(action).then(
                (data) => {
                    this.hidecallback = this._success;
                    this.hidecallback_params = {action:action,data:data}
                    this.hide()
                },
                data => {
                    console.log("modal action be rejected," + data)
                })
        } else if (action.close) {
            this.hidecallback = this._success;
            this.hidecallback_params = {action:action}
            this.hide()
        } else {
            toastr.warning("need handle action:" + action.name)
        }
    }

    show() {
        $("#mysimpleModal").modal("show")
    }

    hide() {
        $("#mysimpleModal").modal("hide")
    }
}