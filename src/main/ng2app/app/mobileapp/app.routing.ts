import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { TodoComponent } from './workflow/process/todo.component'
import { PageNotFoundComponent } from './core/page-not-found.component'

export function workflowChildren() {
    return new Promise(function (resolve) {
        (require as any).ensure([], function (require: any) {
            resolve(require('./workflow/workflow.module')['WorkflowModule']);
        });
    })
}

@NgModule({
    imports: [RouterModule.forRoot([
        {
            path: '',
            // canActivate: [BreadcrumbmenuGuard],
            // canActivateChild: [BreadcrumbmenuGuard],
            children: [
                { path: '', redirectTo: '/index', pathMatch: 'full' },
                { path: 'index', component: TodoComponent },
                { path: 'todo', component: TodoComponent },
                // {
                //     path: 'sysmgt', loadChildren: sysmgtChildren
                // },
                {
                    path: 'workflow', loadChildren: workflowChildren as any
                },
                // {
                //     path: 'project', loadChildren: projectChildren
                // },
                { path: '**', component: PageNotFoundComponent }
            ],
        },

    ])],
    exports: [RouterModule]
})
export class AppRouting { }

