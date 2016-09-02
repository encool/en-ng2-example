import { BaseAction } from './base-action'
export class ModalAction extends BaseAction{
    isCancel: boolean = false
    constructor(key:string,name:string,order:number,isCancel?:boolean){
        super(key,name,order);
        this.isCancel = isCancel
    }
}