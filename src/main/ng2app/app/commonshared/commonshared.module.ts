import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout'

import { MydivComponent } from './layout/mydiv.component'
import { MyrowComponent } from './layout/myrow.component'
import { ContainerComponent } from './layout/container.component'
import { MycolComponent } from './layout/mycol.component'
import { MyformComponent } from './layout/myform.component'

import { CustomComponent } from './form/custom.component'
import { CustomMComponent } from './form/custom-m.component'

import { EnFlexDirective } from './layout/flex/en-flex'

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
    ],
    declarations: [
        MydivComponent,
        MyrowComponent,
        ContainerComponent,
        MycolComponent,
        MyformComponent,
        CustomComponent,
        CustomMComponent,
        EnFlexDirective,
    ],
    exports: [
        MydivComponent,
        MyrowComponent,
        ContainerComponent,
        MycolComponent,
        MyformComponent,
        CustomComponent,
        CustomMComponent,
        FlexLayoutModule,
        EnFlexDirective,
    ],
    entryComponents: [
        CustomComponent,
        CustomMComponent,
    ]
})
export class CommonsharedModule { }