import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import { DropdownField } from '../../shared/form/dropdown-field';
import { FieldBase } from '../../commonshared/form/field-base'
import { FieldGroup } from '../../commonshared/form/field-group';
import { TextField } from '../../shared/form/text-field';
import { DynamicFormComponent } from '../../shared/form/dynamic-form.component'

@Component({
    selector: 'ff-rel-edit',
    template: `
       <dynamic-form-hori #df_ref [fields]="_fields"></dynamic-form-hori>
    `
})
export class RelEditComponent implements OnInit {

    _fields: (FieldGroup | FieldBase<any>)[]

    @Input() $model: any = {
        model: {},
        params: {}
    }

    @ViewChild("df_ref") modelForm: DynamicFormComponent

    constructor(private http: Http) {
        this._fields = [
            new FieldGroup({
                groupName: "formId",
                fields: [
                    new TextField({
                        key: 'formName',
                        label: '表单名称',
                        required: true,
                        span: 6,
                        order: 1,
                        isObject: true,
                        disable: true
                    })]
            }),
            new FieldGroup({
                groupName: "fieldId",
                fields: [
                    new TextField({
                        key: 'fieldName',
                        label: '字段名称',
                        required: true,
                        span: 6,
                        order: 2,
                        isObject: true,
                        disable: true
                    }),
                    new DropdownField({
                        key: 'webDisplayTypeId',
                        label: '模板类型',
                        required: true,
                        disable: true,
                        span: 6,
                        order: 3,
                        optionsOb: this.http.get('flowservice/gettemplateslist', new RequestOptions({
                            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }),
                        })).map(data => data.json()),
                        optionId: "categoryNo",
                        optionName: "categoryName"
                    }),
                ]
            }),

            new TextField({
                key: 'rorder',
                label: '排序号',
                required: true,
                span: 6,
                order: 2
            }),
            new TextField({
                key: 'displayName',
                label: '显示名',
                required: false,
                span: 6,
                order: 9
            }),
            new TextField({
                key: 'displaySpan',
                label: '占位数',
                span: 6,
                order: 8
            }),
            new TextField({
                key: 'dictName',
                label: '字典名',
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
        ];
    }

    _sn = "workflowformfieldrel"

    ngOnInit() {
        if (this.$model.model == undefined) {
            this.$model.model = {}
        }
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
        });
        this.http.get("e/" + this._sn + "/" + this.$model.params.relId, options)
            .toPromise()
            .then((data) => {
                this.$model.model = data.json()
                this.modelForm.form.patchValue(data.json())
            })

    }

    onModalAction(): Promise<any> {
        if (this.modelForm.form.valid) {
            let formdata = this.modelForm.form.value
            let data = Object.assign(this.$model.model, formdata)
            let body = JSON.stringify(this.$model.model);
            let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
            let options = new RequestOptions({
                headers: headers,
            });
            return this.http.post("e/" + this._sn + "/" + this.$model.params.relId,
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
    }
}