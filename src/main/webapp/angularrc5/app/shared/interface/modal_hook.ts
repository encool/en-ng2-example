import { ModalAction } from '../object/modal-action'

export declare abstract class modalOnSave {
    abstract modalOnSave(): Promise<any>
}
export declare abstract class onModalAction {
    abstract onModalAction(modalAction:ModalAction): Promise<any>
}

export declare abstract class onModalNativeEvent {
    abstract onModalNativeEvent(event:String,e:any): Promise<any>
}

export declare class ModalHook implements onModalAction,onModalNativeEvent{
    onModalNativeEvent(event:String,e:any): Promise<any>
    onModalAction(modalAction:ModalAction): Promise<any>
}