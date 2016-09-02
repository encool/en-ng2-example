import { ModalAction } from './modal-action'
import { modalOnSave } from '../interface/modal_hook'

export class ModalEvent {
    constructor(businessId:string,action:ModalAction,childContainer:modalOnSave,payload?:any){
        this.businessId = businessId;
        this.action = action;
        this.childContainer = childContainer
        this.payload = payload;
    }
    id: number;
    businessId:string;
    action:ModalAction
    childContainer:modalOnSave
    payload:any 
}