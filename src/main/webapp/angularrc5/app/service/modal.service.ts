import { Injectable, ViewContainerRef, Compiler, ComponentRef, Type } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { SimpleModalComponent } from '../shared/component/simple-modal.component'
import { ModalAction } from '../shared/object/modal-action'
@Injectable()
export class ModalService {

    _default_actions: Array<ModalAction> = [
        new ModalAction({ key: "cancel", name: "取消", order: 1, cancel: true, style: "default" }),
        new ModalAction({ key: "close", name: "保存", order: 2, close: true })
    ]
    _smodalstack = []
    // _ref:ComponentRef<SimpleModalComponent>
    constructor() {
    }
    openConfirm(modalContext:
        {
            vcRef: ViewContainerRef
            compiler: Compiler
            ngModule: Type
        },
        modalOptions: {
            actions?: ModalAction[]
            width?: string
            message: string
        },
        success?: Function, dismiss?: Function) {
        modalContext.compiler.compileComponentAsync(SimpleModalComponent).then(compf => {
            let _ref: ComponentRef<SimpleModalComponent> = modalContext.vcRef.createComponent(compf);
            _ref.instance.openConfirm(modalOptions.message, _ref, success, dismiss)
            _ref.instance._width = modalOptions.width
            _ref.instance._actions = modalOptions.actions == undefined ? this._default_actions : modalOptions.actions
        })
    }

    open(modalContext:
        {
            vcRef: ViewContainerRef
            compiler: Compiler
            ngModule: Type
        },
        modalOptions: {
            comp: Type
            actions?: ModalAction[]
            width?: string
        },
        params: any,
        success?: Function, dismiss?: Function) {
        modalContext.compiler.compileComponentAsync(SimpleModalComponent).then(compf => {
            let _ref: ComponentRef<SimpleModalComponent> = modalContext.vcRef.createComponent(compf);
            _ref.instance.open(modalOptions.comp, modalContext.ngModule, _ref, params, success, dismiss)
            _ref.instance._width = modalOptions.width
            _ref.instance._actions = modalOptions.actions
        })
    }
}