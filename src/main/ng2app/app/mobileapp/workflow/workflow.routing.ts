import { ModuleWithProviders } from '@angular/core'
import { RouterModule } from '@angular/router'

// import { ProcessDefinitionComponent } from './process-def-manage/process-definition.component'
// import { ProductManageComponent } from './serviceproduct/product-manage.component'
// import { ProcessConfigComponent } from './config/process-config.component'
// import { FieldManageComponent } from './form/field-manage.component'
// import { FormManageComponent } from './form/form-manage.component'
// import { UsertaskDoCommonComponent } from './process/usertask-do-common.component'
// import { ServiceproductEntryComponent } from './entry/serviceproduct-entry.component'
import { TodoComponent } from './process/todo.component'
// import { TemplateMgtComponent } from './template/template-mgt.component'

export const routing: ModuleWithProviders = RouterModule.forChild([
  // { path: 'processdef', component: ProcessDefinitionComponent },
  // { path: 'spmgnt', component: ProductManageComponent },
  // { path: 'processconfig', component: ProcessConfigComponent },
  // { path: 'fieldmanage', component: FieldManageComponent },
  // { path: 'formmanage', component: FormManageComponent },
  // { path: 'usertaskdo', component: UsertaskDoCommonComponent },
  // { path: 'serviceproductentry', component: ServiceproductEntryComponent },
  { path: 'tasktodo', component: TodoComponent },
  // { path: 'templatemgt', component: TemplateMgtComponent },
]);