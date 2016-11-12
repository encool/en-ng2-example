import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldBase } from './field-base';
import { FieldControlService } from './field-control.service';
@Component({
    selector: 'dynamic-form-hori',
    template: `
        <form (ngSubmit)="onSubmit()" [formGroup]="form" class="form-horizontal row" role="form">
            <div *ngFor="let field of fields" [ngSwitch]="field.controlType">
                <f-dropdown-input *ngSwitchCase="'dropdowninput'" [simple]="false" [form]="form" [field]="field" [model]="model"></f-dropdown-input>
                <f-text-input *ngSwitchCase="'textinput'" [simple]="false" [form]="form" [field]="field" [model]="model"></f-text-input>
                <f-datetime-pick *ngSwitchCase="'datetimepick'" [simple]="false" [form]="form" [field]="field" [model]="model"></f-datetime-pick>
                <f-textarea *ngSwitchCase="'textarea'" [simple]="false" [form]="form" [field]="field" [model]="model"></f-textarea>
            </div>
        </form>    
    `,
    providers: [FieldControlService]
})
export class DynamicFormHorizontalComponent implements OnInit {
    @Input() fields: FieldBase<any>[] = [];
    @Input() model: any = {};
    form: FormGroup;
    payLoad = '';
    constructor(private fcs: FieldControlService) {

    }
    ngOnInit() {
        // debugger
        this.fields = _.sortBy(this.fields, "order");
        this.form = this.fcs.toFormGroup(this.fields);
    }
    onSubmit() {
        this.payLoad = JSON.stringify(this.form.value);
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['fields'] && changes['fields'].currentValue) {
            this.form = this.fcs.toFormGroup(changes['fields'].currentValue)
        }
    }

}
