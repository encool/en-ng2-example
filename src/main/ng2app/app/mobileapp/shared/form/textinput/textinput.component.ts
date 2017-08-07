import { Input, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

import { UIComponent } from '../../../../commonshared//decorators/ui-component.decorator'

@UIComponent({
    selector: 'm-text-input',
    component: TextInputComponent
})
@Component({
    selector: 'm-text-input',
    template:
    `
        <md-input-container [eNfxFlex]="eNfxFlex" [eNfxFlex.xs]="eNfxFlexXs" fxShrink="1" fxGrow="1" style="width:100%">
          <input mdInput [type]="field.params.inputType" [placeholder]="field.label" [formControl]="formControl">
        </md-input-container>      
  
    `
})
export class TextInputComponent implements OnInit {

    @Input() field: any;
    @Input() form: FormGroup;

    span: number = 12

    eNfxFlex: string
    eNfxFlexXs: string

    formControl: AbstractControl
    constructor() { }

    ngOnInit() {
        this.formControl = this.form.get(this.field.key)
        this.span = this.field.displaySpan == undefined ? 12 : this.field.displaySpan
        this.eNfxFlex = "calc(" + (this.span / 12) * 100 + "% - 15px)"
        // this.eNfxFlexXs = "calc(100% - 15px)"
        this.eNfxFlexXs = "100%"
        // debugger
    }

}