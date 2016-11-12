import { Routes, RouterModule } from '@angular/router';
// import { ResourcemanageComponent } from './sysmanage/resourcemanage.component';
// import { UserorgManageComponent } from './sysmanage/userorg-manage.component'

const appRoutes: Routes = [
    { path: '', redirectTo: 'userorgmanage', pathMatch: 'full' },
    // { path: 'workflow', loadChildren: './dist/assets/js/workflow/workflow.module.js#WorkflowModule' },
    // { path: 'sysmgt', loadChildren: './sysmanage/sysmanage.module.js#SysmanageModule' },
    // { path: 'sysmgt', loadChildren: 'es6-promise!./sysmanage/sysmanage.module#SysmanageModule' },
    // { path: 'sysmgt', loadChildren: loadSubModule },
    {
        path: 'sysmgt', loadChildren: () => new Promise(function (resolve) {
            (require as any).ensure([], function (require: any) {
                resolve(require('./sysmanage/sysmanage.module')['SysmanageModule']);
            });
        })
    },
    {
        path: 'workflow', loadChildren: () => new Promise(function (resolve) {
            (require as any).ensure([], function (require: any) {
                resolve(require('./workflow/workflow.module')['WorkflowModule']);
            });
        })
    },
];
export const appRoutingProviders: any[] = [

];

// export function loadSubModule(): any {
//   // 2-1 Naive loading sub module:
//   // It's synchronous loading
//   // return SubModule;

// //   2-2 Async module load with es6-promise-loader:
// //   You can create submodule's chunk with webpack es6-promise-loader.
// //   However you should switch the module to load with the context:
// //   * JiT:
//   return require("es6-promise!./sysmanage/sysmanage.module")("SysmanageModule");
//   // * AoT:
//   // return require("es6-promise!../sub/sub.module.ngfactory")("SubModuleNgFactory");
// }

export const routing = RouterModule.forRoot(appRoutes);

