import { Component, OnInit, ViewChild } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions, Response } from '@angular/http';

import { DropdownField } from '../../commonshared/form/dropdown-field';
import { FieldBase } from '../../commonshared/form/field-base'
import { TextField } from '../../shared/form/text-field';
import { DynamicFormHorizontalComponent } from '../../shared/form/dynamic-form-horizontal.component'
import { DynamicFormComponent } from '../../shared/form/dynamic-form.component'


@Component({
    selector: 'product-info',
    templateUrl: './product-info.component.html'
})
export class ProductInfoComponent implements OnInit {

    $model: any = { product: {} };
    _fields: any;
    @ViewChild("df_ref") myForm: DynamicFormComponent
    constructor(private http: Http) { }

    ngOnInit() {
        this._fields = [
            new DropdownField({
                key: 'serviceTypeId',
                label: '服务分类',
                dictName: "工作流_事项分类",
                span: 6,
                order: 4
            }),
            new DropdownField({
                key: 'formId',
                label: '表单',
                optionsOb:
                this.http.get('formmgt/getallform', new RequestOptions({
                    headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }),
                })).map(data => data.json()),
                span: 6,
                order: 4,
                optionId: "formId",
                optionName: "formName",
            }),
            new TextField({
                key: 'productNo',
                label: '编码',
                required: true,
                span: 6,
                order: 1
            }),
            new TextField({
                key: 'productName',
                label: '服务名称',
                required: true,
                span: 6,
                order: 2
            }),
            new TextField({
                key: 'wfProcessstartUrl',
                label: '处理URL',
                required: false,
                span: 6,
                order: 3
            }),
        ];
    }


    ngAfterViewInit() {
        this.myForm.form.valueChanges.subscribe((data) => {

        });
    }

    onModalAction(): Promise<any> {
        if (this.$model.params.type == 'edit') {
            if (this.myForm.form.valid) {
                // debugger
                let body = JSON.stringify(this.myForm.form.value);
                // let urlSearchParams = new URLSearchParams();
                // urlSearchParams.set('', );
                let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                let options = new RequestOptions({
                    headers: headers,
                    // search: urlSearchParams
                });
                return this.http.post('e/workflowserviceproduct/' + this.$model.params.productId, body, options)
                    .toPromise()
                    .then((data) => { return data })
            } else {
                return new Promise((resolve, reject) => {
                    reject('no valid');
                    toastr.warning('验证不通过！')
                })
            }
        } else if (this.$model.params.type == 'add') {
            if (this.myForm.form.valid) {
                let body = JSON.stringify(this.myForm.form.value);
                // let urlSearchParams = new URLSearchParams();
                // urlSearchParams.set('', );
                let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                let options = new RequestOptions({
                    headers: headers,
                    // search: urlSearchParams
                });
                return this.http.post('e/workflowserviceproduct', body, options)
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