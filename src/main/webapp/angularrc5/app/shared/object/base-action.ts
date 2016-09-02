export abstract class BaseAction {
    key: string
    name: string
    order: number
    constructor(key:string,name:string,order?:number){
        this.key = key;
        this.name = name;
        this.order = order;
    }
}