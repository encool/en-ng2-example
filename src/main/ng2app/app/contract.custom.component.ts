import { Component, ViewChild, OnInit } from '@angular/core';

// import { UIComponent } from '../../decorators/ui-component.decorator'


// @UIComponent({
//     selector: 'contract-custom',
//     component: CCComponent
// })
@Component({
    selector: 'my-app',
    template: `
        <div class="form-group col-sm-12">处理表单由各种显示元素组成。除了基本表单元素（input、select等），还可以自定义显示元素
        
        <form id="testform" #testform action="iframefile/qybdirprocess/upload" method="post" enctype="multipart/form-data">
    <input type="text" name="description" />
    <input type="file" name="file" />
    <input type="submit" (click)="click()"/>
</form>
        </div>


    `
})

export class CCComponent implements OnInit {

    @ViewChild("testform") form
    constructor() { }

    ngOnInit() { }

    click() {
        debugger
        // $("#testform").submit()
        let ele = this.form.nativeElement
        ele.submit(function (e) {debugger
            if ($('.errors').is(':visible')) {
                e.preventDefault();
                // do something else here// some errors are visible :)
                return false;
            } else {

            }
        })
    }
}