import { FieldBase } from './field-base';

export class TextField extends FieldBase<string> {
  controlType = 'textinput';
  type: string;
  click: Function = () => { }

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || 'text';
    this.click = options['click']
    this.selector = "f-text-input"
  }
}