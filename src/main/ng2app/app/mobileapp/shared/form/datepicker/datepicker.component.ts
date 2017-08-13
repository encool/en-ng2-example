import { Input, Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms'
import { UIComponent } from '../../../../commonshared/decorators/ui-component.decorator'

@UIComponent({
    selector: 'm-datepicker',
    component: DatepickerComponent
})
@Component({
    selector: 'm-datepicker',
    template: `
<md-input-container [eNfxFlex]="eNfxFlex" [eNfxFlex.xs]="eNfxFlexXs" fxGrow="0" style="width: 100%;">
  <input mdInput [mdDatepicker]="myDatepicker" [placeholder]="label" [formControl]="formControl">
  <button mdSuffix [mdDatepickerToggle]="myDatepicker"></button>
</md-input-container>
<md-datepicker [touchUi]="touchUi" #myDatepicker></md-datepicker>    

    `
})
export class DatepickerComponent implements OnInit {

    @Input() field: any;
    @Input() form: FormGroup;

    span: number = 12
    label: string
    touchUi: boolean = false

    eNfxFlex: string
    eNfxFlexXs: string
    formControl: AbstractControl

    constructor() { }

    ngOnInit() {
        this.formControl = this.form.get(this.field.key)
        this.span = this.field.span == undefined ? 4 : this.field.span
        this.label = this.field.label
        this.eNfxFlex = "calc(" + (this.span / 12) * 100 + "% - 15px)"
        // this.eNfxFlexXs = "calc(100% - 15px)"
        this.eNfxFlexXs = "100%"
    }

    patchValueToView() {
        // this.model = this.controll.value
    }

    @HostListener('window:resize', ['$event.target.innerWidth'])
    onResize(width) {
        if (width < 720) {
            this.touchUi = true
        } else {
            this.touchUi = false
        }
    }
}