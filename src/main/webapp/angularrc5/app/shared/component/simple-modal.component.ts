import { Component, OnInit, ViewChild, ViewContainerRef, Compiler, Type, ComponentRef } from '@angular/core';
import { SysmanageModule } from '../../sysmanage/sysmanage.module'

@Component({
    moduleId: module.id,
    selector: 's-modal',
    templateUrl: 'simple-modal.component.html'
})
export class SimpleModalComponent implements OnInit {
    @ViewChild('wrapper', {read: ViewContainerRef}) wrapperRef: ViewContainerRef;
    _message:Function
    _dismiss:Function
    private _success:Function

    constructor(private _comp: Compiler) { }

    ngOnInit() { }

    openConfirm(payload,success:Function){
        this._message = payload.message
        $("#mysimpleModal").modal("show")
        this._success = success
    }

    open(com:any,ngModule:any,params:any,success?:Function,dismisss?:Function){debugger
        // this._comp.compileComponentAsync(com).then(f => {
        //     let cmpRef:ComponentRef<any> = this.wrapperRef.createComponent(f);
        //     cmpRef.instance.someInput = params;
        //     this._success = success
        //     $("#mysimpleModal").modal("show")
        // });
        var f = this._comp.compileComponentSync(com,ngModule)
        let cmpRef:ComponentRef<any> = this.wrapperRef.createComponent(f)
        this._success = success
        this._dismiss = dismisss
        $("#mysimpleModal").modal("show")
    }

    onSuccess(){
        if(this._success){
            this._success();
        }
        $("#mysimpleModal").modal("hide")
    }
    
    onDismiss(){
        if(this._dismiss){
            this._dismiss();
        } 
    }
}