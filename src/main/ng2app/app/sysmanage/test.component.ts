import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-test',
    template: `
        <h3>hello!!</h3>
        <my-menuinfo></my-menuinfo>
    `
})
export class TestComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}