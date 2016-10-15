import { Component, OnInit, Input } from '@angular/core';

import { Tab } from './tab'

@Component({
    moduleId: module.id,
    selector: 'tabpanel',
    template: `
        <div role="tabpanel" [ngClass]="{'tab-pane':true,'active': tab.active}" [id]="tab.key">
            <ng-content></ng-content>
        </div>
    `
})
export class TabpanelComponent implements OnInit {

    @Input() tab:Tab
    constructor() { }

    ngOnInit() { }
}