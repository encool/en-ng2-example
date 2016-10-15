import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from '../shared/shared.module'
import { BpmnEditorComponent } from '../shared/component/bpmn-editor.component'

import { ProcessDefinitionComponent } from './process-def-manage/process-definition.component'
import { ProcessModelInfoComponent } from './process-def-manage/process-model-info.component'
import { ProductManageComponent } from './serviceproduct/product-manage.component'
import { ProductInfoComponent } from './serviceproduct/product-info.component'
import { ProcessConfigComponent } from './config/process-config.component'
import { FieldManageComponent } from './form/field-manage.component'
import { FieldEditComponent } from './form/field-edit.component'
import { FormManageComponent } from './form/form-manage.component'
import { FormEditComponent } from './form/form-edit.component'
import { RelEditComponent } from './form/rel-edit.component'
import { RelAddComponent } from './form/rel-add.component'
import { UsertaskDoComponent } from './process/usertask-do.component'
import { TaskFormComponent } from './process/task-form.component'
import { ServiceproductEntryComponent } from './entry/serviceproduct-entry.component'

import { TextinputComponent } from './template/textinput.component'

import { routing } from './workflow.routing';

import { WorkflowService } from './service/workflow.service'
import { WorkprocessService } from './service/workprocess.service'

@NgModule({
    imports: [
        SharedModule,
        routing
    ],
    declarations: [
        ProcessDefinitionComponent,
        ProcessModelInfoComponent,
        ProductManageComponent,
        ProductInfoComponent,
        ProcessConfigComponent,
        FieldManageComponent,
        FieldEditComponent,
        FormManageComponent,
        FormEditComponent,
        RelEditComponent,
        RelAddComponent,
        UsertaskDoComponent,
        TaskFormComponent,
        TextinputComponent,
        ServiceproductEntryComponent,
    ],
    exports: [

    ],
    providers: [WorkflowService, WorkprocessService],
    entryComponents: [ProcessModelInfoComponent, BpmnEditorComponent, ProductInfoComponent, FieldEditComponent, FormEditComponent, RelAddComponent, RelEditComponent]
})
export class WorkflowModule {
}