import { FieldBase } from './field-base';
import { Observable } from 'rxjs/Observable';

export class DropdownField extends FieldBase<string> {
  controlType = 'dropdowninput';
  options: { key: string, value: string }[] = [];
  optionsUrl: string
  optionsOb: Observable<any>
  dictName: string
  optionId: string
  optionName: string
  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
    this.optionsUrl = options['optionsUrl'] || undefined;
    this.optionsOb = options['optionsOb'] || undefined;
    this.dictName = options['dictName'] || undefined;
    this.optionId = options['optionId'] || "key";
    this.optionName = options['optionName'] || "value";
    this.selector = "f-dropdown-input"
  }
}