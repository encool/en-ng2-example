import { ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';

export class FieldBase<T>{
  value: T;
  key: string;
  label: string;
  span: number
  required: boolean;
  order: number;
  controlType: string;
  validator: ValidatorFn | ValidatorFn[]
  asyncValidator: AsyncValidatorFn | AsyncValidatorFn[]
  minLength: number
  maxLength: number
  pattern: string
  labelOffset: number
  labelSpan: number
  isObject: boolean
  disable: boolean
  hidden: boolean
  constructor(options: {
    value?: T,
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
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.span = options.span === undefined ? 6 : options.span
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.validator = options.validator
    this.asyncValidator = options.asyncValidator
    this.minLength = options.minLength
    this.maxLength = options.maxLength
    this.pattern = options.pattern
    this.labelOffset = options.labelOffset === undefined ? 75 : options.labelOffset
    this.labelSpan = options.labelSpan === undefined ? 3 : options.labelSpan
    this.isObject = options.isObject === undefined ? false : options.isObject
    this.disable = options.disable === undefined ? false : options.disable
    this.hidden = options.hidden === undefined ? false : options.hidden
  }
}
