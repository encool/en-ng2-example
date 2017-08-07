import { FieldBase } from '../../../commonshared/form/field-base';
import { Observable } from 'rxjs/Observable';

export class Select2Field extends FieldBase<string> {
  controlType = 'select2';
  multiple: boolean = false
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
    this.multiple = options['multiple'] || false;
    this.selector = "f-select2"
  }
}