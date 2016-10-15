import { Routes, RouterModule } from '@angular/router';
// import { ResourcemanageComponent } from './sysmanage/resourcemanage.component';
// import { UserorgManageComponent } from './sysmanage/userorg-manage.component'

const appRoutes: Routes = [
    { path: '', redirectTo: 'userorgmanage', pathMatch: 'full' },
    { path: 'workflow', loadChildren: './dist/assets/js/workflow/workflow.module.js#WorkflowModule' },
    { path: 'sysmgt', loadChildren: './dist/assets/js/sysmanage/sysmanage.module.js#SysmanageModule' },
];
export const appRoutingProviders: any[] = [

];
export const routing = RouterModule.forRoot(appRoutes);

