import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { FieldDataService } from '../shared/form/field-data.service'
import { MenuService } from '../core/menu/menu.service'

import { DropdownField } from '../commonshared/form/dropdown-field';
import { FieldBase } from '../commonshared/form/field-base'
import { TextField } from '../shared/form/text-field';

import { onModalAction } from '../shared/interface/modal_hook'
import { DynamicFormHorizontalComponent } from '../shared/form/dynamic-form-horizontal.component'

@Component({
    selector: 'my-menuinfo',
    templateUrl: './menuinfo.component.html'
})
export class MenuinfoComponent implements OnInit, onModalAction {

    @Input() $model: {
        menu: any
        params: any
    }
    @ViewChild(DynamicFormHorizontalComponent) modelForm: DynamicFormHorizontalComponent
    menufields: any[];
    constructor(private fieldDataService: FieldDataService, private menuService: MenuService) {
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
                key: 'menuId',
                hidden: true
            }),
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
                order: 4
            })
        ];
    }
    ngOnInit() {
        if (this.$model.params.type == "edit") {
            this.menuService.getMenuByMenuId(this.$model.params.id).then(data => {
                this.$model.menu = data
                this.modelForm.form.patchValue(data)
            })
        }

    }
    onModalAction() {
        if (this.$model.params.type == "edit") {
            return this.menuService.updateMenu(this.modelForm.form.value).then(() => {
                console.log("update success!")
                return "menuupdate"
            })
        } else if (this.$model.params.type == "add") {
            return this.menuService.createMenu(this.$model.params.pNode.privilegeId, this.modelForm.form.value).then(() => { return "menuadded" })
        }

    }
}