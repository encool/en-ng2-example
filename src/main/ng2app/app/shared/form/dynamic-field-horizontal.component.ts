import {
    Component, Type, Input, OnInit, ViewChild,
    AfterViewInit, SimpleChange, ViewContainerRef,
    ComponentFactoryResolver, ComponentRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldBase } from '../../commonshared/form/field-base';
import { DropdownField } from '../../commonshared/form/dropdown-field'

import { uimap } from '../../commonshared/decorators/ui-component.decorator'

// <f-text - input * ngSwitchCase="'textinput'"[simple] = "false"[form] = "form"[field] = "field"[model] = "model" > </f-text-input>
// <f-dropdown - input * ngSwitchCase="'dropdowninput'"[simple] = "false"[form] = "form"[field] = "field"[model] = "model" > </f-dropdown-input>
// <df-field - group - hori * ngSwitchCase="'fieldgroup'"[form] = "form"[field] = "field"[model] = "model" > </df-field-group-hori>
// <f-datetime - pick * ngSwitchCase="'datetimepick'"[simple] = "false"[form] = "form"[field] = "field"[model] = "model" > </f-datetime-pick>
// <f-select2 * ngSwitchCase="'select2'"[simple] = "false"[form] = "form"[field] = "field"[model] = "model" > </f-select2>
// <f-checkbox - input * ngSwitchCase="'checkbox'"[simple] = "false"[form] = "form"[field] = "field"[model] = "model" > </f-checkbox-input>
// <f-textarea * ngSwitchCase="'textarea'"[simple] = "false"[form] = "form"[field] = "field"[model] = "model" > </f-textarea>
// <f-radio - group * ngSwitchCase="'radiogroup'"[simple] = "false"[form] = "form"[field] = "field"[model] = "model" > </f-radio-group>
// <f-file - upload * ngSwitchCase="'fileupload'"[simple] = "false"[form] = "form"[field] = "field"[model] = "model" > </f-file-upload>


@Component({
    selector: 'df-field-hori',
    template: `
    <div #wrapper *ngFor="let field of fields" [ngSwitch]="field.controlType">
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
                this.fields.forEach((field) => {
                    // debugger
                    let comp: Type<any> = uimap.get(field.selector)
                    //没有找到对应的模板
                    if (!comp) {
                        comp = uimap.get("wf-custom")
                    }
                    let myComponentFactory
                    try {
                        myComponentFactory
                            = this.componentFactoryResolver.resolveComponentFactory(comp)

                    } catch (error) {//业务模块的模板解析不出来
                        comp = uimap.get("wf-custom")
                        myComponentFactory
                            = this.componentFactoryResolver.resolveComponentFactory(comp)
                    }
                    let cmpRef: ComponentRef<any>

                    //直接插到最后面 外面排好序再进来
                    cmpRef = this.wrapperRef.createComponent(myComponentFactory)
                    cmpRef.instance.simple = false
                    cmpRef.instance.form = this.form
                    cmpRef.instance.field = field
                })
                // let value = this.form.value
                // console.log("form object after fields attach",this.form.controls)
                // console.log("fields attach formvalue-->", value)
                // this.form.patchValue(value)
            });
        }
    }

    // getCustomTemplateFields(): FieldBase<any>[] {
    //     let cstmTpltfields: FieldBase<any>[] = new Array<FieldBase<any>>()
    //     this.fields.forEach((field) => {
    //         if (field.controlType == "customtemplate") {
    //             cstmTpltfields.push(field)
    //         }
    //     })
    //     return cstmTpltfields
    // }
}