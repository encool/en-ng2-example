import { Component, OnInit, Input } from '@angular/core';

import { FieldBase } from '../../commonshared/form/field-base'
import { UIComponent } from '../decorators/ui-component.decorator'

@UIComponent({
    selector: 'wf-custom',
    component: CustomComponent
})
@Component({
    selector: 'wf-custom',
    template: `
        <p class="form-group col-sm-12">oops！遇到未知组件：{{field.label}}（暂时无法预览业务模块自定义组件）
        </p>


    `
})

export class CustomComponent implements OnInit {

    @Input() field: FieldBase<any>

    constructor() { }

    ngOnInit() { }

}