import { Injectable, ViewContainerRef, Compiler, ComponentRef, Type, ComponentFactoryResolver } from '@angular/core';
// import { Injectable } from '@angular/platform-browser-dynamic'

import 'rxjs/add/operator/toPromise';

import { SimpleModalComponent } from '../shared/component/simple-modal.component'
import { ModalAction } from '../shared/object/modal-action'
@Injectable()
export class ModalService {

    _modal_context: {
        vcRef: ViewContainerRef
        componentFactoryResolver: ComponentFactoryResolver
    }

    _default_actions: Array<ModalAction> = [
        new ModalAction({ key: "cancel", name: "取消", order: 1, cancel: true, style: "default" }),
        new ModalAction({ key: "close", name: "保存", order: 2, close: true })
    ]

    _confirm_actions: Array<ModalAction> = [
        new ModalAction({ key: "cancel", name: "取消", order: 1, cancel: true, style: "default" }),
        new ModalAction({ key: "close", name: "确定", order: 2, close: true })
    ]
    _smodalstack = []
    // _ref:ComponentRef<SimpleModalComponent>
    constructor() {
    }
    openConfirm(modalContext:
        {
            vcRef: ViewContainerRef
            componentFactoryResolver: ComponentFactoryResolver
        },
        modalOptions: {
            actions?: ModalAction[]
            width?: string
            message: string
            title?: string
            height?: string | number
        },
        success?: Function, dismiss?: Function) {
        let myComponentFactory = modalContext.componentFactoryResolver.resolveComponentFactory(SimpleModalComponent);
        let _ref: ComponentRef<SimpleModalComponent> = modalContext.vcRef.createComponent(myComponentFactory);

        let successwrapper = (data) => {
            if (success) {
                success(data)
            }
            this.destroy();
        }


        let dismisswrapper = (data) => {
            if (dismiss) {
                dismiss(data)
            }
            this.destroy();
        }

        this._smodalstack.push(_ref)

        _ref.instance.openConfirm(modalOptions.message, successwrapper, dismisswrapper)
        _ref.instance._width = modalOptions.width
        _ref.instance._height = modalOptions.height
        _ref.instance._title = modalOptions.title
        _ref.instance._actions = modalOptions.actions == undefined ? this._confirm_actions : modalOptions.actions
    }

    open(modalContext:
        {
            vcRef: ViewContainerRef
            componentFactoryResolver: ComponentFactoryResolver
        },
        modalOptions: {
            comp: Type<any>
            actions?: ModalAction[]
            width?: string
            title?: string
            height?: string | number
        },
        params: any,
        success?: Function, dismiss?: Function) {
        let myComponentFactory = modalContext.componentFactoryResolver.resolveComponentFactory(SimpleModalComponent);
        let _ref: ComponentRef<SimpleModalComponent> = modalContext.vcRef.createComponent(myComponentFactory);
        // let _ref: ComponentRef<SimpleModalComponent> = this._modal_context.vcRef.createComponent(myComponentFactory);
        let myContentComponentFactory = modalContext.componentFactoryResolver.resolveComponentFactory(modalOptions.comp);

        let successwrapper = (data) => {
            if (success) {
                success(data)
            }
            this.destroy();
        }


        let dismisswrapper = (data) => {
            if (dismiss) {
                dismiss(data)
            }
            this.destroy();
        }

        this._smodalstack.push(_ref)

        _ref.instance.open(myContentComponentFactory, params, successwrapper, dismisswrapper)
        _ref.instance._width = modalOptions.width
        _ref.instance._height = modalOptions.height
        _ref.instance._title = modalOptions.title
        _ref.instance._actions = modalOptions.actions == undefined ? this._default_actions : modalOptions.actions
    }

    open2(
        modalOptions: {
            comp: Type<any>
            actions?: ModalAction[]
            width?: string
            title?: string
            height?: string | number
        },
        params: any,
        success?: Function, dismiss?: Function) {
        debugger
        let myComponentFactory = this._modal_context.componentFactoryResolver.resolveComponentFactory(SimpleModalComponent);
        let _ref: ComponentRef<SimpleModalComponent> = this._modal_context.vcRef.createComponent(myComponentFactory);
        let myContentComponentFactory = this._modal_context.componentFactoryResolver.resolveComponentFactory(modalOptions.comp);

        let successwrapper = (data) => {
            if (success) {
                success(data)
            }
            this.destroy();
        }


        let dismisswrapper = (data) => {
            if (dismiss) {
                dismiss(data)
            }
            this.destroy();
        }

        this._smodalstack.push(_ref)

        _ref.instance.open(myContentComponentFactory, params, successwrapper, dismisswrapper)
        _ref.instance._width = modalOptions.width
        _ref.instance._height = modalOptions.height
        _ref.instance._title = modalOptions.title
        _ref.instance._actions = modalOptions.actions == undefined ? this._default_actions : modalOptions.actions
    }

    destroy() {
        let cmpRef: ComponentRef<any> = this._smodalstack.pop();
        cmpRef.destroy()
    }
}