import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { CoreComponent } from './.component';

import { MenuService } from './menu/menu.service'
import { BreadcrumbmenuGuard } from './breadcrumbmenu-guard.service';
import { WorkflowService } from './workflow/workflow.service'
import { WorkprocessService } from './workflow/workprocess.service'
import { PageService } from './page/page.service'

import { throwIfAlreadyLoaded } from './module-import-guard';


@NgModule({
    imports: [CommonModule],
    exports: [],
    // declarations: [CoreComponent],
    providers: [
        BreadcrumbmenuGuard,
        MenuService,
        WorkflowService,
        WorkprocessService,
        PageService,
    ],
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
