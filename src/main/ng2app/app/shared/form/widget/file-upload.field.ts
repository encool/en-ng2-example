import { FieldBase } from '../field-base';

export class FileUploadField extends FieldBase<string> {
  controlType = 'fileupload';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || 'text';
  }
}