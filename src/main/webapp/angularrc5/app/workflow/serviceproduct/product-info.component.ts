import { Component, OnInit } from '@angular/core';

import { DropdownField } from '../../shared/form/dropdown-field';
import { FieldBase }     from '../../shared/form/field-base';
import { TextField }  from '../../shared/form/text-field';
import { DynamicFormHorizontalComponent } from '../../shared/form/dynamic-form-horizontal.component'

@Component({
    selector: 'product-info',
    templateUrl: './product-info.component.html'
})
export class ProductInfoComponent implements OnInit {

    $model:any;
    _fields:any;

    constructor() { }

    ngOnInit() { 
        this._fields = [
            new DropdownField({
                key: 'serviceTypeId',
                label: '服务分类',
                options: [
                    { key: 'F', value: '女' },
                    { key: 'M', value: '男' },
                ],
                span: 6,
                order: 4
            }),
            new TextField({
                key: 'productNo',
                label: '编码',
                required: true,
                span: 6,
                order: 1
            }),
            new TextField({
                key: 'productName',
                label: '服务名称',
                required: true,
                span: 6,
                order: 2
            }),
            new TextField({
                key: 'ico',
                label: '图标',
                required: true,
                span: 6,
                order: 3
            }),
        ];        
    }
}