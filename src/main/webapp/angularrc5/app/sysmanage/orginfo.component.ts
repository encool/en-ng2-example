import { Component, OnInit, Input } from '@angular/core';

import { DropdownField } from '../shared/form/dropdown-field';
import { FieldBase }     from '../shared/form/field-base';
import { TextField }  from '../shared/form/text-field';

import { OrgService } from '../service/org.service'
import { modalOnSave } from '../shared/interface/modal_hook' 

@Component({
    moduleId: module.id,
    selector: 'my-orginfo',
    templateUrl: 'orginfo.component.html'
})
export class OrginfoComponent implements OnInit,modalOnSave {
    @Input() $model:any = {}
    // @Input() model:any = {}
    // @Input() type:string
    // @Input() params:any = {}
    private _orgfields
    constructor(private orgService:OrgService) {
        this._orgfields = [
        // new DropdownField({
        //     key: 'brave',
        //     label: 'Bravery Rating',
        //     options: [
        //     {key: 'solid',  value: 'Solid'},
        //     {key: 'great',  value: 'Great'},
        //     {key: 'good',   value: 'Good'},
        //     {key: 'unproven', value: 'Unproven'}
        //     ],
        //     order: 3
        // }),
        new TextField({
            key: 'orgNumber',
            label: '机构编码',
            required: true,
            order: 1
        }),
        new TextField({
            key: 'orgName',
            label: '机构名称',
            required: true,
            order: 2
        }),
        new TextField({
            key: 'orgShowName',
            label: '机构显示名',
            required: true,
            order: 3
        }),
        new TextField({
            key: 'orgXzqm',
            label: '行政区码',
            required: true,
            order: 4
        }),
        new TextField({
            key: 'orgLevel',
            label: '行政级别',
            required: true,
            order: 1
        }),
        new TextField({
            key: 'orgDesc',
            label: '机构描述',
            required: true,
            order: 2
        })            
        ];
     }

    ngOnInit() { }

    onModalAction(){
        console.log("save model",this.$model.org)
        
        if(this.$model.params.type == "edit"){
            return this.orgService.update(this.$model.org).then((data)=>{
                if(data ==true){
                    console.log("update success!")
                    return "orgupdate"
                }
                return "orgupdatefalse"
            });
        }else if(this.$model.params.type == "add"){
            return this.orgService.create(this.$model.params.pNode.id,this.$model.org).then(()=>{return "orgadd"})
        }
    }
}