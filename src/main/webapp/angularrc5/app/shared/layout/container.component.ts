import { Component, OnInit ,Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-container',
    template: `
        <div class="container-fluid">
            <ng-content></ng-content>
        </div>
    `
})
export class ContainerComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}