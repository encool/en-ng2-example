export class Tab {
    name:string
    key:string
    active:boolean
    href:string
    constructor(options:{
        name?:string,
        key?:string,
        active?:boolean,
        href?:string
    } = {}){
        this.name = options.name
        this.key = options.key
        this.active = options.active
        this.href = options.href
    }
}