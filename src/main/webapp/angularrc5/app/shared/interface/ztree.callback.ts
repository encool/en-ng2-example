
export declare abstract class ZtreeCallback{
    //树勾选回调
    onCheck(event: any, treeId: string, treeNode: any)
    //树节点点击
    onClick(event, treeId, treeNode, clickFlag)
}

export class DefaultZtreeCallBack implements ZtreeCallback {
    onCheck(event: any, treeId: string, treeNode: any){}
    onClick(event, treeId, treeNode, clickFlag){}
}

// export declare enum ZtreeCallback1 {
//     onCheck = 0,
//     onSelectRow = 1,
//     // DoCheck = 2,
//     // OnChanges = 3,
//     // AfterContentInit = 4,
//     // AfterContentChecked = 5,
//     // AfterViewInit = 6,
//     // AfterViewChecked = 7,
// }

// export declare var ZTREE_CALLBACK_VALUES: ZtreeCallback1[];

// export declare abstract class onCheck {
//     abstract onCheck(event: any, treeId: string, treeNode: any)
// }

// export declare abstract class onSelectRow {
//     abstract onSelectRow(rowid:string,status:string,e:any)
// }