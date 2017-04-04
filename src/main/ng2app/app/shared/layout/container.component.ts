import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'my-container',
    template: `
        <div class="container-fluid" [ngStyle]="setStyles()">
            <ng-content></ng-content>
        </div>
    `
})
export class ContainerComponent implements OnInit {

    @Input() styles: string
    constructor() { }

    ngOnInit() { }
    setStyles() {

        let styles = {}
        if (this.styles) {
            let styes = this.styles.split(";")
            for (let i in styes) {
                let kvs = styes[i].split(":")
                styles[kvs[0]] = kvs[1]
            }
        }
        return styles;
    }
}