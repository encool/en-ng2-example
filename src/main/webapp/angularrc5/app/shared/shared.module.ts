import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MenuService } from './service/menu.service'

import { PanelComponent } from './component/panel.component'
import { ZtreeComponent } from './component/ztree.component'
import { MyModalComponent } from './component/my-modal.component'
import { JqgridComponent } from './component/jqgrid.component'

import { ContainerComponent } from './layout/container.component'
import { MycolComponent } from './layout/mycol.component'
import { MyrowComponent } from './layout/myrow.component'

import { DynamicFormComponent } from './form/dynamic-form.component'
import { DynamicFormfieldComponent } from './form/dynamic-form-field.component'

import { FieldDataService } from './form/field-data.service'
@NgModule({
    imports:      [ CommonModule, 
                    FormsModule,
                    ReactiveFormsModule
    ],
    declarations: [  
                    PanelComponent,
                    ZtreeComponent,
                    MyrowComponent,
                    MycolComponent,
                    ContainerComponent,
                    MyModalComponent,
                    DynamicFormComponent,
                    DynamicFormfieldComponent,
                    JqgridComponent
    ],
    exports:      [ 
                    CommonModule,
                    FormsModule,
                    PanelComponent,
                    ZtreeComponent,
                    MyrowComponent,
                    MycolComponent,
                    ContainerComponent,
                    MyModalComponent,
                    DynamicFormComponent,
                    DynamicFormfieldComponent,
                    JqgridComponent   
    ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [FieldDataService]
    };
  }
}
