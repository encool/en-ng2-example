import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { TodoComponent } from './workflow/process/todo.component'

@NgModule({
    imports: [RouterModule.forRoot([
        {
            path: '',
            // canActivate: [BreadcrumbmenuGuard],
            // canActivateChild: [BreadcrumbmenuGuard],
            children: [
                { path: '', redirectTo: '/index', pathMatch: 'full' },
                { path: 'index', component: TodoComponent },
                // {
                //     path: 'sysmgt', loadChildren: sysmgtChildren
                // },
                // {
                //     path: 'workflow', loadChildren: workflowChildren
                // },
                // {
                //     path: 'project', loadChildren: projectChildren
                // },
            ],
        },

    ])],
    exports: [RouterModule]
})
export class AppRoutingModule { }

