import { Component, Input, OnInit, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { DropdownField } from './dropdown-field'

import { UIComponent } from '../decorators/ui-component.decorator'

@UIComponent({
    selector: 'f-dropdown-input',
    component: DropdownComponent
})
@Component({
    selector: 'f-dropdown-input',
    template: `
    <div [ngSwitch]="simple">
        <div *ngSwitchCase="false" [formGroup]="form" [style.display]="field.hidden ? 'none':'inline'" [ngClass]="ngclasses()">
    	    <label [attr.for]="field.key" class="control-label" style="float: left;width:75px">{{field.label}}</label>
            <div style="margin-left:85px">
                <select [id]="field.key" [formControlName]="field.key"
                        class="form-control"> 
                    <option *ngFor="let opt of field.options" [value]="opt[field.optionId]">{{opt[field.optionName]}}</option>
                </select>
            </div>  
        </div>
        <div *ngSwitchCase="true"  [style.display]="hidden ? 'none':'inline'" [ngClass]="ngclasses()">
    	    <label [attr.for]="key" class="control-label" style="float: left;width:75px">{{label}}</label>
            <div class="" style="margin-left:85px">
                <select [id]="key" [(ngModel)]="model[key]" [disabled]="disabled"
                        class="form-control"> 
                    <option *ngFor="let opt of options" [value]="opt[optionId]">{{opt[optionName]}}</option>
                </select>
            </div>       
        </div>  
    </div>                                   
    `
})
export class DropdownComponent implements OnInit {
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

    @Input() field: DropdownField;
    @Input() form: FormGroup;
    @Input() model: any = {};

    _tipmsg: string = "必填项";

    key1: string
    key2: string
    constructor(private http: Http) {

    }

    ngOnInit() {
        if (this.model == undefined) {
            this.model = {}
        }
        if (!this.simple) {
            this.field._view = this
            this.field._control = this.form.get(this.field.key)

            // let key = this.field.key
            // if (this.field.isObject && key.indexOf(".") != -1) {
            //     let keys = key.split(".")
            //     this.key1 = keys[0]
            //     if (this.model[this.key1] == undefined) {
            //         this.model[this.key1] = {}
            //     }
            //     this.key2 = keys[1]
            // }
            if (this.field.options == undefined
                || this.field.options.length == 0) {
                if (this.field.optionsOb) {
                    this.field.optionsOb.subscribe(data => this.field.options = data)
                } else if (this.field.dictName) {
                    this.getDictDataObserable(this.field.dictName).subscribe(data => this.field.options = data)
                    if (this.field.optionId == "key") {
                        this.field.optionId = 'dictdataName'
                    }
                    if (this.field.optionName == "value") {
                        this.field.optionName = 'dictdataValue'
                    }
                }
            }
        } else {
            if (this.options.length == 0 && this.optionsOb) {
                this.optionsOb.subscribe(data => this.options = data)
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
            let span = this.field.span || 4
            classExpression["col-sm-" + span] = true;
        }
        return classExpression
    }

    getDictDataObserable(dictName: string): Observable<any[]> {
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

    ngOnChanges(changes: SimpleChanges) {
        // if (changes['field'] && changes['field'].currentValue) {
        //     debugger
        // }
    }

    getOptionObj(optionId: string) {
        if (this.field.options && this.field.options.length > 0) {
            this.field.options.forEach(option => {
                if (option[this.field.optionId] == optionId) {
                    return option
                }
            })
        } else if (this.options && this.options.length > 0) {
            this.options.forEach(option => {
                if (option[this.optionId] == optionId) {
                    return option
                }
            })
        }
        return null
    }
}