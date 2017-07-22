import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from '../shared/shared.module'
// import { BpmnEditorComponent } from './bpmn2/bpmn-editor.component'

// import { ProcessDefinitionComponent } from './process-def-manage/process-definition.component'
// import { ProcessModelInfoComponent } from './process-def-manage/process-model-info.component'
// import { ProductManageComponent } from './serviceproduct/product-manage.component'
// import { ProductInfoComponent } from './serviceproduct/product-info.component'
// import { ProcessConfigComponent } from './config/process-config.component'
// import { FieldManageComponent } from './form/field-manage.component'
// import { FieldEditComponent } from './form/field-edit.component'
// import { FormManageComponent } from './form/form-manage.component'
// import { FormEditComponent } from './form/form-edit.component'
// import { RelEditComponent } from './form/rel-edit.component'
// import { RelAddComponent } from './form/rel-add.component'
// import { UsertaskDoComponent } from './process/usertask-do.component'
// import { UsertaskDoCommonComponent } from './process/usertask-do-common.component'
// import { TaskFormComponent } from './process/task-form.component'
// import { ServiceproductEntryComponent } from './entry/serviceproduct-entry.component'
// import { FormConfigComponent } from './config/form-config.component'
// import { ActivityConfigComponent } from './config/activity-config.component'
// import { ChooseCandidateComponent } from './config/choose-candidate.component'
import { TodoComponent } from './process/todo.component'
// import { BpmnViewerComponent } from './bpmn2/bpmn-viewer.component'
// import { BpmnMonitorComponent } from './bpmn2/bpmn-monitor.component'
// import { TemplateMgtComponent } from './template/template-mgt.component'
// import { TemplateInfoComponent } from './template/template-info.component'
// import { WftitleComponent } from './template/wftitle.component'
// import { AuditinfoComponent } from './template/auditinfo.component'
// import { CustomComponent } from './template/custom.component'

// import { routing } from './workflow.routing';

// import { WorkflowService } from './service/workflow.service'
// import { WorkprocessService } from './service/workprocess.service'

@NgModule({
    imports: [
        SharedModule,
        // routing
    ],
    declarations: [
        // ProcessDefinitionComponent,
        // ProcessModelInfoComponent,
        // ProductManageComponent,
        // ProductInfoComponent,
        // ProcessConfigComponent,
        // FieldManageComponent,
        // FieldEditComponent,
        // FormManageComponent,
        // FormEditComponent,
        // RelEditComponent,
        // RelAddComponent,
        // UsertaskDoComponent,
        // TaskFormComponent,
        // ServiceproductEntryComponent,
        // BpmnEditorComponent,
        // FormConfigComponent,
        // ActivityConfigComponent,
        // ChooseCandidateComponent,
        TodoComponent,
        // BpmnViewerComponent,
        // TemplateMgtComponent,
        // TemplateInfoComponent,
        // WftitleComponent,
        // BpmnMonitorComponent,
        // AuditinfoComponent,
        // CustomComponent,
        // UsertaskDoCommonComponent,
    ],
    exports: [
        // BpmnEditorComponent,
        // BpmnViewerComponent,
        // UsertaskDoComponent,
    ],
    providers: [
        // WorkflowService,
        // WorkprocessService
    ],
    entryComponents: [
        // ProcessModelInfoComponent,
        // BpmnEditorComponent,
        // ProductInfoComponent,
        // FieldEditComponent,
        // FormEditComponent,
        // RelAddComponent,
        // RelEditComponent,
        // FormConfigComponent,
        // ActivityConfigComponent,
        // ChooseCandidateComponent,
        // BpmnViewerComponent,
        // TemplateInfoComponent,
        // WftitleComponent,
        // BpmnMonitorComponent,
        // AuditinfoComponent,
        // CustomComponent,
    ]
})
export class WorkflowModule {
}