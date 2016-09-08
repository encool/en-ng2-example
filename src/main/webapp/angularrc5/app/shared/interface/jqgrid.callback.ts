export declare abstract class JqgridCallback{
    onSelectRow(rowid:string,status:string,e:any)
}
export class DefaultJqgridCallback implements JqgridCallback {
    onSelectRow(rowid: string, status: string, e: any){}
}