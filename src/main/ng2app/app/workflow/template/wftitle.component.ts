import { Component, OnInit, Input } from '@angular/core';
import { UIComponent } from '../../shared'

@UIComponent({
    selector: 'wf-title',
    component: WftitleComponent
})
@Component({
    selector: 'wf-title',
    template: `
    <div [ngClass]="groupClass()">
        <h3>{{title}}</h3>
    </div>    
    `
})
export class WftitleComponent implements OnInit {
    @Input() field: any
    span: number = 12
    title: string

    constructor() { }

    ngOnInit() {
        // debugger
        this.span = this.field.displaySpan == undefined ? 12 : this.field.displaySpan
        this.title = this.field.params.remark1 == undefined ? "属性1标题" : this.field.params.remark1
    }

    groupClass() {
        let classExpression = {
            'form-group': true,
            "text-center": true,
            // 'form-horizontal': true,
            // 'has-error':!this.isValid,
        }
        classExpression["col-sm-" + this.span] = true;
        return classExpression
    }
}