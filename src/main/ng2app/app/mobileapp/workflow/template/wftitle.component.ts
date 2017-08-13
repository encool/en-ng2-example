import { Component, OnInit, Input } from '@angular/core';
import { UIComponent } from '../../../commonshared//decorators/ui-component.decorator'

@UIComponent({
    selector: 'wf-title',
    component: WftitleComponent
})
@Component({
    selector: 'wf-title',
    template: `
    <div [eNfxFlex]="eNfxFlex" [eNfxFlex.xs]="eNfxFlexXs">
        <h3 style="text-align: center">{{title}}</h3>
    </div>    
    `
})
export class WftitleComponent implements OnInit {
    @Input() field: any
    span: number = 12
    title: string

    eNfxFlex: string
    eNfxFlexXs: string

    constructor() { }

    ngOnInit() {
        this.span = this.field.displaySpan == undefined ? 12 : this.field.displaySpan
        this.title = this.field.params.remark1 == undefined ? "属性1标题" : this.field.params.remark1

        this.eNfxFlex = "calc(" + (this.span / 12) * 100 + "% - 15px)"
        // this.eNfxFlexXs = "calc(100% - 15px)"
        this.eNfxFlexXs = "100%"
    }

}