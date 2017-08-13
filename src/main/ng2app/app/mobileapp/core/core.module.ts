import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms'

import { MD_ERROR_GLOBAL_OPTIONS } from '@angular/material'

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
        { provide: MD_ERROR_GLOBAL_OPTIONS, useValue: { errorStateMatcher: myErrorStateMatcher } }
    ],
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}

function myErrorStateMatcher(control: FormControl, form: FormGroupDirective | NgForm): boolean {
    // Error when invalid control is dirty, touched, or submitted
    // debugger
    // const isSubmitted = form && form.submitted;
    // return !!(control.invalid && (control.dirty || control.touched || isSubmitted))

    // const touched = form && form.;
    // console.log('touched', touched);

    return !!(control.invalid)
}
