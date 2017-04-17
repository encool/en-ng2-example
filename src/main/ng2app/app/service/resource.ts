export class Resource {
    sn: string
    code: string
    name: string
    psn?: string
    type: string
    // /** 权限ID */
    // private String privilegeId;
    // /** 权限编码 */
    // private String privilegeCode;
    // /** 权限名称 */
    // private String privilegeName;
    // /** 父ID */
    // private String parentId;
    // /** 类型（1：操作，2：表单，3：服务，4：菜单） */
    // private String type;
    // /** 权限字符串 */
    // private String permExpr;    
    constructor(options: {
        sn: string
        name: string
        type: string
        psn?: string
        code?: string
    }) {
        this.sn = options.sn
        this.name = options.name
        this.psn = options.psn
        this.type = options.type
        this.code = options.code
    }
}