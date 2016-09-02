
export declare abstract class ZtreeCallback{
    onCheck(event: any, treeId: string, treeNode: any)
    onSelectRow(rowid:string,status:string,e:any)
}

export declare enum ZtreeCallback1 {
    onCheck = 0,
    onSelectRow = 1,
    // DoCheck = 2,
    // OnChanges = 3,
    // AfterContentInit = 4,
    // AfterContentChecked = 5,
    // AfterViewInit = 6,
    // AfterViewChecked = 7,
}

export declare var ZTREE_CALLBACK_VALUES: ZtreeCallback1[];

export declare abstract class onCheck {
    abstract onCheck(event: any, treeId: string, treeNode: any)
}

export declare abstract class onSelectRow {
    abstract onSelectRow(rowid:string,status:string,e:any)
}