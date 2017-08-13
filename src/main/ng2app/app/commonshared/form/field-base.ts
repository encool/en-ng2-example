import { ValidatorFn, AsyncValidatorFn, Validators, AbstractControl } from '@angular/forms';

export class FieldBase<T>{
  value: T;
  id: string
  selector: string
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
  isObject: boolean //废弃
  disable: boolean
  hidden: boolean
  _check: Function
  params: any
  _view: any
  _control: AbstractControl
  [key: string]: Object
  constructor(options: {
    value?: T,
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
    isObject?: boolean //废弃
    disable?: boolean
    hidden?: boolean
    params?: Object
  } = {}) {
    // debugger
    this.value = options.value;
    this.id = options.id;
    this.selector = options.selector || this.controlType; //文本框等基础表单元素可以让 controlType 等于selector
    this.key = options.key || '';
    this.label = options.label || '';
    this.span = options.span == null ? 6 : options.span
    this.required = !!options.required;
    this.order = options.order == null ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.validator = options.validator
    this.asyncValidator = options.asyncValidator
    this.minLength = options.minLength
    this.maxLength = options.maxLength
    this.pattern = options.pattern
    this.labelOffset = options.labelOffset == null ? 75 : options.labelOffset
    this.labelSpan = options.labelSpan == null ? 3 : options.labelSpan
    this.isObject = options.isObject == null ? false : options.isObject
    this.disable = options.disable == null ? false : options.disable
    this.hidden = options.hidden == null ? false : options.hidden
    this.params = options.params
  }
}