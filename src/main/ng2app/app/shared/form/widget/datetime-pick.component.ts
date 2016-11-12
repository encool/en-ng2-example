import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
var moment = require('moment');
// import Moment as m from 'moment'

import { DatetimePickField } from './datetime-pick.field'

@Component({
    selector: 'f-datetime-pick',
    template: `
    <div [ngSwitch]="simple">
        <div *ngSwitchCase="false" [ngSwitch]="field.isObject" [formGroup]="form" [ngClass]="ngclasses()">
        	<label [attr.for]="field.key" class="control-label" style="float: left;width:75px">{{field.label}}</label>
        	<div *ngSwitchCase="true"  class="" style="margin-left:85px">
        		<input [formControlName]="field.key" [id]="field.key" [(ngModel)]="model[key1][key2]" [id]="field.key"
        			[type]="field.type" class="form-control" [title]="isValid?'':_tipmsg">
        	</div>
        	<div *ngSwitchCase="false" class="input-group date" style="margin-left:85px" data-provide="datepicker" [id]="datepickid">
        		<input [formControlName]="field.key" [id]="field.key" [(ngModel)]="datepickmodel" [id]="field.key"
        			type="text" class="form-control">
                <div class="input-group-addon">
                    <span class="glyphicon glyphicon-th"></span>
                </div>                    
            </div>            
        </div> 
        <div *ngSwitchCase="true"  [style.display]="hidden ? 'none':'inline'" [ngClass]="ngclasses()">
        	<label [attr.for]="key" class="control-label" style="float: left;width:75px">{{label}}</label>
        	<div class="" style="margin-left:85px">
        		<input [id]="key" [(ngModel)]="model[key]" [id]="key" [disabled]="disabled"
        			type="text" class="form-control">
        	</div>         
        </div>         
    </div>
    `
})
export class DatetimePickComponent implements OnInit {
    @Input() simple: boolean = true
    @Input() key: string = 'dropdowninput'
    @Input() label: string = ''
    @Input() span: number = 4
    @Input() offset: number = 0
    @Input() hidden: boolean = false
    @Input() disabled: boolean = false
    // @Input() optionsOb: Observable<any>
    @Input() options: any[] = []
    @Input() optionId: string = 'key'
    @Input() optionName: string = 'value'

    @Input() field: DatetimePickField;
    @Input() form: FormGroup;
    @Input() model: any = {};

    key1: string
    key2: string

    datepickid: string
    datepickmodel: any
    curDate: Date

    constructor() { }

    ngOnInit() {
        if (!this.simple) {
            let key = this.field.key
            if (this.field.isObject && key.indexOf(".") != -1) {
                let keys = key.split(".")
                this.key1 = keys[0]
                if (this.model[this.key1] == undefined) {
                    this.model[this.key1] = {}
                }
                this.key2 = keys[1]
                this.datepickid = this.key2 + Math.floor(Math.random() * 10000)
            } else {
                this.datepickid = key + Math.floor(Math.random() * 10000)
                let m = this.parseMoment(this.model[this.field.key])
                if (m) {
                    this.curDate = m.toDate()
                }
            }
        }
    }

    ngclasses() {
        let classExpression = {
            'form-group': true,
            // 'row': true
            // 'has-error':!this.isValid,
        }
        if (this.simple) {
            classExpression["col-sm-" + this.span] = true;
            classExpression["col-md-offset-" + this.offset] = this.offset == 0 ? false : true;
        } else {
            classExpression["col-sm-" + this.field.span] = true;
        }
        return classExpression
    }

    ngAfterViewInit() {
        let datepicker: any = $('#' + this.datepickid)
        datepicker.datepicker(
            {
                autoclose: true
            }
        ).on("changeDate", (e) => {

            let date: Date = e.date
            // let m: Moment
            let m = moment(date)
            if (!this.simple) {
                let key = this.field.key
                if (this.field.isObject && key.indexOf(".") != -1) {

                } else {
                    this.model[this.field.key] = m.toDate().getTime()
                }
            }
        });
        datepicker.datepicker('setDate', this.curDate);
    }

    parseMoment(date: any) {
        if (date) {
            return moment(date)
        }
    }
}