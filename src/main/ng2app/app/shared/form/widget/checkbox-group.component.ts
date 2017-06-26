import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { CheckboxGroupField } from './checkbox-group.field'

import { UIComponent } from '../../decorators/ui-component.decorator'

@UIComponent({
    selector: 'f-checkbox-group',
    component: CheckboxGroupComponent
})
@Component({
    selector: 'f-checkbox-group',
    template: `  
    <div [ngSwitch]="simple">
        <div *ngSwitchCase="false" [ngClass]="ngclasses()">
                <label [attr.for]="key" class="control-label" style="float: left;width:75px">{{label}}</label>
                <div class="" style="margin-left:85px">
                    <label class="checkbox-inline ng-scope" *ngFor="let opt of options" style="width: 150px;">
                        <input type="checkbox" [(ngModel)]="opt.checked" class="ace ng-valid ng-dirty" [value]="opt.value"
                            (click)="opt.click(opt)">
                        <span class="lbl ng-binding">{{" " + opt.text}}</span>
                    </label>     
                </div>        
        </div>      
        <div *ngSwitchCase="true" class="checkbox" [formGroup]="form">
                <label *ngFor="let opt of field.options">
                    <input type="checkbox" [(ngModel)]="model[field.key]" [formControlName]="field.key">{{opt[field.optionName]}}
                </label>
        </div>         
    </div>                         
    `
})
export class CheckboxGroupComponent implements OnInit {
    @Input() simple: boolean = true
    @Input() span: number = 4
    @Input() offset: number = 0
    @Input() disabled: boolean = false
    @Input() label: string
    @Input() key: string

    @Input() field: CheckboxGroupField;
    @Input() form: FormGroup;
    @Input() model: any;

    _tipmsg: string = "必填项";



    _oldDictName: string
    _oldOptionsUrl: string
    _getDictOptionsTasks: any[] = []
    _getUrlOptionsTasks: any[] = []

    objOptions: any[] = []
    options: any[] = []
    optionId: string
    optionName: string

    controller: AbstractControl

    constructor(private http: Http) { }

    ngOnInit() {

        if (!this.simple) {
            this.label = this.field.label
            this.disabled = this.field.disable
            this.key = this.field.key
            if (this.field.options.length == 0 && this.field.optionsOb) {
                this.field.optionsOb.subscribe(data => this.field.options = data)
            } else if (this.field.dictName) {
                this._oldDictName = this.field.dictName
                if (this.field.optionId == "key") {
                    this.optionId = 'dictdataName'
                }
                if (this.field.optionName == "value") {
                    this.optionName = 'dictdataValue'
                }
                this.getDictDataObserable(this.field.dictName).subscribe(
                    data => {
                        let options = data
                        this.initOptions(options)
                        setTimeout(() => {
                            // this.initData()
                        })
                        this._getDictOptionsTasks.pop()
                    }
                )

            } else if (this.field.optionsUrl) {
                this._oldOptionsUrl = this.field.optionsUrl
                this.getDataSourceObserable(this.field.optionsUrl).subscribe(data => {
                    this.field.options = data
                    setTimeout(() => {
                        // this.initData()
                    })
                })
            }

            this.controller = this.form.get(this.key)
            this.controller.valueChanges.subscribe((value) => {
                debugger
            })
        }
    }

    ngAfterViewInit() {

    }

    initOptions(options: any[], optionId?, optionName?, optionSelected?) {
        optionId = optionId || this.optionId
        optionName = optionName || this.optionName
        let value = this.controller.value
        let values = []
        if (value) {
            values = value.split(",")
        }
        if (_.isArray(options)) {

            _.forEach(options, (v: any, n) => {
                if (v[optionId] == "") return;
                this.objOptions.push(v);

                let checked = false
                let optionValue = v[optionId]
                values.forEach((v) => {
                    if (v == optionValue) {
                        checked = true
                    }
                })

                let option: any = { "text": v[optionName] + "", "value": v[optionId] + "", checked: checked, disabled: this.disabled };
                if (!_.isUndefined(v.disabled) && typeof v.disabled == "boolean") {
                    option.disabled = v.disabled;
                } else {
                    option.disabled = this.disabled
                }
                if (!_.isUndefined(optionSelected)) {
                    option.checked = v[optionSelected];
                }
                option.click = (option) => {
                    setTimeout(() => {
                        this.patchValue()
                    })
                }
                this.options.push(option);
            });
        } else {
            _.forEach(options, function (v, k) {
                var option: any = { "text": v + "", "value": k + "", checked: false, disabled: this.checkboxDisabled };
                option.click = (checkbox) => {
                    // $timeout(function () {
                    //     $scope.clickEvent({ value: checkbox });
                    // }, 0);
                }
                this.options.push(option);
            });
        }

    }

    patchValue() {
        debugger
        let values: string[] = []
        this.options.forEach((v, index) => {
            if (v.checked) {
                values.push(v.value)
            }
        })
        let value: string = values.join(",")
        this.controller.patchValue(value, {
            onlySelf: true,
            emitEvent: false
        })
    }

    ngclasses() {
        let classExpression = {
            'form-group': true,
            // 'row': true,
            // 'checkbox': true,
            // 'has-error':!this.isValid,
        }
        if (this.simple) {
            classExpression["col-sm-" + this.span] = true;
            classExpression["col-md-offset-" + this.offset] = this.offset == 0 ? false : true;
        } else {
            classExpression["col-sm-" + this.field.span] = true;
        }
        return classExpression
    }

    getDictDataObserable(dictName: string): Observable<any[]> {
        if (this._getDictOptionsTasks.length > 0) {
            let lastDictName = this._getDictOptionsTasks[this._getDictOptionsTasks.length - 1]
            if (lastDictName == dictName) {
                console.warn("任务进行中")
                return
            }
        }

        this._getDictOptionsTasks.push(dictName)
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.set('dictTypeName', dictName);
        // urlSearchParams.set('', );
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });
        return this.http.get('dict/getByDictTypeName', options)
            .map((data) => data.json())
    }

    getDataSourceObserable(url: string): Observable<any[]> {
        let urlSearchParams = new URLSearchParams();
        //urlSearchParams.set('dictTypeName', dictName);
        // urlSearchParams.set('', );
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });
        return this.http.get(url, options)
            .map((data) => data.json())
    }
}