import { DatePipe } from '@angular/common'

export module JqgridFormatter {
    //毫秒时间
    export class Millstime {
        timeformatter: string
        constructor(timeformatter?: string) {
            this.timeformatter = timeformatter ? timeformatter : 'dd/MM/yyyy'
        }
        formatter(cellvalue, option, rowObject) {
            let datePipe = new DatePipe("zh-CH");
            return datePipe.transform(cellvalue, this.timeformatter);
        }
    }
    //字典
    export class DictData {
        dictdataService: any
        dictname: string
        cls: string
        constructor(dictdataService: any, dictname: string) {
            // debugger
            this.dictdataService = dictdataService
            this.dictname = dictname
        }
        formatter = (cellvalue, option, rowObject) => {
            // let _this1 = this
            let value = this.dictdataService.getDictDataValue(this.dictname, cellvalue)
            if (!value) {
                value = cellvalue
            }
            return '<a class="' + (this.cls ? this.cls : cellvalue) + '">' + value + '</a>'
        }
    }
}

// export class JqgridFormatter {
//     static dictname: string
//     static timeformatter: string = 'dd/MM/yyyy'
//     static cls: string
//     static dictdataService: any
//     class millstime {
//         debugger
//         let datePipe = new DatePipe("zh-CH");
//         return datePipe.transform(cellvalue, this.timeformatter);
//     }
//     static dictdata(cellvalue, option, rowObject) {
//         let value = this.dictdataService.getDictDataValue(this.dictname, cellvalue)
//         if (!value) {
//             value = cellvalue
//         }
//         return '<a class="' + (this.cls ? this.cls : cellvalue) + '">' + value + '</a>'
//     }
// }
