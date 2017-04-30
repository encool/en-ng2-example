import { FieldBase } from '../field-base';

export class FileUploadField extends FieldBase<string> {
  controlType = 'fileupload';
  type: string;
  params: {
    businessType: string
    businessKey: string
    businessKey1: string
    businessKey2: string
    businessKey3: string
  }
  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || 'text';
    if (this.type === "inrow") {
      this.selector = "f-file-upload-inrow"
    } else {
      this.selector = "f-file-upload"
    }
    this.params = options['params']
  }
}