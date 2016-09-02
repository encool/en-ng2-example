export class ColModel {
    label:string
    name:string
    title: string//是否设置单元格的 title 属性。
    width: number|string//该列的宽度
    align: string //对齐方式："left" "center" "right"
    classes: string//给单元格添加类。
    
    fixed: boolean//设置为 true 时，该列的宽度固定，不会自动拉伸或者压缩。
    frozen: boolean//该列是否可以被冻结
    hidedlg: boolean
    hidden: boolean//设为 true 时，初始化的时候隐藏该列。
    index: string//点击表头排序时，会将这个值传到后台，从而标识是以该列排序。
    key: boolean//如果返回的数据中没有 id 值，那么可以设置这个做为每行的 id 。行 id 的生成当然会计数从而不重复。 只能有一列可设置该值
    resizable: boolean//该类是否可以拖动边界改变宽度。
    sortable: boolean//该列是否可以排序。    

    formatter:string|Function
    constructor(label:string,name:string,width?:number|string,formatter?:string|Function,hidden?:boolean,key?:boolean){
        this.label = label
        this.name = name
        this.width = width
        this.formatter = formatter
        this.hidden = hidden
        this.key = key
    }
}