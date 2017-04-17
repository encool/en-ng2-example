import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { DropdownField } from '../shared/form/dropdown-field';
import { FieldBase } from '../shared/form/field-base';
import { TextField } from '../shared/form/text-field';
import { DynamicFormHorizontalComponent } from '../shared/form/dynamic-form-horizontal.component'

import { UserService } from '../service/user.service'
import { OrgService } from '../service/org.service'
import { onModalAction } from '../shared/interface/modal_hook'
import { ModalAction } from '../shared/object/modal-action'

@Component({
    selector: 'my-userinfo',
    templateUrl: './userinfo.component.html'
})
export class UserinfoComponent implements OnInit, onModalAction {
    @Input() $model: any = {
        user: {}
    }

    @ViewChild("df_ref") userForm: DynamicFormHorizontalComponent

    private _userfields
    constructor(private orgService: OrgService, private userService: UserService) {
        this._userfields = [
            new DropdownField({
                key: 'userSex',
                label: '性别',
                options: [
                    { key: 'F', value: '女' },
                    { key: 'M', value: '男' },
                ],
                span: 6,
                order: 4
            }),
            new TextField({
                key: 'userName',
                label: '账号',
                required: true,
                span: 6,
                order: 1,
                asyncValidator: (control) => {
                    return this.userService.validate("userName", control.value, this.$model.params.type)
                }
            }),
            new TextField({
                key: 'userRealname',
                label: '姓名',
                required: true,
                span: 6,
                order: 2
            }),
            new TextField({
                key: 'userPassword',
                label: '密码',
                required: true,
                span: 6,
                order: 3
            }),
            new TextField({
                key: 'userId',
                label: '密码',
                hidden: true,
            }),
        ];
    }

    ngOnInit() {
        if (this.$model.params.type == "edit") {
            this.userService.getUserByPK(this.$model.params.userId).then(data => {
                this.$model.user = data
                this.userForm.form.patchValue(data)
            })
        }
    }

    onModalAction(action: ModalAction) {
        if (action.key == "close") {
            console.log("save model", this.$model.user)

            if (this.userForm.form.valid) {
                if (this.$model.params.type == "edit") {
                    return this.userService.update(this.userForm.form.value).then((data) => {
                        return this.$model.user
                    });
                } else if (this.$model.params.type == "add") {
                    return this.userService.create(this.userForm.form.value, this.$model.params.orgId)
                }
            } else {
                toastr.warning("验证不通过");
                return new Promise((resolve, reject) => {
                    reject("true");
                });
            }

        } else if (action.key == "dismiss") {

        }
    }
}