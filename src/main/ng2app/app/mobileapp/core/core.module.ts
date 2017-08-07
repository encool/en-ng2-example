import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule as cm } from '../../core/core.module';
import { SharedModule } from '../shared/shared.module'

import { PageNotFoundComponent } from './page-not-found.component'

import { MenuService } from '../../core/menu/menu.service'
import { SecurityService } from '../../core/security/security.service'

import { BreadcrumbmenuGuard } from '../../core/breadcrumbmenu-guard.service';

import { throwIfAlreadyLoaded } from '../../core/module-import-guard';


@NgModule({
    imports: [
        CommonModule,
        cm,
        SharedModule.forRoot(),
    ],
    declarations: [
        PageNotFoundComponent
    ],
    exports: [
        cm,
        PageNotFoundComponent,
    ],
    providers: [
        BreadcrumbmenuGuard,
        MenuService,
        SecurityService,
    ],
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
