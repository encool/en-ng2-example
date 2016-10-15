import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { PanelComponent } from './component/panel.component'
import { ZtreeComponent } from './component/ztree.component'
import { MyModalComponent } from './component/my-modal.component'
import { JqgridComponent } from './component/jqgrid.component'

import { ContainerComponent } from './layout/container.component'
import { MycolComponent } from './layout/mycol.component'
import { MyrowComponent } from './layout/myrow.component'
import { MydivComponent } from './layout/mydiv.component'
import { TabsComponent } from './form/widget/tabs.component'
import { TabpanelComponent } from './form/widget/tabpanel.component'

import { SimpleModalComponent } from './component/simple-modal.component'

import { DynamicFormComponent } from './form/dynamic-form.component'
import { DynamicFormfieldComponent } from './form/dynamic-form-field.component'
import { DynamicFormHorizontalComponent } from './form/dynamic-form-horizontal.component'
import { DynamicfieldHorizontalComponent } from './form/dynamic-field-horizontal.component'

import { BpmnEditorComponent } from './component/bpmn-editor.component'

import { FieldDataService } from './form/field-data.service'
@NgModule({
    imports:      [ CommonModule, 
                    FormsModule,
                    ReactiveFormsModule,
    ],
    declarations: [  
                    PanelComponent,
                    ZtreeComponent,
                    MyrowComponent,
                    MycolComponent,
                    ContainerComponent,
                    MyModalComponent,
                    DynamicFormComponent,
                    DynamicFormfieldComponent,
                    DynamicFormHorizontalComponent,
                    DynamicfieldHorizontalComponent,
                    JqgridComponent,
                    BpmnEditorComponent,
                    TabsComponent,
                    TabpanelComponent,
                    MydivComponent,
                    SimpleModalComponent
    ],
    exports:      [ 
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    PanelComponent,
                    ZtreeComponent,
                    MyrowComponent,
                    MycolComponent,
                    ContainerComponent,
                    MyModalComponent,
                    DynamicFormComponent,
                    DynamicFormfieldComponent,
                    DynamicFormHorizontalComponent,
                    DynamicfieldHorizontalComponent,                    
                    JqgridComponent,
                    BpmnEditorComponent,
                    TabsComponent,
                    TabpanelComponent,
                    MydivComponent
    ],
    entryComponents: [SimpleModalComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [FieldDataService]
    };
  }
}
