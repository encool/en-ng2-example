import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { DropdownField } from '../../commonshared/form/dropdown-field';
import { FieldBase } from '../../commonshared/form/field-base'
import { TextField } from '../../shared/form/text-field';
import { DynamicFormComponent } from '../../shared/form/dynamic-form.component'

import { UserService } from '../../service/user.service'
import { OrgService } from '../../service/org.service'
import { onModalAction } from '../../shared/interface/modal_hook'
import { ModalAction } from '../../shared/object/modal-action'

@Component({
    selector: 'pro-def-info',
    templateUrl: './process-model-info.component.html'
})
export class ProcessModelInfoComponent implements OnInit, onModalAction {
    @Input() $model: any = {
        model: {}
    }

    @ViewChild("df_ref") modelForm: DynamicFormComponent

    private _userfields
    constructor(private orgService: OrgService, private userService: UserService) {
        this._userfields = [
            new TextField({
                key: 'name',
                label: '流程名称',
                required: true,
                span: 6,
                order: 1
            }),
            new TextField({
                key: 'key',
                label: '流程标识',
                required: true,
                span: 6,
                order: 2
            }),
            new TextField({
                key: 'describe',
                label: '描述',
                required: true,
                span: 6,
                order: 3
            }),
        ];
    }

    ngOnInit() {

    }

    onModalAction(action: ModalAction) {
        if (action.key == "close") {
            console.log("save model", this.$model.user)
            if (this.$model.params.type == "edit") {
                return this.userService.update(this.$model.user).then((data) => {
                    return this.$model.user
                });
            } else if (this.$model.params.type == "add") {
                if (this.modelForm.form.valid) {
                    return new Promise((resolve, reject) => {
                        resolve("true");
                    });
                } else {
                    toastr.warning("验证不通过");
                    return new Promise((resolve, reject) => {
                        reject("true");
                    });
                }
            }
        } else if (action.key == "dismiss") {

        }
    }
}