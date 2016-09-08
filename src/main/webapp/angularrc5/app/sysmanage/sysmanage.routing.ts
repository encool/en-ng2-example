import { ModuleWithProviders } from '@angular/core'
import { RouterModule }  from '@angular/router'

import { UserorgManageComponent } from './userorg-manage.component'
import { ResourcemanageComponent } from './resourcemanage.component'

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'userorgmanage', component: UserorgManageComponent},
  { path: 'resourcemanage', component: ResourcemanageComponent}
]);