import { Component, OnInit ,Input} from '@angular/core';

import { FieldBase } from '../../shared'
import { UIComponent } from '../../shared'


@UIComponent({
    selector: 'wf-custom',
    component: CustomComponent
})
@Component({
    selector: 'wf-custom',
    template: `
        <div class="form-group col-sm-12">oops！遇到未知组件：{{field.label}}（暂时无法预览业务模块自定义组件）
        </div>


    `
})

export class CustomComponent implements OnInit {

    @Input() field: FieldBase<any>

    constructor() { }

    ngOnInit() { }

}