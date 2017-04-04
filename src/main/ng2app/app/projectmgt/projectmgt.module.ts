import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from '../shared/shared.module'
import { routing } from './projectmgt.routing';

import { ContractmgtComponent } from './contract/contractmgt.component'
import { ContractinfoComponent } from './contract/contractinfo.component'
import { WorkflowModule } from '../workflow/workflow.module'

import { CCComponent } from './contract/contract.custom.component'

@NgModule({
    imports: [
        SharedModule,
        routing,
        WorkflowModule
    ],
    declarations: [
        ContractmgtComponent,
        ContractinfoComponent,
        CCComponent,
    ],
    exports: [

    ],
    providers: [],
    entryComponents: [
        CCComponent,
    ]
})
export class ProjectmgtModule {
}