import { TextField } from './text-field';
import { ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';

export class TextQueryField extends TextField {
  controlType = 'textinput';
  type: string;
  click: Function = () => { }
  fuzzy: boolean

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
    //for query
    fuzzy?: boolean //模糊检索
  } = {}) {
    super(options);
    this.type = options['type'] || 'text';
    this.click = options['click']
    this.selector = "f-text-input"
    this.fuzzy = options.fuzzy
  }
}