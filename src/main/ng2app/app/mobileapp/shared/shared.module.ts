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
  MdTooltipModule, MdNativeDateModule,
} from '@angular/material';
// import { FlexLayoutModule } from '@angular/flex-layout'

import { CommonsharedModule } from '../../commonshared/commonshared.module'

import { SideNavContainerComponent } from './container/sidenav-container.component'
import { DynamicfieldMComponent } from './form/dynamic-field-m.component'
import { DynamicFormMComponent } from './form/dynamic-form-m.component'

import { TextInputComponent } from './form/textinput/textinput.component'
import { TextareaComponent } from './form/textinput/textarea.component'

import { SelectComponent } from './form/select/select.component'
import { DatepickerComponent } from './form/datepicker/datepicker.component'
import { CheckBoxComponent } from './form/checkbox/checkbox.component'

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
    MdNativeDateModule,
    // FlexLayoutModule,
  ],
  declarations: [
    SideNavContainerComponent,
    DynamicfieldMComponent,
    DynamicFormMComponent,
    TextInputComponent,
    SelectComponent,
    DatepickerComponent,
    CheckBoxComponent,
    TextareaComponent,
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
    TextareaComponent,
    SelectComponent,
    DatepickerComponent,
    CheckBoxComponent,
  ],
  entryComponents: [
    TextInputComponent,
    SelectComponent,
    DatepickerComponent,
    CheckBoxComponent,
    TextareaComponent,
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
