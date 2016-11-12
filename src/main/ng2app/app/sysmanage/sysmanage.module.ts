import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from '../shared/shared.module'

import { UserinfoComponent } from './userinfo.component'

import { ResourcemanageComponent } from './resourcemanage.component'
import { MenuinfoComponent } from './menuinfo.component'
import { OrginfoComponent } from './orginfo.component'
import { JobinfoComponent } from './jobinfo.component'
import { UserorgManageComponent } from './userorg-manage.component'
import { DictdataManageComponent } from './dictdatamanage/dictdata-manage.component'
import { DicttypeEditComponent } from './dictdatamanage/dicttype-edit.component'
import { DictdataEditComponent } from './dictdatamanage/dictdata-edit.component'

import { routing }            from './sysmanage.routing';

@NgModule({
    imports: [
        SharedModule, routing,
    ],
    declarations: [
        DictdataManageComponent,
        ResourcemanageComponent,
        MenuinfoComponent,
        OrginfoComponent,
        JobinfoComponent,
        UserorgManageComponent,
        UserinfoComponent,
        DicttypeEditComponent,
        DictdataEditComponent
    ],
    exports: [
        // ResourcemanageComponent,

    ],
    entryComponents: [UserinfoComponent, OrginfoComponent, MenuinfoComponent, DicttypeEditComponent, DictdataEditComponent, JobinfoComponent]
})
export class SysmanageModule {
}