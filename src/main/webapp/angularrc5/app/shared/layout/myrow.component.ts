import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-row',
    template: `
        <div class="row">
            <ng-content></ng-content>
        </div>
    `
})
export class MyrowComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}