import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CheckboxGroupField } from './checkbox-group.field'

import { UIComponent } from '../../decorators/ui-component.decorator'

@UIComponent({
    selector: 'f-checkbox-group',
    component: CheckboxGroupComponent
})
@Component({
    selector: 'f-checkbox-group',
    template: `  
    <div class="checkbox" [formGroup]="form">
            <label *ngFor="let opt of field.options">
                <input type="checkbox" [(ngModel)]="model[field.key]" [formControlName]="field.key">{{opt[field.optionName]}}
            </label>
    </div>                    
    `
})
export class CheckboxGroupComponent implements OnInit {
    @Input() field: CheckboxGroupField;
    @Input() form: FormGroup;
    @Input() model: any;

    _tipmsg: string = "必填项";

    key1: string
    key2: string
    constructor() { }

    ngOnInit() {
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
    }
}