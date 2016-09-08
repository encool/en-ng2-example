import { Component, OnInit, Input } from '@angular/core';

import { FieldDataService } from '../shared/form/field-data.service'
import { MenuService } from '../service/menu.service'

import { DropdownField } from '../shared/form/dropdown-field';
import { FieldBase }     from '../shared/form/field-base';
import { TextField }  from '../shared/form/text-field';

import { modalOnSave } from '../shared/interface/modal_hook' 
@Component({
    moduleId: module.id,
    selector: 'my-menuinfo',
    templateUrl: 'menuinfo.component.html'
})
export class MenuinfoComponent implements OnInit,modalOnSave {
    @Input() model:any = {}
    @Input() params:any
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
    modalOnSave(){
        console.log("save model",this.model)
        if(this.params.type == "edit"){
            return this.menuService.updateMenu(this.model).then(()=>{
                console.log("update success!")
                return "menuupdate"
            })
        }else if(this.params.type == "add"){
            return this.menuService.createMenu(this.params.pNode.privilegeId,this.model).then(()=>{ return "menuadded"})
        }
        
    }
}