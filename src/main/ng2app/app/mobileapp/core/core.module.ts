import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule as cm } from '../../core/core.module';

import { MenuService } from '../../core/menu/menu.service'
import { BreadcrumbmenuGuard } from '../../core/breadcrumbmenu-guard.service';

import { throwIfAlreadyLoaded } from '../../core/module-import-guard';


@NgModule({
    imports: [
        CommonModule,
        cm,
    ],
    declarations: [

    ],
    exports: [
        cm,
    ],
    providers: [BreadcrumbmenuGuard, MenuService],
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
