import { Component, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { FieldBase } from '../../../commonshared/form/field-base';
import { FieldControlService } from '../../../commonshared/form/field-control.service';
@Component({
    selector: 'dynamic-form-m',
    template: `
        <form (ngSubmit)="onSubmit()" [formGroup]="form" class="form-horizontal clearfix" role="form">
            <df-field-m [fields]="fields" [form]="form" [model]="model"></df-field-m>
        </form>    
    `,
    providers: [FieldControlService]
})
export class DynamicFormMComponent implements OnInit {
    @Input() fields: FieldBase<any>[] = [];
    @Input() model: any = {};

    @ViewChild(FormGroupDirective) ngForm: FormGroupDirective
    form: FormGroup;
    payLoad = '';
    constructor(private fcs: FieldControlService) {

    }
    ngOnInit() {
        this.fields = _.sortBy(this.fields, "order");
        this.form = this.fcs.toFormGroup(this.fields);
    }

    ngAfterViewInit() {
        if (this.model) {
            setTimeout(() => {
                this.form.patchValue(this.model)
                // this.form.updateValueAndValidity()
            }, 0)
        }
    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.form.value);
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['fields'] && changes['fields'].currentValue) {
            // _.sortBy(this.fields, "order");
            this.form = this.fcs.toFormGroup(changes['fields'].currentValue)
        }
    }

    getField(fieldNo: string): FieldBase<any> {
        let result = null
        this.fields.forEach(v => {
            if (v.key == fieldNo) {
                result = v
            }
        })
        return result
    }

}
