import { FieldBase } from './field-base'

export class FieldGroup extends FieldBase<any>{
    groupName: string
    fields: FieldBase<any>[]
    constructor(options: {
        groupName: string,
        fields?: FieldBase<any>[]
    }) {
        super(options)
        this.controlType = "fieldgroup"
        this.groupName = options.groupName
        this.fields = options.fields || []
    }
}