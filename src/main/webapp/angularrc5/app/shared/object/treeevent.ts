import { TreeNode } from './treenode'
import { TreeAction } from './tree-action'

export class TreeEvent {
    constructor(node:TreeNode,businessId:string,action:TreeAction,nodes?:Array<TreeNode>,private event?:any){
        this.node = node;
        this.businessId = businessId;
        this.action = action;
        this.nodes = nodes;
    }
    id: number;
    node:TreeNode;
    businessId:string;
    action:TreeAction
    nodes:Array<TreeNode>
}