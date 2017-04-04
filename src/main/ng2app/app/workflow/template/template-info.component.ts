import { Component, OnInit, ViewChild } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions, Response } from '@angular/http';

import { DropdownField } from '../../shared/form/dropdown-field';
import { FieldBase } from '../../shared/form/field-base';
import { TextField } from '../../shared/form/text-field';
import { DynamicFormHorizontalComponent } from '../../shared/form/dynamic-form-horizontal.component'
import { DynamicFormComponent } from '../../shared/form/dynamic-form.component'

@Component({
    selector: 'template-info',
    template: `
    <my-form>
        <dynamic-form-hori #df_ref [fields]="_fields" [model]="$model.template" >
        </dynamic-form-hori>
    </my-form>
    `
})
export class TemplateInfoComponent implements OnInit {
    $model: any = {
        params: {},
        template: {}
    };
    _fields: any;
    @ViewChild("df_ref") myForm: DynamicFormHorizontalComponent
    constructor(private http: Http) { }

    ngOnInit() {
        this.$model.template = {}
        if (this.$model.params.type == "edit") {
            let urlSearchParams = new URLSearchParams();
            // urlSearchParams.set('', );
            // urlSearchParams.set('', );
            let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
            let options = new RequestOptions({
                headers: headers,
                search: urlSearchParams
            });
            this.http.get('e/webdisplaycategory/' + this.$model.params.id, options)
                .toPromise()
                .then((data) => {
                    this.$model.template = data.json()
                })
        }
        this._fields = [
            // new DropdownField({
            //     key: 'serviceTypeId',
            //     label: '服务分类',
            //     options: [
            //         { key: 'F', value: '女' },
            //         { key: 'M', value: '男' },
            //     ],
            //     span: 6,
            //     order: 4
            // }),
            new TextField({
                key: 'categoryNo',
                label: '编码',
                required: true,
                span: 6,
                order: 1
            }),
            new TextField({
                key: 'categoryName',
                label: '模板名称',
                required: true,
                span: 6,
                order: 2
            }),
            new TextField({
                key: 'url',
                label: '组件名称',
                required: true,
                span: 6,
                order: 3
            }),
            new TextField({
                key: 'describe',
                label: '描述',
                required: false,
                span: 12,
                order: 3
            }),
            new TextField({
                key: 'id',
                hidden: true
            }),
        ];
    }
    onModalAction(): Promise<any> {
        if (this.$model.params.type == 'edit') {
            if (this.myForm.form.valid) {
                let body = JSON.stringify(this.myForm.form.value);
                let urlSearchParams = new URLSearchParams();
                // urlSearchParams.set('', );
                let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                let options = new RequestOptions({
                    headers: headers,
                    search: urlSearchParams
                });
                return this.http.post('e/webdisplaycategory/' + this.$model.params.id, body, options)
                    .toPromise()
                    .then((data) => { return data })
            } else {
                return new Promise((resolve, reject) => {
                    reject('no valid');
                    toastr.warning('验证不通过！')
                })
            }
        } else if (this.$model.params.type == 'add') {debugger
            if (this.myForm.form.valid) {
                let body = JSON.stringify(this.myForm.form.value);
                let urlSearchParams = new URLSearchParams();
                // urlSearchParams.set('', );
                let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                let options = new RequestOptions({
                    headers: headers,
                    search: urlSearchParams
                });
                return this.http.post('e/webdisplaycategory', body, options)
                    .toPromise()
                    .then((data) => { return data })
            } else {
                return new Promise((resolve, reject) => {
                    reject('no valid');
                    toastr.warning('验证不通过！')
                })
            }
        }
    }
}