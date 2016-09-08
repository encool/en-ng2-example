import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { TopnavComponent } from './topnav.component';
import { MenusidebarComponent } from './menusidebar.component'
import { routing,appRoutingProviders } from './app.routing';

import { SecurityService } from './service/security.service'
import { UserService } from './service/user.service'
import { JobService } from './service/job.service'
import { MenuService } from './service/menu.service'
import { OrgService } from './service/org.service'
import { SharedModule } from './shared/shared.module'
import { SysmanageModule } from './sysmanage/sysmanage.module'

import { ModalService } from './service/modal.service'

// import { ModalModule } from 'angular2-modal';
// import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing,
    SharedModule.forRoot(),
    SysmanageModule,

    // ModalModule.forRoot(),
    // BootstrapModalModule
  ],
  declarations: [ AppComponent ,TopnavComponent,MenusidebarComponent],
  bootstrap:    [ AppComponent ],
  providers:[
      appRoutingProviders,
      MenuService,
      OrgService,
      JobService,
      ModalService,
      UserService,
      { provide: 'Window',  useValue: window },
      SecurityService
  ]
})
export class AppModule { }
