export abstract class TreeNode {
    id: string;
    pid: string;
    isParent:boolean
    public abstract getParentNode()
}