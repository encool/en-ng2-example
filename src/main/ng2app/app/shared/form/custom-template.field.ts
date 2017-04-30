import { FieldBase } from './field-base';

export class CustomTemplateField extends FieldBase<string> {
    controlType = 'customtemplate';
    params: object
    constructor(options: {} = {}) {
        super(options);
        this.params = options['params']
    }
}