import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-form',
    template: `
    <div class="form-horizontal">
        <ng-content></ng-content>
    </div>`
})
export class MyformComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}