import { Component, OnInit ,Input} from '@angular/core';

@Component({
    selector: 'my-col',
    template: `
        <div [ngClass]="setClass()">
            <ng-content></ng-content>
        <div>
    `
})
export class MycolComponent implements OnInit {
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