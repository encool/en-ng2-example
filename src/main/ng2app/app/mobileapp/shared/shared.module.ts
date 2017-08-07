import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk';
import {
  MdAutocompleteModule, MdButtonModule, MdButtonToggleModule, MdPaginatorModule,
  MdCardModule, MdCheckboxModule, MdChipsModule, MdDatepickerModule,
  MdDialogModule, MdGridListModule, MdIconModule, MdInputModule,
  MdListModule, MdMenuModule, MdProgressBarModule, MdProgressSpinnerModule,
  MdRadioModule, MdSelectModule, MdSidenavModule, MdSliderModule, MdSortModule,
  MdSlideToggleModule, MdSnackBarModule, MdTableModule, MdTabsModule, MdToolbarModule,
  MdTooltipModule
} from '@angular/material';
// import { FlexLayoutModule } from '@angular/flex-layout'

import { CommonsharedModule } from '../../commonshared/commonshared.module'

import { SideNavContainerComponent } from './container/sidenav-container.component'
import { DynamicfieldMComponent } from './form/dynamic-field-m.component'
import { DynamicFormMComponent } from './form/dynamic-form-m.component'

import { TextInputComponent } from './form/textinput/textinput.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonsharedModule,
    CdkTableModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdSelectModule,
    MdSlideToggleModule,
    MdSliderModule,
    MdSidenavModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    MdPaginatorModule,
    MdSortModule,
    MdTableModule,
    // FlexLayoutModule,
  ],
  declarations: [
    SideNavContainerComponent,
    DynamicfieldMComponent,
    DynamicFormMComponent,
    TextInputComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonsharedModule,
    CdkTableModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdSelectModule,
    MdSlideToggleModule,
    MdSliderModule,
    MdSidenavModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    MdPaginatorModule,
    MdSortModule,
    MdTableModule,
    // FlexLayoutModule,
    SideNavContainerComponent,

    DynamicfieldMComponent,
    DynamicFormMComponent,
    TextInputComponent,
  ],
  entryComponents: [
    TextInputComponent,
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
