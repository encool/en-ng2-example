import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TextareaField } from './textarea.field'

import { UIComponent } from '../../decorators/ui-component.decorator'

@UIComponent({
    selector: 'f-textarea',
    component: TextareaComponent
})
@Component({
    selector: 'f-textarea',
    template: `
    <div [ngSwitch]="simple">
        <div *ngSwitchCase="false" [formGroup]="form" [style.display]="field.hidden ? 'none':'inline'" [ngClass]="ngclasses()">
        	<label [attr.for]="field.key" class="control-label" style="float: left;width:75px">{{field.label}}</label>
        	<div class="" style="margin-left:85px">
                <textarea [formControlName]="field.key" [id]="field.key" [id]="field.key"
        			class="form-control" rows="3"></textarea>            
            </div>            
        </div> 
        <div *ngSwitchCase="true"  [style.display]="hidden ? 'none':'inline'" [ngClass]="ngclasses()">
        	<label [attr.for]="key" class="control-label" style="float: left;width:75px">{{label}}</label>
        	<div class="" style="margin-left:85px">
        		<input [id]="key" [(ngModel)]="model[key]" [id]="key" [disabled]="disabled"
        			type="text" class="form-control">
        	</div>         
        </div>         
    </div>           
    `
})
export class TextareaComponent implements OnInit {

    @Input() simple: boolean = true
    @Input() key: string = ''
    @Input() label: string = ''
    @Input() span: number = 12
    @Input() offset: number = 0
    @Input() hidden: boolean = false
    @Input() disabled: boolean = false

    @Input() field: TextareaField;
    @Input() form: FormGroup;
    @Input() model: any;

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
            // 'row': true
            // 'has-error':!this.isValid,
        }
        if (this.simple) {
            classExpression["col-sm-" + this.span] = true;
            classExpression["col-md-offset-" + this.offset] = this.offset == 0 ? false : true;
        } else {
            let span = this.field.span || 12
            classExpression["col-sm-" + span] = true;
        }
        return classExpression
    }
}