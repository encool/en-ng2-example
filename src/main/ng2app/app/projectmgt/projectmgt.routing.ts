import { ModuleWithProviders } from '@angular/core'
import { RouterModule } from '@angular/router'

import { ContractmgtComponent } from './contract/contractmgt.component'
import { ContractinfoComponent } from './contract/contractinfo.component'
import { CCComponent } from './contract/contract.custom.component'

export const routing: ModuleWithProviders = RouterModule.forChild([
    { path: 'contractmgt', component: ContractmgtComponent },
    { path: 'contractform', component: ContractinfoComponent },
    { path: 'test', component: CCComponent },
]);