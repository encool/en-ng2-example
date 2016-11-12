import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FieldBase } from './field-base';

@Injectable()
export class FieldControlService {
  constructor() { }

  toFormGroup(fields: FieldBase<any>[]) {
    let group: any = {};

    fields.forEach(field => {
      var validators = [];
      var asyncValidators = [];
      if (field.required) {
        validators.push(Validators.required)
      }
      if (field.validator) {
        validators.push(field.validator)
      }
      if (field.asyncValidator) {
        asyncValidators.push(field.asyncValidator)
      }
      if (validators.length > 0 && asyncValidators.length > 0) {
        group[field.key] = new FormControl({value:field.value,disabled:field.disable} || '', validators, asyncValidators)
      } else if (validators.length > 0) {
        group[field.key] = new FormControl({value:field.value,disabled:field.disable} || '', validators)
      } else if (asyncValidators.length > 0) {
        group[field.key] = new FormControl({value:field.value,disabled:field.disable} || '', null, asyncValidators)
      } else {
        group[field.key] = new FormControl({value:field.value,disabled:field.disable} || '')
      }

    });
    return new FormGroup(group);
  }
}
