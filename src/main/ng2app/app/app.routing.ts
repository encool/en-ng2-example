import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index.component'

import { BreadcrumbmenuGuard } from './core'
// import { ResourcemanageComponent } from './sysmanage/resourcemanage.component';
// import { UserorgManageComponent } from './sysmanage/userorg-manage.component'

// const appRoutes: Routes = ;
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

export function sysmgtChildren() {
    return new Promise(function (resolve) {
        (require as any).ensure([], function (require: any) {
            resolve(require('./sysmanage/sysmanage.module')['SysmanageModule']);
        });
    })
}
export function workflowChildren() {
    return new Promise(function (resolve) {
        (require as any).ensure([], function (require: any) {
            resolve(require('./workflow/workflow.module')['WorkflowModule']);
        });
    })
}
export function projectChildren() {
    return new Promise(function (resolve) {
        (require as any).ensure([], function (require: any) {
            resolve(require('./projectmgt/projectmgt.module')['ProjectmgtModule']);
        });
    })
}
@NgModule({
    imports: [RouterModule.forRoot([
        {
            path: '',
            canActivate: [BreadcrumbmenuGuard],
            canActivateChild: [BreadcrumbmenuGuard],
            children: [
                { path: '', redirectTo: '/index', pathMatch: 'full' },
                { path: 'index', component: IndexComponent },
                {
                    path: 'sysmgt', loadChildren: sysmgtChildren as any
                },
                {
                    path: 'workflow', loadChildren: workflowChildren as any
                },
                {
                    path: 'project', loadChildren: projectChildren as any
                },
            ],
        },
    ])],
    exports: [RouterModule]
})
export class AppRoutingModule { }

