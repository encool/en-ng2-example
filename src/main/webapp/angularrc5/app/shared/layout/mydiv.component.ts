import { Component, OnInit ,Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-div',
    template: `
        <div style="padding:15px" [ngClass]="setClass()">
            <ng-content></ng-content>
        <div>
    `
})
export class MydivComponent implements OnInit {
    @Input()
    span:string;
    
    setClass(){
        var colClassName = "col-sm-"+this.span;
        var classOb = {};
        classOb[colClassName] = true;
        return classOb;
    }

    constructor() { }

    ngOnInit() { }

}