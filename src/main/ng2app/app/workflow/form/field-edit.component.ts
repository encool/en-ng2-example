import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import { DropdownField } from '../../shared/form/dropdown-field';
import { FieldBase } from '../../shared/form/field-base';
import { TextField } from '../../shared/form/text-field';
import { CheckboxField } from '../../shared/form/widget/checkbox.field';

import { DynamicFormComponent } from '../../shared/form/dynamic-form.component'

@Component({
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
                key: 'fieldId',
                hidden: true
            }),
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
                required: false,
                span: 6,
                order: 3,
                options: [
                    { key: "STR", value: "文本" },
                    { key: "INT", value: "数字" },
                    { key: "TIME", value: "时间" }
                ]
            }),
            new DropdownField({
                key: 'webDisplayTypeId',
                label: '模板类型',
                required: true,
                span: 6,
                order: 3,
                optionsOb: this.http.get('flowservice/gettemplateslist', new RequestOptions({
                    headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }),
                })).map(data => data.json()),
                optionId: "categoryNo",
                optionName: "categoryName"
            }),
            new TextField({
                key: 'displaySpan',
                label: '占位数',
                required: false,
                span: 6,
                order: 9
            }),
            new TextField({
                key: 'dictName',
                label: '字典名',
                required: false,
                span: 6,
                order: 9
            }),
            new TextField({
                key: 'remark1',
                label: '属性1',
                span: 6,
                order: 10
            }),
            new TextField({
                key: 'remark2',
                label: '属性2',
                span: 6,
                order: 11
            }),
            new TextField({
                key: 'remark3',
                label: '属性3',
                span: 6,
                order: 12
            }),
            new TextField({
                key: 'remark4',
                label: '属性4',
                span: 6,
                order: 13
            }),
            // new CheckboxField({
            //     key: 'remark9',
            //     label: '属性9(b)',
            //     span: 6,
            //     order: 13
            // }),            
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
            this.http.get("e/" + this._sn + "/" + this.$model.params.fieldId, options)
                .toPromise()
                .then((data) => {
                    let d = data.json()
                    this.modelForm.form.patchValue(d)
                })
        }
    }

    onModalAction(): Promise<any> {
        if (this.$model.params.type == 'edit') {
            if (this.modelForm.form.valid) {
                let body = JSON.stringify(this.modelForm.form.value);
                let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                let options = new RequestOptions({
                    headers: headers,
                });
                return this.http.post("e/" + this._sn + "/" + this.$model.params.fieldId,
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
                let body = JSON.stringify(this.modelForm.form.value);
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