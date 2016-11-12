import { Component } from '@angular/core';
import { SecurityService } from './service/security.service'

@Component({
    selector: 'top-nav',
    templateUrl: './topnav.component.html'
})
export class TopnavComponent {

    constructor(private securityService:SecurityService){
        
    }

    logout(){
        this.securityService.logout()
    }

}