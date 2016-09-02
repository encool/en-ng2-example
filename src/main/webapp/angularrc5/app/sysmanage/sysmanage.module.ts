import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from '../shared/shared.module'


import { ResourcemanageComponent } from './resourcemanage.component'
import { MenuinfoComponent } from './menuinfo.component'
import { OrginfoComponent } from './orginfo.component'
import { JobinfoComponent } from './jobinfo.component'
import { UserorgManageComponent } from './userorg-manage.component'

import { routing }            from './sysmanage.routing';

@NgModule({
    imports:      [ 
                   SharedModule,routing
    ],
    declarations: [  
                    ResourcemanageComponent,
                    MenuinfoComponent,
                    OrginfoComponent,
                    JobinfoComponent,
                    UserorgManageComponent
    ],
    exports:      [ 
                    // ResourcemanageComponent,
                    
    ]
})
export class SysmanageModule {
}