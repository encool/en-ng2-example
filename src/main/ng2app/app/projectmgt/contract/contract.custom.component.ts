import { Component, OnInit } from '@angular/core';

import { UIComponent } from '../../decorators/ui-component.decorator'


@UIComponent({
    selector: 'contract-custom',
    component: CCComponent
})
@Component({
    selector: 'contract-custom',
    template: `
        <div class="form-group col-sm-12">处理表单由各种显示元素组成。除了基本表单元素（input、select等），还可以自定义显示元素
        
        <form id="testform" action="iframefile/qybdirprocess/upload" method="post" enctype="multipart/form-data">
    <input type="text" name="description" />
    <input type="file" name="file" />
    <input type="submit" (click)="click()"/>
</form>
        </div>


    `
})

export class CCComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    click() {
        $("#testform").submit()
    }
}