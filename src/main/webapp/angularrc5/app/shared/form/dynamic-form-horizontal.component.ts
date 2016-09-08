import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { FieldBase }              from './field-base';
import { FieldControlService }    from './field-control.service';
@Component({
    moduleId:module.id,
    selector: 'dynamic-form-hori',
    templateUrl: 'dynamic-form-horizontal.component.html',
    providers: [ FieldControlService ]
})
export class DynamicFormHorizontalComponent implements OnInit {
    @Input() fields: FieldBase<any>[] = [];
    @Input() model:any = {};
    form: FormGroup;
    payLoad = '';
    constructor(private fcs: FieldControlService) {  
        
    }
    ngOnInit() {
        this.fields = _.sortBy(this.fields,"order");
        this.form = this.fcs.toFormGroup(this.fields);
    }
    onSubmit() {
        this.payLoad = JSON.stringify(this.form.value);
    }
}
