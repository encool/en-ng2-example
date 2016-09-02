import { Injectable, ViewContainerRef, Compiler, ComponentRef, Type } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { SimpleModalComponent } from '../shared/component/simple-modal.component'

@Injectable()
export class ModalService {
    _ref:ComponentRef<SimpleModalComponent>
    constructor(){
    }
    openConfirm(vcRef: ViewContainerRef,compiler:Compiler,payload:any,success:Function){
        if(this._ref){
            this._ref.instance.openConfirm(payload,success)
        }else{
            compiler.compileComponentAsync(SimpleModalComponent).then(comp => {
                this._ref = vcRef.createComponent(comp);
                this._ref.instance.openConfirm(payload,success)
            })
        }

    }

    open(vcRef: ViewContainerRef,compiler:Compiler,com:Type,ngModule:Type,params:any,success:Function){debugger
        if(this._ref){
            this._ref.instance.open(com,ngModule,params,success)
        }else{
            compiler.compileComponentAsync(SimpleModalComponent).then(compf => {
                this._ref = vcRef.createComponent(compf);
                this._ref.instance.open(com,ngModule,params,success)
            })
        }

    }    
}