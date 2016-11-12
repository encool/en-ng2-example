import { Component, OnInit ,Input} from '@angular/core';

@Component({
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