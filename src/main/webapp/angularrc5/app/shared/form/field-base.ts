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
  }
}
