import { FieldBase } from '../../commonshared/form/field-base';
import { ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';

export class FieldGroup extends FieldBase<any>{
    groupName: string
    fields: FieldBase<any>[]
    constructor(options: {
        value?: any,
        id?: string,
        selector?: string
        key?: string,
        label?: string,
        span?: number,
        required?: boolean,
        validator?: ValidatorFn | ValidatorFn[],
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
        minLength?: number,
        maxLength?: number,
        pattern?: string
        order?: number,
        controlType?: string
        labelOffset?: number
        labelSpan?: number
        disable?: boolean
        hidden?: boolean
        params?: Object
        groupName: string,
        fields?: FieldBase<any>[]
    }) {
        super(options)
        this.controlType = "fieldgroup"
        this.groupName = options.groupName
        this.fields = options.fields || []
        this.selector = "df-field-group-hori"
    }
}