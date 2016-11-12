import { Component, OnInit, Input } from '@angular/core';

import { FieldDataService } from '../shared/form/field-data.service'
import { MenuService } from '../service/menu.service'

import { DropdownField } from '../shared/form/dropdown-field';
import { FieldBase }     from '../shared/form/field-base';
import { TextField }  from '../shared/form/text-field';

import { onModalAction } from '../shared/interface/modal_hook' 
@Component({
    selector: 'my-menuinfo',
    templateUrl: './menuinfo.component.html'
})
export class MenuinfoComponent implements OnInit,onModalAction {

    @Input() $model:{
        model:any
        params:any
    }
    // @Input() model:any = {}
    // @Input() params:any
    menufields:any[];
    constructor(private fieldDataService:FieldDataService,private menuService:MenuService) { 
        // this.menufields = fieldDataService.getFields();
        this.menufields = [
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
            key: 'menuName',
            label: '菜单名称',
            required: true,
            order: 1
        }),
        new TextField({
            key: 'menuCode',
            label: '菜单编码',
            required: true,
            order: 2
        }),
        new TextField({
            key: 'icon',
            label: '图标',
            required: true,
            order: 3
        }),
        new TextField({
            key: 'href',
            label: '菜单Url',
            required: true,
            order: 4
        })                
        ];
    }
    ngOnInit() { 
        
    }
    onModalAction(){
        console.log("save model",this.$model.model)
        if(this.$model.params.type == "edit"){
            return this.menuService.updateMenu(this.$model.model).then(()=>{
                console.log("update success!")
                return "menuupdate"
            })
        }else if(this.$model.params.type == "add"){
            return this.menuService.createMenu(this.$model.params.pNode.privilegeId,this.$model.model).then(()=>{ return "menuadded"})
        }
        
    }
}