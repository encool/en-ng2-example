import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
// import { TopnavComponent } from './core/topnav/topnav.component';
// import { MenusidebarComponent } from './core/sidebar/menusidebar.component'
// import { IndexComponent } from './index.component'

import { AppRoutingModule } from './app.routing';

import { SecurityService } from '../core/security/security.service'
import { UserService } from '../service/user.service'
import { JobService } from '../service/job.service'
// import { MenuService } from '../service/menu.service'
import { OrgService } from '../service/org.service'

import { SharedModule } from './shared/shared.module'

import { ModalService } from '../service/modal.service'
import { DictdataService } from '../service/dictdata.service'
import { ResourceDirective } from '../service/resource.directive'
import { UtilService } from '../service/util.service'

import { TodoComponent } from './workflow/process/todo.component'

// import { BreadcrumbmenuGuard } from '../core'

import { CoreModule } from './core/core.module'
import { WorkflowModule } from './workflow/workflow.module'

// import { ModalModule } from 'angular2-modal';
// import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    // AppRoutingModule,
    RouterModule.forRoot([
      {
        path: 'd',
        component: TodoComponent
      }
    ]),
    SharedModule.forRoot(),
    CoreModule,
    WorkflowModule
    // BreadcrumbmenuGuard,
    // SysmanageModule,
    // WorkflowModule,
    // ModalModule.forRoot(),
    // BootstrapModalModule
  ],
  declarations: [
    AppComponent,
    // TopnavComponent, 
    // MenusidebarComponent,
    // IndexComponent,
    ResourceDirective,
  ],

  bootstrap: [AppComponent],
  providers: [
    // BreadcrumbmenuGuard,
    // MenuService,
    OrgService,
    JobService,
    ModalService,
    UserService,
    { provide: 'Window', useValue: window },
    // SecurityService,
    DictdataService,
    UtilService,
  ]
})
export class AppModule { }
