import { FieldBase } from './field-base';

export class CustomTemplateField extends FieldBase<string> {
    controlType = 'customtemplate';
    constructor(options: {} = {}) {
        super(options);
    }
}