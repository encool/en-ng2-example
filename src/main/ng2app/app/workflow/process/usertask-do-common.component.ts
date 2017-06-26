import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'usertask-do-common',
    template: `
    <my-container [styles]="'width: 210mm;'">
        <usertask-do>        
        </usertask-do>
    </my-container>    
    `
})
export class UsertaskDoCommonComponent implements OnInit {

    constructor() { }

    ngOnInit() { 

    }

}