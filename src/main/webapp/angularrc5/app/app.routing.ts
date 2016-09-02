import { Routes, RouterModule } from '@angular/router';
// import { ResourcemanageComponent } from './sysmanage/resourcemanage.component';
// import { UserorgManageComponent } from './sysmanage/userorg-manage.component'

const appRoutes: Routes = [
    // {
    //     path: 'resourcemanage',
    //     component: ResourcemanageComponent,
    //     data: {
    //         title: '权限资源管理'
    //     }
    // },
    // {
    //     path: 'userorgmanage',
    //     component: UserorgManageComponent,
    //     data: {
    //         title: '机构用户管理'
    //     }
    // }
    { path: '', redirectTo: 'userorgmanage', pathMatch: 'full'},
];
export const appRoutingProviders: any[] = [

];
export const routing = RouterModule.forRoot(appRoutes);

