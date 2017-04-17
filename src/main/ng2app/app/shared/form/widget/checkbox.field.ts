import { FieldBase } from '../field-base';
import { Observable } from 'rxjs/Observable';

export class CheckboxField extends FieldBase<string> {
  controlType = 'checkbox';
  constructor(options: {} = {}) {
    super(options);
    this.selector = "f-checkbox-input"
    // this.options = options['options'] || [];
    // this.optionsUrl = options['optionsUrl'] || undefined;
    // this.optionsOb = options['optionsOb'] || undefined;
    // this.dictName = options['dictName'] || undefined;
    // this.optionId = options['optionId'] || "key";
    // this.optionName = options['optionName'] || "value";
  }
}