import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { CCComponent } from './contract.custom.component'

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,

    // BreadcrumbmenuGuard,
    // SysmanageModule,
    // WorkflowModule,
    // ModalModule.forRoot(),
    // BootstrapModalModule
  ],
  declarations: [

    CCComponent
  ],

  bootstrap: [CCComponent],
  providers: [

  ]
})
export class AppModule { }
