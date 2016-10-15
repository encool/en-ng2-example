import { Component, Input ,OnInit ,AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldBase }     from './field-base';
@Component({
    moduleId:module.id,
    selector: 'df-field',
    templateUrl: 'dynamic-form-field.component.html'
})
export class DynamicFormfieldComponent implements OnInit,AfterViewInit{
    @Input() field: FieldBase<any>;
    @Input() form: FormGroup;
    @Input() model: any;
    _tipmsg:string = "必填项";
    get isValid() { 
        // return true;
        return this.form.controls[this.field.key].valid; 
    }
    ngclasses(){
        return {
            'form-group':true,
            'has-error':!this.isValid
        }
    }
    ngOnInit(){
        this.model = this.model
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
