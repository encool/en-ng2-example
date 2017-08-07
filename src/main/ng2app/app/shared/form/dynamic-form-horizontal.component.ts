import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldBase } from '../../commonshared/form/field-base';
import { FieldControlService } from '../../commonshared/form/field-control.service';
@Component({
    selector: 'dynamic-form-hori',
    template: `
        <form (ngSubmit)="onSubmit()" [formGroup]="form" class="form-horizontal clearfix" role="form">
            <df-field-hori [fields]="fields" [form]="form" [model]="model"></df-field-hori>
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
