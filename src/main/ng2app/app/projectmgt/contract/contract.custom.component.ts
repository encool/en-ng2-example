import { Component, OnInit } from '@angular/core';

import { UIComponent } from '../../decorators/ui-component.decorator'


@UIComponent({
    selector: 'contract-custom',
    component: CCComponent
})
@Component({
    selector: 'contract-custom',
    template: `
        <div>hello world</div>
    `
})

export class CCComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}