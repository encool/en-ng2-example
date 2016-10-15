import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import { DropdownField } from '../../shared/form/dropdown-field';
import { FieldBase }     from '../../shared/form/field-base';
import { TextField }  from '../../shared/form/text-field';
import { DynamicFormComponent } from '../../shared/form/dynamic-form.component'

@Component({
    moduleId: module.id,
    selector: 'field-edit',
    template: `
       <dynamic-form-hori #df_ref [fields]="_fields" [model]="$model.model" ></dynamic-form-hori>
    `
})
export class FieldEditComponent implements OnInit {

    _fields: FieldBase<any>[]

    @Input() $model: any = {
        model: {},
        params: {}
    }

    @ViewChild("df_ref") modelForm: DynamicFormComponent

    constructor(private http: Http) {
        this._fields = [
            new TextField({
                key: 'fieldNo',
                label: '字段编码',
                required: true,
                span: 6,
                order: 1
            }),
            new TextField({
                key: 'fieldName',
                label: '字段名称',
                required: true,
                span: 6,
                order: 2
            }),
            new DropdownField({
                key: 'fieldType',
                label: '字段类型',
                required: true,
                span: 6,
                order: 3,
                options: [
                    { key: "STR", value: "文本" },
                    { key: "INT", value: "数字" },
                    { key: "TIME", value: "时间" }
                ]
            }),
            new TextField({
                key: 'remark10',
                label: '占位数',
                required: true,
                span: 6,
                order: 9
            }),
        ];
    }

    _sn = "workflowformfield"

    ngOnInit() {
        if (this.$model.model == undefined) {
            this.$model.model = {}
        }
        if (this.$model.params.type == "edit") {

            let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
            let options = new RequestOptions({
                headers: headers,
            });
            this.http.get("e/" + this._sn  + "/" + this.$model.params.fieldId, options)
                .toPromise()
                .then((data) => {
                    this.$model.model = data.json()
                })
        }
    }

    onModalAction(): Promise<any> {
        if (this.$model.params.type == 'edit') {
            if (this.modelForm.form.valid) {
                let body = JSON.stringify(this.$model.model);
                let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                let options = new RequestOptions({
                    headers: headers,
                });
                return this.http.post("e/" + this._sn + "/" +this.$model.params.fieldId, 
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
                let body = JSON.stringify(this.$model.model);
                let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                let options = new RequestOptions({
                    headers: headers,
                });
                return this.http.post("e/" + this._sn + "/" , body, options)
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