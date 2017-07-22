import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SideNavContainerComponent } from './container/sidenav-container.component'

import {
  MdToolbarModule, MdProgressBarModule, MdButtonModule, MdSidenavModule, MdIconModule,
  MdMenuModule, MdListModule,
} from '@angular/material';
// import { MdProgressBar } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdProgressBarModule,
    MdToolbarModule,
    MdProgressBarModule,
    MdSidenavModule,
    MdButtonModule,
    MdMenuModule,
    MdListModule,
  ],
  declarations: [
    SideNavContainerComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdProgressBarModule,
    MdToolbarModule,
    MdProgressBarModule,
    MdSidenavModule,
    MdButtonModule,
    MdMenuModule,
    MdListModule,
    SideNavContainerComponent,
  ],
  entryComponents: [

  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      // providers: [FieldDataService]
    };
  }
}
