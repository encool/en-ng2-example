import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'wf-text-input',
    template: `
    <div [ngClass]="groupClass()">
        <label for="inputPassword" class="control-label" style="float: left;width: 75px;">{{field.fieldName}}</label>
        <div style="margin-left:85px">
          <input [(ngModel)]="model[field.fieldNo]" type="text" class="form-control" id="inputPassword">
        </div>
    </div>    
    `
})
export class TextinputComponent implements OnInit {
    @Input() model: any
    @Input() field: any
    span: number
    constructor() { }

    ngOnInit() {
        this.span = this.field.displaySpan == undefined ? 3 : this.field.displaySpan
    }

    groupClass() {
        let classExpression = {
            'form-group': true,
            // 'form-horizontal': true,
            // 'has-error':!this.isValid,
        }
        classExpression["col-sm-" + this.span] = true;
        return classExpression
    }
}