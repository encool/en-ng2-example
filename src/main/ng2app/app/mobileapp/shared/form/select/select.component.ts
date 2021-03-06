import { Component, Input, OnInit, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { DropdownField } from '../../../../commonshared/form/dropdown-field'

import { UIComponent } from '../../../../commonshared/decorators/ui-component.decorator'
// 
// [(ngModel)]="model" 
@UIComponent({
    selector: 'm-selector',
    component: SelectComponent
})
@Component({
    selector: 'm-selector',
    template: `
        <md-select [eNfxFlex]="eNfxFlex" [eNfxFlex.xs]="eNfxFlexXs" fxShrink="0" fxGrow="0" style="min-height: 55px;padding-top: 15px;width: 100%;" 
            [floatPlaceholder]="true" [placeholder]="label"            
            [formControl]="controll"
            floatPlaceholder="never"
            [multiple]="multiple" 
            (change)=OnChange($event)>           
            <md-option>无</md-option>
            <md-option *ngFor="let option of options" [value]="option[optionId]">{{ option[optionName] }}</md-option>
        </md-select>      
    `,
})
export class SelectComponent implements OnInit {
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
    @Input() multiple: boolean = false


    @Input() field: DropdownField;
    @Input() form: FormGroup;
    @Input() model: any;

    controll: AbstractControl
    dictName: string

    eNfxFlex: string
    eNfxFlexXs: string

    classExpression: any = {}

    constructor(private http: Http) {

    }

    ngOnInit() {
        // debugger
        if (!this.simple) {
            this.label = this.field.label
            this.key = this.field.key
            this.field._view = this
            this.controll = this.field._control = this.form.get(this.field.key)
            this.span = this.field.span == undefined ? 4 : this.field.span
            this.eNfxFlex = "calc(" + (this.span / 12) * 100 + "% - 15px)"
            // this.eNfxFlexXs = "calc(100% - 15px)"
            this.eNfxFlexXs = "100%"
            this.multiple = SelectComponent.isMutipleField(this.field)
            this.dictName = this.field.params.primaryField.dictName

            this.patchValueToView()
            this.controll.valueChanges.forEach(
                (data) => {
                    this.patchValueToView()
                }
            )

            if (this.field.options == undefined
                || this.field.options.length == 0) {
                if (this.field.optionsOb) {
                    this.field.optionsOb.subscribe(data => this.options = data)
                } else if (this.dictName) {
                    this.getDictDataObserable(this.dictName).subscribe(data => this.options = data)
                    this.optionId = 'dictdataName'
                    this.optionName = 'dictdataValue'
                }
            }
        } else {
            if (this.options.length == 0 && this.optionsOb) {
                this.optionsOb.subscribe(data => this.options = data)
            }
        }

        this.classExpression = {
            'form-group': true,
            // 'row': true
            // 'has-error':!this.isValid,
        }
        if (this.simple) {
            this.classExpression["col-sm-" + this.span] = true;
            this.classExpression["col-md-offset-" + this.offset] = this.offset == 0 ? false : true;
        } else {
            let span = this.field.span || 4
            this.classExpression["col-sm-" + span] = true;
        }

    }

    patchValueToView() {
        if (this.controll.value && this.multiple && typeof this.controll.value == 'string') {
            let v: string = this.controll.value
            this.model = v.split(',')
        } else if (this.controll.value && !this.multiple) {
            this.model = this.controll.value
        } else {
            this.model = {}
        }
    }

    OnChange(change) {
        let value
        if (this.multiple) {
            value = change.value.join(",")
        } else {
            value = change.value
        }
        this.form.patchValue(
            {
                [this.key]: value
            }
        )
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

    static handleValue(type: string, input: any, field): any {
        switch (type) {
            case 'in':
                if (typeof input === 'string' && SelectComponent.isMutipleField(field)) {
                    return input.split(',')
                } else if (input == null) {
                    return []
                } else {
                    return input
                }
            case 'out':
                if (Array.isArray(input)) {
                    return input.join(',')
                } else {
                    return input
                }

            default:
                break;
        }
    }

    static isMutipleField(field) {
        return field.params.primaryField.multiple ||
            field.params.primaryField.webDisplayTypeId === "Select2Component" //电脑端的多选组件
    }
}