import { BaseAction } from './base-action'
export class TreeAction extends BaseAction {
    constructor(key:string,name:string,order?:number){
        super(key,name,order)
    }
}