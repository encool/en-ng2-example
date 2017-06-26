import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Validators } from '@angular/forms'

import { DropdownField } from '../../shared/form/dropdown-field';
import { FieldBase } from '../../shared/form/field-base';
import { TextField } from '../../shared/form/text-field';
import { RadioGroupField } from '../../shared/form/widget/radio-group.field';
import { DynamicFormComponent } from '../../shared/form/dynamic-form.component'

@Component({
    selector: 'form-edit',
    template: `
       <dynamic-form-hori #df_ref [fields]="_fields" [model]="$model.model" ></dynamic-form-hori>
    `
})
export class FormEditComponent implements OnInit {

    _fields: FieldBase<any>[]

    @Input() $model: any = {
        model: {},
        params: {}
    }

    @ViewChild("df_ref") modelForm: DynamicFormComponent

    constructor(private http: Http) {
        this._fields = [
            new TextField({
                key: 'formId',
                label: 'formId',
                hidden: true
            }),
            new TextField({
                key: 'formNo',
                label: '表单编码',
                required: true,
                span: 6,
                order: 1
            }),
            new TextField({
                key: 'formName',
                label: '表单名称',
                required: true,
                span: 6,
                order: 2
            }),
            new TextField({
                key: 'operateBean',
                label: 'beanName',
                required: false,
                span: 6,
                order: 3,
            }),
            new RadioGroupField({
                key: 'isTableStorage',
                label: '是否单独表',
                required: false,
                span: 6,
                order: 8,
                options: [{ key: true, value: "是" }, { key: false, value: "否" }]
            }),
            new TextField({
                key: 'tableName',
                label: '数据库表名',
                required: false,
                span: 6,
                order: 9
            }),
            new TextField({
                key: 'remark2',
                label: '关联字段',
                required: false,
                span: 6,
                order: 9
            }),
        ];
    }

    _sn = "workflowform"

    ngOnInit() {
        if (this.$model.model == undefined) {
            this.$model.model = {}
        }
        if (this.$model.params.type == "edit") {

            let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
            let options = new RequestOptions({
                headers: headers,
            });
            this.http.get("e/" + this._sn + "/" + this.$model.params.formId, options)
                .toPromise()
                .then((data) => {
                    let d = data.json()
                    this.modelForm.form.patchValue(d)
                })
        }
        setTimeout(() => {
            this.modelForm.form.valueChanges.subscribe(data => {
                // debugger
                let bncontroller = this.modelForm.form.get('operateBean')
                let tableNamecontroller = this.modelForm.form.get('tableName')
                let remark2controller = this.modelForm.form.get('remark2')
                if (!data.isTableStorage) {
                    bncontroller.clearValidators()
                    tableNamecontroller.clearValidators()
                    remark2controller.clearValidators()
                    bncontroller.updateValueAndValidity({
                        onlySelf: true,
                        emitEvent: false
                    })
                    tableNamecontroller.updateValueAndValidity({
                        onlySelf: true,
                        emitEvent: false
                    })
                    remark2controller.updateValueAndValidity({
                        onlySelf: true,
                        emitEvent: false
                    })
                } else {
                    bncontroller.setValidators(Validators.required)
                    tableNamecontroller.setValidators(Validators.required)
                    remark2controller.setValidators(Validators.required)
                    bncontroller.updateValueAndValidity({
                        onlySelf: false,
                        emitEvent: false
                    })
                    tableNamecontroller.updateValueAndValidity({
                        onlySelf: false,
                        emitEvent: false
                    })
                    remark2controller.updateValueAndValidity({
                        onlySelf: false,
                        emitEvent: false
                    })
                }
                this.modelForm.form.updateValueAndValidity({
                    onlySelf: true,
                    emitEvent: false
                })
            })
        });
    }

    onModalAction(): Promise<any> {
        let value = this.modelForm.form.value
        if (value.operateBean == null) {
            value.operateBean = 'processvariableformoperate'
        }
        if (this.$model.params.type == 'edit') {
            if (this.modelForm.form.valid) {
                let body = JSON.stringify(value);
                let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                let options = new RequestOptions({
                    headers: headers,
                });
                return this.http.post("e/" + this._sn + "/" + this.$model.params.formId,
                    body, options)
                    .toPromise()
                    .then((data) => {
                        return data
                    })
            } else {
                return new Promise((resolve, reject) => {
                    reject('no valid');
                    toastr.warning('验证不通过！')
                })
            }
        } else if (this.$model.params.type == 'add') {
            if (this.modelForm.form.valid) {
                let body = JSON.stringify(value);
                let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                let options = new RequestOptions({
                    headers: headers,
                });
                return this.http.post("e/" + this._sn + "/", body, options)
                    .toPromise()
                    .then((data) => {
                        return data
                    })
            } else {
                return new Promise((resolve, reject) => {
                    reject('no valid');
                    toastr.warning('验证不通过！')
                })
            }
        }
    }
}