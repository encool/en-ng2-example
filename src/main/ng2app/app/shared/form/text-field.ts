import { FieldBase } from '../../commonshared/form/field-base';
import { ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';

export class TextField extends FieldBase<string> {
  controlType = 'textinput';
  type: string;
  click: Function = () => { }

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
    type?: string
    labelWidth?: number
    click?: () => {}
  } = {}) {
    super(options);
    this.type = options['type'] || 'text';
    this.click = options['click']
    this.selector = "f-text-input"
  }
}