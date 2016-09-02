import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { FieldBase }              from './field-base';
import { FieldControlService }    from './field-control.service';
@Component({
    moduleId:module.id,
    selector: 'dynamic-form',
    templateUrl: 'dynamic-form.component.html',
    providers: [ FieldControlService ]
})
export class DynamicFormComponent implements OnInit {
    @Input() fields: FieldBase<any>[] = [];
    @Input() model:any = {};
    form: FormGroup;
    payLoad = '';
    constructor(private fcs: FieldControlService) {  
        
    }
    ngOnInit() {
        this.form = this.fcs.toFormGroup(this.fields);
    }
    onSubmit() {
        this.payLoad = JSON.stringify(this.form.value);
    }
}
