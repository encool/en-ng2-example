import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CheckboxField } from './checkbox.field'

import { UIComponent } from '../../../commonshared/decorators/ui-component.decorator'

@UIComponent({
    selector: 'f-checkbox-input',
    component: CheckboxComponent
})
@Component({
    selector: 'f-checkbox-input',
    template: `
    <div [ngSwitch]="simple">
        <div *ngSwitchCase="false" [ngClass]="ngclasses()" style="padding-left:100px;min-height:34px;margin-bottom:15px" [formGroup]="form">
            <label>
                <input type="checkbox" [formControlName]="field.key">{{field.label}}
            </label>
        </div>    
        <div *ngSwitchCase="true"  [ngClass]="ngclasses()" style="padding-left:100px">
            <label>
                <input type="checkbox" [(ngModel)]="model[key]" (ngModelChange)="onModelChange($event)">{{label}}
            </label>        
        </div>     
    </div>             
    `
})
export class CheckboxComponent implements OnInit {
    @Input() simple: boolean = true
    @Input() key: string = ''
    @Input() label: string = ''
    @Input() span: number = 4
    @Input() offset: number = 0

    @Output() valuechange = new EventEmitter();

    @Input() field: CheckboxField;
    @Input() form: FormGroup;
    @Input() model: any;

    _tipmsg: string = "必填项";

    key1: string
    key2: string
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
        }
    }

    ngclasses() {
        let classExpression = {
            'form-group': true,
            // 'row': true,
            'checkbox': true,
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

    onModelChange(e) {
        this.valuechange.emit(e)
    }
}