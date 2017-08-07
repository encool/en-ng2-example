import { FieldBase } from '../../../commonshared/form/field-base';
// import { Observable } from 'rxjs/Observable';

export class TextareaField extends FieldBase<string> {
    controlType = 'textarea';
    rows: number = 3
    constructor(options: {} = {}) {
        super(options);
        this.rows = options['rows'] || 3;
        this.selector = "f-textarea"
    }
}