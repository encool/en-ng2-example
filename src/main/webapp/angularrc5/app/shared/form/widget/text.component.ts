import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'my-text',
    templateUrl: './text.component.html'
})
export class TextComponent implements OnInit {
    @Input() id;
    @Input() type;

    @Input() model;
    @Input() key;

    constructor() { }

    ngOnInit() { }
}