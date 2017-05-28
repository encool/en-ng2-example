export declare abstract class JqgridCallback {
    onSelectRow(rowid: string, status: string, e: any)
    gridComplete()
}
export class DefaultJqgridCallback implements JqgridCallback {

    constructor(options: {
        onSelectRow?: (rowid: string, status: string, e: any) => void,
        gridComplete?: () => void
    }) {
        this.onSelectRow = options.onSelectRow == undefined ? this.onSelectRow : options.onSelectRow
        this.gridComplete = options.gridComplete == undefined ? this.gridComplete : options.gridComplete
    }
    onSelectRow(rowid: string, status: string, e: any) { }
    gridComplete() { }
}