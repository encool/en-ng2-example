import { JqgridAction } from './jqgrid-action'

export class JqgridEvent {
    businessId:string
    action:JqgridAction
    rowId:string
    rowData:any
    rowDatas:Array<any>
    constructor(businessId:string,action:JqgridAction,rowId?:string,rowData?:any,rowDatas?:Array<any>){
        this.businessId = businessId;
        this.action = action
        this.rowId = rowId
        this.rowData = rowData
        this.rowDatas = rowDatas
    }
}