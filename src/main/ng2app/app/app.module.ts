import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopnavComponent } from './topnav.component';
import { MenusidebarComponent } from './menusidebar.component'
import { IndexComponent } from './index.component'

import { AppRoutingModule } from './app.routing';

import { SecurityService } from './service/security.service'
import { UserService } from './service/user.service'
import { JobService } from './service/job.service'
import { MenuService } from './service/menu.service'
import { OrgService } from './service/org.service'

import { SharedModule } from './shared/shared.module'

import { ModalService } from './service/modal.service'
import { DictdataService } from './service/dictdata.service'
import { ResourceDirective } from './service/resource.directive'

import { BreadcrumbmenuGuard } from './breadcrumbmenu-guard.service'

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
    AppRoutingModule,
    SharedModule.forRoot(),
    // BreadcrumbmenuGuard,
    // SysmanageModule,
    // WorkflowModule,
    // ModalModule.forRoot(),
    // BootstrapModalModule
  ],
  declarations: [
    AppComponent, TopnavComponent, MenusidebarComponent,
    IndexComponent,
    ResourceDirective,
  ],

  bootstrap: [AppComponent],
  providers: [
    BreadcrumbmenuGuard,
    MenuService,
    OrgService,
    JobService,
    ModalService,
    UserService,
    { provide: 'Window', useValue: window },
    SecurityService,
    DictdataService,
  ]
})
export class AppModule { }
