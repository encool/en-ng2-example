import { Component, Input, OnInit, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Select2Field } from './select2.field'

import { UIComponent } from '../../decorators/ui-component.decorator'

let $ = require('jquery')
@UIComponent({
    selector: 'f-select2',
    component: Select2Component
})
@Component({
    selector: 'f-select2',
    template: `
    <div [ngSwitch]="simple">
        <div *ngSwitchCase="false" [formGroup]="form" [style.display]="field.hidden ? 'none':'inline'" [ngClass]="ngclasses()">
    	    <label [attr.for]="field.key" class="control-label" style="float: left;width:75px">{{field.label}}</label>
            <div style="margin-left:85px"> 
                <select [id]="field.key" class="form-control" [disabled]="field.disable"> 
                    <option *ngFor="let opt of field.options" [value]="opt[field.optionId]">{{opt[field.optionName]}}</option>
                </select>
            </div>  
        </div>
        <div *ngSwitchCase="true"  [style.display]="hidden ? 'none':'inline'" [ngClass]="ngclasses()">
    	    <label [attr.for]="key" class="control-label" style="float: left;width:75px">{{label}}</label>
            <div class="" style="margin-left:85px">
                <select [id]="key" [(ngModel)]="model[key]" [disabled]="disabled" multiple="multiple"
                        class="form-control"> 
                    <option *ngFor="let opt of options" [value]="opt[optionId]">{{opt[optionName]}}</option>
                </select>
            </div>       
        </div>  
    </div>                                   
    `
})
export class Select2Component implements OnInit {
    @Input() simple: boolean = true
    @Input() key: string = 'dropdowninput'
    @Input() label: string = ''
    @Input() span: number = 4
    @Input() offset: number = 0
    @Input() hidden: boolean = false
    @Input() disabled: boolean = false
    @Input() optionsOb: Observable<any>
    @Input() options: any[] = []
    @Input() optionId: string = 'key'
    @Input() optionName: string = 'value'
    @Input() dictName: string

    _oldDictName: string
    _oldOptionsUrl: string
    _getDictOptionsTasks: any[] = []
    _getUrlOptionsTasks: any[] = []

    @Input() field: Select2Field;
    @Input() form: FormGroup;
    @Input() model: any = {};

    multiple: boolean = false
    select2: any
    _tipmsg: string = "必填项";

    controll: AbstractControl
    _isDataInit: boolean = false

    key1: string
    key2: string
    constructor(private http: Http) { }

    ngOnInit() {

        if (this.model == undefined) {
            this.model = {}
        }
        if (!this.simple) {
            this.multiple = this.field.multiple
            let key = this.field.key
            this.key = key
            this.controll = this.form.get(this.key)
            this.controll.valueChanges.forEach(
                (data) => {
                    // debugger
                    //select2已经初始化好了 但是没有把 值初始化好
                    if (!this._isDataInit && this.select2) {
                        if (this.controll.value) {
                            let select2Value = this.controll.value.split(',')
                            this.select2.val(select2Value).trigger("change")
                            this._isDataInit = true
                        }
                    }
                }
            )
            if (this.field.isObject && key.indexOf(".") != -1) {
                let keys = key.split(".")
                this.key1 = keys[0]
                if (this.model[this.key1] == undefined) {
                    this.model[this.key1] = {}
                }
                this.key2 = keys[1]
                this.key = this.key2
            }
            if (this.field.options == undefined
                || this.field.options.length == 0) {
                if (this.field.optionsOb) {
                    this.field.optionsOb.subscribe(data => this.field.options = data)
                } else if (this.field.dictName) {
                    this._oldDictName = this.field.dictName
                    this.getDictDataObserable(this.field.dictName).subscribe(
                        data => {
                            this.field.options = data
                            setTimeout(() => {
                                this.initData()
                            })
                            this._getDictOptionsTasks.pop()
                        }
                    )
                    if (this.field.optionId == "key") {
                        this.field.optionId = 'dictdataName'
                    }
                    if (this.field.optionName == "value") {
                        this.field.optionName = 'dictdataValue'
                    }
                } else if (this.field.optionsUrl) {
                    this._oldOptionsUrl = this.field.optionsUrl
                    this.getDataSourceObserable(this.field.optionsUrl).subscribe(data => {
                        this.field.options = data
                        setTimeout(() => {
                            this.initData()
                        })
                    })
                }
            }
        } else {
            if (this.options == undefined
                || this.options.length == 0) {
                if (this.optionsOb) {
                    this.optionsOb.subscribe(data => this.options = data)
                } else if (this.dictName) {
                    this.getDictDataObserable(this.dictName).subscribe(data => this.options = data)
                    if (this.optionId == "key") {
                        this.optionId = 'dictdataName'
                    }
                    if (this.optionName == "value") {
                        this.optionName = 'dictdataValue'
                    }
                }
            }

        }
        if (!(this.options instanceof Array)) {
            this.options = this.transform(this.options)
        }

    }

    ngAfterViewInit() {
        (require as any).ensure(['jquery'], (require) => {
            require('../../lib/select2.full.min.js')
            let select2 = $("#" + this.key)
            this.select2 = select2
            // debugger
            //不知道为什么 会有一个初始值，置空 。初始化放到controll的 之变化里面 或接下来的 initData设置
            select2.val("")
            select2.select2({
                multiple: this.multiple
            })
            //init data
            this.initData()
            //init listener
            select2.on('change', (evt, b, c) => {
                if (this.multiple) {
                    let oValue: Array<string> = select2.val()
                    let value = oValue.join(',')
                    // debugger
                    if (value) {
                        if (!this.simple) {

                            setTimeout(() => {
                                //注意此处不能出现 又触发change事件的情况 否则infinity loop
                                //目前似乎正常
                                this.form.patchValue(
                                    {
                                        [this.field.key]: value
                                    }
                                )
                            })

                            // let key = this.field.key
                            // if (this.field.isObject && key.indexOf(".") != -1) {
                            //     this.model[this.key1][this.key2] = value
                            // } else {
                            //     this.model[this.field.key] = value
                            // }
                        } else {
                            this.model[this.key] = value
                        }
                    }
                } else {
                    let value = select2.val()
                    if (!this.simple) {
                        let key = this.field.key
                        if (this.field.isObject && key.indexOf(".") != -1) {
                            this.model[this.key1][this.key2] = value
                        } else {
                            this.model[this.field.key] = value
                        }
                    } else {
                        this.model[this.key] = value
                    }
                }

            });
        }, 'test');
    }

    initData() {
        if (!this.select2)
            return
        if (this.multiple) {
            // if (!this.simple) {
            //     let key = this.field.key
            //     if (this.field.isObject && key.indexOf(".") != -1
            //         && this.model[this.key1][this.key2]) {
            //         value = this.model[this.key1][this.key2]
            //     } else if (this.model[this.field.key]) {
            //         value = this.model[this.field.key]
            //     }
            // } else {
            //     value = this.model[this.key]
            // }
            // if (value) {
            //     let select2Value = value.split(',')
            //     this.select2.val(select2Value).trigger("change")
            // }

            //此处有可能 value 并没有值而 select2 已经初始化完成了
            let control = this.form.get(this.key)
            let value = control.value
            // debugger
            if (value) {
                let select2Value = value.split(',')
                this.select2.val(select2Value).trigger("change")
                this._isDataInit = true
            }
        } else {
            if (!this.simple) {
                let key = this.field.key
                if (this.field.isObject && key.indexOf(".") != -1
                    && this.model[this.key1][this.key2]) {
                    this.select2.val(this.model[this.key1][this.key2]).trigger("change")
                } else if (this.model[this.field.key]) {
                    this.select2.val(this.model[this.field.key]).trigger("change")
                }
            } else {
                this.select2.val(this.model[this.key]).trigger("change")
            }
        }
    }

    ngclasses() {
        let classExpression = {
            'form-group': true,
            // 'row': true
            // 'has-error':!this.isValid,
        }
        if (this.simple) {
            classExpression["col-sm-" + this.span] = true;
            classExpression["col-md-offset-" + this.offset] = this.offset == 0 ? false : true;
        } else {
            classExpression["col-sm-" + (this.field.span | 4)] = true;
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

    transform(value) {
        let keys: any = [];
        for (let key in value) {
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    }

    ngDoCheck() {
        if (this._oldDictName && (this._oldDictName != this.field.dictName)) {
            let ob = this.getDictDataObserable(this.field.dictName)
            if (ob) {
                ob.subscribe(
                    data => {
                        this._oldDictName = this.field.dictName
                        this._getDictOptionsTasks.pop()
                        this.field.options = data
                        setTimeout(() => {
                            this.initData()
                        })
                    }
                )
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        // if (changes['field'] && changes['field'].currentValue) {

        // }
    }
}