import { Injectable } from '@angular/core';
import { Menu } from '../object/menu';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MenuService {
    private menusUrl = 'cs/getmenubypermission';
    constructor(private http: Http) { }
    // Menus: Menu[] = [
    //     { id: 11, i: "fa fa-menu", t: "一级菜单" },
    //     { id: 12, i: "fa fa-menu", t: "一级菜单2" }
    // ];
    getMenus() {
        return this.http.get(this.menusUrl)
            .toPromise()
            .then(function(response) {
                console.log("response", response.json());
                return response.json();
            })
            .catch(this.handleError);
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
} 