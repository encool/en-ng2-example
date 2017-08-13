import { Input, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

import { UIComponent } from '../../../../commonshared//decorators/ui-component.decorator'

@UIComponent({
    selector: 'm-text-input',
    component: AutocompleteComponent
})
@Component({
    selector: 'm-text-input',
    template:
    `
        <md-input-container [eNfxFlex]="eNfxFlex" [eNfxFlex.xs]="eNfxFlexXs" fxShrink="1" fxGrow="0" style="width:100%">
          <input mdInput [type]="field.params.inputType" [placeholder]="field.label" [formControl]="formControl">
        </md-input-container>      
  
    `
})
export class AutocompleteComponent implements OnInit {

    @Input() field: any;
    @Input() form: FormGroup;

    span: number = 12

    eNfxFlex: string
    eNfxFlexXs: string

    formControl: AbstractControl
    constructor() { }

    ngOnInit() {
        this.formControl = this.form.get(this.field.key)
        this.span = this.field.span == undefined ? 4 : this.field.span
        this.eNfxFlex = "calc(" + (this.span / 12) * 100 + "% - 15px)"
        // this.eNfxFlexXs = "calc(100% - 15px)"
        this.eNfxFlexXs = "100%"
        // debugger
    }

}