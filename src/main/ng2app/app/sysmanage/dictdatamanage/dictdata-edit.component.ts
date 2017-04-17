import { Component, OnInit, Input, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { FormControl } from '@angular/forms';
import { DynamicFormHorizontalComponent, DropdownField, FieldBase, TextField } from '../../shared/form/form.composite';


@Component({
    selector: 'dictdata',
    template: `
        <dynamic-form-hori #dictdataform [fields]="fields"></dynamic-form-hori>
    `
})
export class DictdataEditComponent implements OnInit {

    @ViewChild("dictdataform") myForm: DynamicFormHorizontalComponent
    @Input() $model: any = {
        dictdata: {}
    }

    fields: FieldBase<any>[]

    constructor(private http: Http) {

    }

    ngOnInit() {
        if (this.$model.dictdata == undefined) {
            this.$model.dictdata = {}
        }
        if (this.$model.params.type == "edit") {
            let urlSearchParams = new URLSearchParams();
            urlSearchParams.set("dictTypeId", "test")
            let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
            let options = new RequestOptions({
                headers: headers,
                search: urlSearchParams
            });
            this.http.get('dictdata/' + this.$model.params.dictdataId, options)
                .map(res => res.json())
                .subscribe(
                data => {
                    //保存原始信息
                    this.$model.dictdata = data
                    console.log("patchValue formvalue-->", data)
                    this.myForm.form.patchValue(data)
                    this.myForm.form.updateValueAndValidity()
                },
                err => {

                }
                )
        }
        this.fields = [
            new DropdownField({
                key: 'dictdataIsdefault',
                label: '是否默认值',
                options: [
                    // {"true":"是","false":"否"}
                    { key: 'true', value: '是' },
                    { key: 'false', value: '否' },
                ],
                order: 3
            }),
            new TextField({
                key: 'dictdataName',
                label: '字典真实值',
                required: true,
                order: 1,
                asyncValidator:
                control => {
                    return new Promise((resolve, reject) => {
                        if (this.$model.params.type == "add") {
                            this.$model.dictdata.dicttypeId = this.$model.params.dicttypeId
                        }
                        // debugger
                        // console.log("asyncValidator form.value.dictdataId", this.myForm.form.value.dictdataId)
                        // console.log("asyncValidator form.value", this.myForm.form.value)
                        // console.log("asyncValidator control.value", control.value)



                        let dictdata = this.$model.dictdata
                        dictdata.dictdataName = control.value

                        let body = JSON.stringify(dictdata);
                        let urlSearchParams = new URLSearchParams();
                        urlSearchParams.set('elementId', "dictdataName");
                        urlSearchParams.set('elementValue', control.value);
                        urlSearchParams.set('formType', this.$model.params.type);
                        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                        let options = new RequestOptions({
                            headers: headers,
                            search: urlSearchParams
                        });
                        this.http.post('dictdata/validate', body, options)
                            .toPromise()
                            .then((data) => {
                                if (data.json().validate == "success") {
                                    resolve(null)
                                } else {
                                    resolve("error")
                                }
                            })

                    });


                }
            }),
            new TextField({
                key: 'dictdataValue',
                label: '字典显示值',
                required: true,
                order: 2,
                // validator: (controll: FormControl) => {
                //     console.log("validator controll value", controll.value)
                //     return {
                //         validateEmail: {
                //             valid: false
                //         }
                //     }
                // }
            }),
            new TextField({
                key: 'dictdataId',
                hidden: true
            }),
        ];
    }

    onModalAction(): Promise<any> {
        if (this.$model.params.type == 'edit') {
            if (this.myForm.form.valid) {
                let body = JSON.stringify(this.myForm.form.value);
                let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                let options = new RequestOptions({ headers: headers });
                return this.http.put('dictdata', body, options)
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
                let dictdata = this.myForm.form.value
                dictdata.dicttypeId = this.$model.params.dicttypeId
                let body = JSON.stringify(dictdata);
                let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                let options = new RequestOptions({ headers: headers });
                return this.http.post('dictdata', body, options)
                    .toPromise()
                    .then((data) => {
                        return data
                    });
            } else {
                return new Promise((resolve, reject) => {
                    reject('no valid');
                    toastr.warning('验证不通过！')
                })
            }
        }
    }
}