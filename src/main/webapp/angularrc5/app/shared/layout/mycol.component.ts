import { Component, OnInit ,Input} from '@angular/core';

@Component({
    moduleId: module.id,
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
        var colClassName = "clo-sm-"+this.span;
        var classOb = {};
        classOb[colClassName] = true;
        return classOb;
    }

    constructor() { }

    ngOnInit() { }

}