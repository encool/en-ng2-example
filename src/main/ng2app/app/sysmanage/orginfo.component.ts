import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { DropdownField } from '../commonshared/form/dropdown-field';
import { FieldBase } from '../commonshared/form/field-base'
import { TextField } from '../shared/form/text-field';
import { DynamicFormComponent } from '../shared/form/dynamic-form.component'

import { OrgService } from '../service/org.service'
import { onModalAction } from '../shared/interface/modal_hook'

@Component({
    selector: 'my-orginfo',
    templateUrl: './orginfo.component.html'
})
export class OrginfoComponent implements OnInit, onModalAction {
    @Input() $model: any = {}
    @ViewChild('form') myForm: DynamicFormComponent

    private _orgfields
    constructor(private orgService: OrgService) {
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
                key: 'orgId',
                hidden: true
            }),
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

    ngOnInit() {
        if (this.$model.params.type == 'edit') {
            this.orgService.getOrgByPK(this.$model.params.id, null).then(data => {
                this.myForm.form.patchValue(data);
                // this._orginfo_params.pNode = { id: node1.pid };
                // this._orginfo_params.type = "edit"
                // $('#orgmodal').modal('show')
            });
        }
    }

    onModalAction(): Promise<any> {
        if (this.$model.params.type == 'edit') {
            if (this.myForm.form.valid) {
                return this.orgService.update(this.myForm.form.value).then((data) => {
                    if (data == true) {
                        console.log("update success!")
                        return "orgupdate"
                    }
                    return "orgupdatefalse"
                });
            } else {
                return new Promise((resolve, reject) => {
                    reject('no valid');
                    toastr.warning('验证不通过！')
                })
            }
        } else if (this.$model.params.type == 'add') {
            if (this.myForm.form.valid) {
                return this.orgService.create(this.$model.params.pNode.id, this.myForm.form.value).then(() => { return "orgadd" })
            } else {
                return new Promise((resolve, reject) => {
                    reject('no valid');
                    toastr.warning('验证不通过！')
                })
            }
        }
    }
}