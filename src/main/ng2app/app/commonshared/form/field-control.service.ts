import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

import { FieldBase } from './field-base';
import { FieldGroup } from './field-group';
import { FieldArray } from './field-array';

@Injectable()
export class FieldControlService {
  constructor(private fb: FormBuilder) { }

  toFormGroup(fields: any[]) {
    let group: any = {};
    fields.forEach(field => {
      if (field instanceof FieldArray) {
        const arraygroups = new Array()
        for (let fieldGroup in field.groups) {
          let fieldGroupArray = [fieldGroup]
          arraygroups.push(this.toFormGroup(fieldGroupArray))
        }
        group[field.arrayName] = this.fb.array(arraygroups)
      } else if (field instanceof FieldGroup) {
        group[field.groupName] = this.toFormGroup(field.fields)
      } else if (field instanceof FieldBase) {
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
          group[field.key] = new FormControl({ value: field.value, disabled: field.disable } || '', validators, asyncValidators)
        } else if (validators.length > 0) {
          group[field.key] = new FormControl({ value: field.value, disabled: field.disable } || '', validators)
        } else if (asyncValidators.length > 0) {
          group[field.key] = new FormControl({ value: field.value, disabled: field.disable } || '', null, asyncValidators)
        } else {
          group[field.key] = new FormControl({ value: field.value, disabled: field.disable } || '')
        }
      }

    });
    return new FormGroup(group);
  }
}
