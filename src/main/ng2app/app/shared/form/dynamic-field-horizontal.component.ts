import {
    Component, Type, Input, OnInit, ViewChild,
    AfterViewInit, SimpleChange, ViewContainerRef,
    ComponentFactoryResolver
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldBase } from './field-base';
import { DropdownField } from './dropdown-field'

import { uimap } from '../../decorators/ui-component.decorator'
@Component({
    selector: 'df-field-hori',
    template: `
    <div #wrapper *ngFor="let field of fields" [ngSwitch]="field.controlType">
    	<f-dropdown-input *ngSwitchCase="'dropdowninput'" [simple]="false" [form]="form" [field]="field" [model]="model"></f-dropdown-input>
    	<f-text-input *ngSwitchCase="'textinput'" [simple]="false" [form]="form" [field]="field" [model]="model"></f-text-input>
    	<f-datetime-pick *ngSwitchCase="'datetimepick'" [simple]="false" [form]="form" [field]="field" [model]="model"></f-datetime-pick>
    	<f-textarea *ngSwitchCase="'textarea'" [simple]="false" [form]="form" [field]="field" [model]="model"></f-textarea>
    	<f-select2 *ngSwitchCase="'select2'" [simple]="false" [form]="form" [field]="field" [model]="model"></f-select2>
    	<f-checkbox-input *ngSwitchCase="'checkbox'" [simple]="false" [form]="form" [field]="field" [model]="model"></f-checkbox-input>
    	<f-file-upload *ngSwitchCase="'fileupload'" [simple]="false" [form]="form" [field]="field" [model]="model"></f-file-upload>
    	<f-radio-group *ngSwitchCase="'radiogroup'" [simple]="false" [form]="form" [field]="field" [model]="model"></f-radio-group>
    	<df-field-group-hori *ngSwitchCase="'fieldgroup'" [form]="form" [field]="field" [model]="model"></df-field-group-hori>
    </div>    
    `
})
export class DynamicfieldHorizontalComponent implements OnInit, AfterViewInit {
    @Input() fields: FieldBase<any>[];
    @Input() form: FormGroup;
    @Input() model: any;


    @ViewChild('wrapper', { read: ViewContainerRef }) wrapperRef: ViewContainerRef;

    _tipmsg: string = "必填项";

    constructor(private vcRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver, ) {

    }
    ngOnInit() {

    }

    ngAfterViewInit() {

    }

    ngAfterViewChecked() {

    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['fields'] && changes['fields'].currentValue) {
            setTimeout(() => {
                debugger
                let cstmTpltfields: FieldBase<any>[] = this.getCustomTemplateFields()
                cstmTpltfields.forEach((field) => {
                    debugger
                    let comp: Type<any> = uimap.get("contract-custom")
                    let myComponentFactory
                        = this.componentFactoryResolver.resolveComponentFactory(comp)
                    this.wrapperRef.createComponent(myComponentFactory,0)
                })
                uimap
            });
        }
    }

    getCustomTemplateFields(): FieldBase<any>[] {
        let cstmTpltfields: FieldBase<any>[] = new Array<FieldBase<any>>()
        this.fields.forEach((field) => {
            if (field.controlType == "customtemplate") {
                cstmTpltfields.push(field)
            }
        })
        return cstmTpltfields
    }
}