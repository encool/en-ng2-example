import { ModalAction } from '../object/modal-action'

export declare abstract class modalOnSave {
    abstract modalOnSave(): Promise<any>
}
export declare abstract class onModalAction {
    abstract onModalAction(modalAction:ModalAction): Promise<any>
}