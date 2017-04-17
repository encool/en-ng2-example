import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { PanelComponent } from './component/panel.component'
import { ZtreeComponent } from './component/ztree.component'
import { JqgridComponent } from './component/jqgrid.component'

import { ContainerComponent } from './layout/container.component'
import { MycolComponent } from './layout/mycol.component'
import { MyrowComponent } from './layout/myrow.component'
import { MydivComponent } from './layout/mydiv.component'
import { TabsComponent } from './form/widget/tabs.component'
import { TabpanelComponent } from './form/widget/tabpanel.component'

import { SimpleModalComponent } from './component/simple-modal.component'

import { DynamicFormComponent } from './form/dynamic-form.component'
import { DynamicFormfieldComponent } from './form/dynamic-field.component'
import { DynamicFormHorizontalComponent } from './form/dynamic-form-horizontal.component'
import { DynamicfieldHorizontalComponent } from './form/dynamic-field-horizontal.component'
import { FieldGroupHoriComponent } from './form/field-group-hori.component'
import { DropdownComponent } from './form/dropdown.component'
import { CheckboxComponent } from './form/widget/checkbox.component'
import { TextComponent } from './form/widget/text.component'
import { RadioGroupComponent } from './form/widget/radio-group.component'
import { CheckboxGroupComponent } from './form/widget/checkbox-group.component'
import { KeysPipe } from './pipes/keys.pipe'
import { MyformComponent } from './layout/myform.component'
import { DatetimePickComponent } from './form/widget/datetime-pick.component'
import { TextareaComponent } from './form/widget/textarea.component'
import { Select2Component } from './form/widget/select2.component'
import { FileUploadComponent } from './form/widget/file-upload.component'
import { EchartsComponent } from './component/echarts.component'

import { FieldDataService } from './form/field-data.service'
@NgModule({
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PanelComponent,
    ZtreeComponent,
    MyrowComponent,
    MycolComponent,
    ContainerComponent,
    DynamicFormComponent,
    DynamicFormfieldComponent,
    DynamicFormHorizontalComponent,
    DynamicfieldHorizontalComponent,
    FieldGroupHoriComponent,
    JqgridComponent,
    // BpmnEditorComponent,
    TabsComponent,
    TabpanelComponent,
    MydivComponent,
    SimpleModalComponent,
    DropdownComponent,
    CheckboxComponent,
    CheckboxGroupComponent,
    TextComponent,
    RadioGroupComponent,
    KeysPipe,
    MyformComponent,
    DatetimePickComponent,
    TextareaComponent,
    Select2Component,
    FileUploadComponent,
    EchartsComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PanelComponent,
    ZtreeComponent,
    MyrowComponent,
    MycolComponent,
    ContainerComponent,
    DynamicFormComponent,
    DynamicFormfieldComponent,
    DynamicFormHorizontalComponent,
    DynamicfieldHorizontalComponent,
    JqgridComponent,
    // BpmnEditorComponent, 
    TabsComponent,
    TabpanelComponent,
    MydivComponent,
    DropdownComponent,
    CheckboxComponent,
    TextComponent,
    RadioGroupComponent,
    KeysPipe,
    MyformComponent,
    DatetimePickComponent,
    TextareaComponent,
    Select2Component,
    FileUploadComponent,
    EchartsComponent,
  ],
  entryComponents: [
    SimpleModalComponent,
    TextComponent,
    DropdownComponent,
    FieldGroupHoriComponent,
    DatetimePickComponent,
    Select2Component,
    CheckboxComponent,
    TextareaComponent,
    CheckboxGroupComponent,
    RadioGroupComponent,
    FileUploadComponent,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [FieldDataService]
    };
  }
}
