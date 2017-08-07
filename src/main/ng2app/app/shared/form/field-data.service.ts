import { Injectable }       from '@angular/core';
import { DropdownField } from './dropdown-field';
import { FieldBase } from '../../commonshared/form/field-base';
import { TextField }  from './text-field';
@Injectable()
export class FieldDataService {
  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getFields() {
    let fields: FieldBase<any>[] = [
      new DropdownField({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),
      new TextField({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),
      new TextField({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];
    return fields.sort((a, b) => a.order - b.order);
  }
}
