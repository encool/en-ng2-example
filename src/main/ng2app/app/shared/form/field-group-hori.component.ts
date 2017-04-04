import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldGroup } from './field-group';
import { FieldControlService } from './field-control.service';
@Component({
    selector: 'df-field-group-hori',
    template: `
    <div [formGroup]="form">
        <div [formGroup]="form" [formGroupName]="field.groupName">
        	<df-field-hori [form]="form.controls[field.groupName]" [fields]="field.fields" [model]="model"></df-field-hori>
        </div>
    </div>
    `,
})
export class FieldGroupHoriComponent implements OnInit {
    @Input() field: FieldGroup;
    @Input() form: FormGroup
    @Input() model: any = {}
    constructor(private fcs: FieldControlService) {

    }
    ngOnInit() {
        // this.form.controls.
    }
    onSubmit() {
    }
}