import { Component, Input ,OnInit ,AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldBase }     from './field-base';
@Component({
    moduleId:module.id,
    selector: 'df-field-hori',
    templateUrl: 'dynamic-field-horizontal.component.html'
})
export class DynamicfieldHorizontalComponent implements OnInit,AfterViewInit{
    @Input() field: FieldBase<any>;
    @Input() form: FormGroup;
    @Input() model: any = {};
    _tipmsg:string = "必填项";
    get isValid() { return this.form.controls[this.field.key].valid; }
    ngclasses(){
        let classExpression = {
            'form-group':true,
            'has-error':!this.isValid,
        }
        classExpression["col-sm-"+this.field.span] = true;
        return classExpression
    }
    ngOnInit(){
        
    }
    ngAfterViewInit(){

    }
    ngAfterViewChecked() {
        // console.log("ng after view checked!");
        // var select = "#"+this.field.key;
        // var tip = $("#"+this.field.key)
        // var r = tip.tooltip();
    }    
}