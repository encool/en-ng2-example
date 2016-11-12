import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { RadioGroupField } from './radio-group.field'

@Component({
    selector: 'f-radio-group',
    template: `
    <div [ngSwitch]="simple">
        <div *ngSwitchCase="false">
            <label  class="radio-inline">
              <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> 1
            </label>  
        </div> 
        <div *ngSwitchCase="true" class="radio" style="padding-left:10px">
            <label  *ngFor="let opt of options" class="radio-inline">
              <input type="radio" name="inlineRadioOptions" [(ngModel)]="model[key]" [id]="opt[optionId]" 
              [value]="opt[optionId]" (ngModelChange)="onModelChange($event)"> {{opt[optionName]}}
            </label>  
        </div> 
    </div>        
    `
})
export class RadioGroupComponent implements OnInit {
    @Input() simple: boolean = true
    @Input() key: string = 'dropdowninput'
    @Input() label: string = ''
    @Input() span: number = 4
    @Input() offset: number = 0
    @Input() hidden: boolean = false
    @Input() optionsOb: Observable<any>
    @Input() options: any
    @Input() optionId: string = 'key'
    @Input() optionName: string = 'value'

    @Input() field: RadioGroupField;
    @Input() form: FormGroup;
    @Input() model: any;

    @Output() valuechange = new EventEmitter();

    key1: string
    key2: string
    realoptions: Array<any>

    constructor() { }

    ngOnInit() {
        if (!this.simple) {
            let key = this.field.key
            if (this.field.isObject && key.indexOf(".") != -1) {
                let keys = key.split(".")
                this.key1 = keys[0]
                if (this.model[this.key1] == undefined) {
                    this.model[this.key1] = {}
                }
                this.key2 = keys[1]
            }
            if (this.field.options.length == 0 && this.field.optionsOb) {
                this.field.optionsOb.subscribe(data => this.field.options = data)
            }
        } else {
            if (this.options.length == 0 && this.optionsOb) {
                this.optionsOb.subscribe(data => this.options = data)
            }
        }
        if (!(this.options instanceof Array)) {
            this.options = this.transform(this.options)
        }
    }

    onModelChange(e) {
        this.valuechange.emit(e);
    }

    transform(value) {
        let keys: any = [];
        for (let key in value) {
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    }
}