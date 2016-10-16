import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldBase }     from './field-base';
@Component({
    selector: 'df-field-hori',
    templateUrl: './dynamic-field-horizontal.component.html'
})
export class DynamicfieldHorizontalComponent implements OnInit, AfterViewInit {
    @Input() field: FieldBase<any>;
    @Input() form: FormGroup;
    @Input() model: any;

    _tipmsg: string = "必填项";

    key1: string
    key2: string

    get isValid() { return this.form.controls[this.field.key].valid; }
    ngclasses() {
        let classExpression = {
            'form-group': true,
            // 'has-error':!this.isValid,
        }
        classExpression["col-sm-" + this.field.span] = true;
        return classExpression
    }

    ngOnInit() {
        let key = this.field.key
        if (this.field.isObject &&　key.indexOf(".") != -1) {
            let keys = key.split(".")
            this.key1 = keys[0]
            if(this.model[this.key1] == undefined){
                this.model[this.key1] = {}
            }
            this.key2 = keys[1]
        } 
    }

    ngAfterViewInit() {

    }

    // oldValue:any
    // ngDoCheck() {
    //     // console.log("checked and old",this.oldValue);
    //     // if(this.model[this.key1]){
            
    //     // }
    //     if (this.isComplicateKey && this.model[this.key1] !== undefined
    //             && this.model[this.key1][this.key2] !== this.oldValue) {debugger
    //         console.log("old",this.oldValue);
    //         console.log("new",this.model[this.key1][this.key2]);
    //         this.oldValue = this.model[this.key1][this.key2]
    //         this.key1Value[this.key2] = this.oldValue
    //     }
    //     console.log("this.key1Value",this.key1Value);
    //     if (this.isComplicateKey && this.key1Value !== undefined
    //             && this.key1Value[this.key2] !== this.oldValue) {debugger
    //         console.log("old",this.oldValue);
    //         console.log("new",this.model[this.key1][this.key2]);
    //         this.oldValue = this.model[this.key1][this.key2]
    //         this.key1Value[this.key2] = this.oldValue
    //     }        

    // }


    ngAfterViewChecked() {
        // console.log("ng after view checked!");
        // var select = "#"+this.field.key;
        // var tip = $("#"+this.field.key)
        // var r = tip.tooltip();
    }
}