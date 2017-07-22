import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sidenav-container',
    template: `
        <div class="docs-component-sidenav-content">
            <div>
                <ng-content></ng-content>
            </div>         
            <div class="fill-remaining-space"></div>
        </div>
    `,
    styles: [
        `
    .docs-component-sidenav-content {
        min-height: 100%;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
    }
    `
    ]
})
export class SideNavContainerComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

}