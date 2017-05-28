import { FieldBase } from './field-base';
import { Observable } from 'rxjs/Observable';

import { ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';

export class DropdownField extends FieldBase<string> {
  controlType = 'dropdowninput';
  options: { key: string, value: string }[] = [];
  optionsUrl: string
  optionsOb: Observable<any>
  dictName: string
  optionId: string
  optionName: string
  constructor(options: {
    value?: string,
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
    isObject?: boolean
    disable?: boolean
    hidden?: boolean
    params?: Object
    options?: { key: string, value: string }[]
    optionsUrl?: string
    optionsOb?: Observable<any>
    dictName?: string
    optionId?: string
    optionName?: string
    [propName: string]: any
  } = {}) {
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