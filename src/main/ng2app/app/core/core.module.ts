import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { CoreComponent } from './.component';

import { MenuService } from './menu/menu.service'
import { BreadcrumbmenuGuard } from './breadcrumbmenu-guard.service';

import { throwIfAlreadyLoaded } from './module-import-guard';


@NgModule({
    imports: [CommonModule],
    exports: [],
    // declarations: [CoreComponent],
    providers: [BreadcrumbmenuGuard, MenuService],
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
