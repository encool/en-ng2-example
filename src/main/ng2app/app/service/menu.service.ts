import { Injectable } from '@angular/core';
import { Menu } from '../object/menu';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class MenuService {
    private _menusUrl = 'menu/getmenubypermission';
    private _getmenubymenucodeUrl = "menu/getmenubymenucode";
    private _getmenubymenuidUrl = "menu/getmenubymenuid";
    private _updatemenuUrl = "menu/update"
    private _createmenuUrl = "menu/create"
    private _deleteMenusURL = "menu/deletebypks"
    constructor(private http: Http) { }
    // Menus: Menu[] = [
    //     { id: '11', i: "fa fa-menu", t: "一级菜单" },
    //     { id: '12', i: "fa fa-menu", t: "一级菜单2" }
    // ]; 
    getMenus() {
        return this.http.get(this._menusUrl)
            .toPromise()
            .then(function(response) {
                console.log("response", response.json());
                return response.json();
            })
            .catch(this.handleError);
    }

    getMenuByMenuId(menuId:string){
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.set("menuId",menuId);
        return this.http.get(this._getmenubymenuidUrl,{search:urlSearchParams})
            .toPromise()
            .then(function(response) {
                console.log("response", response.json());
                return response.json();
            })   
            .catch(this.handleError); 
    }

    updateMenu(menuDTO){
        let body = JSON.stringify(menuDTO);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this._updatemenuUrl, body, options)
                        .toPromise()
                        .then(()=>{return true})
                        .catch(this.handleError);
    }

    createMenu(parentId,menuDTO){
        menuDTO.parentId = parentId
        let body = JSON.stringify(menuDTO);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this._createmenuUrl, body, options)
                        .toPromise()
                        .then(()=>{return true})
                        .catch(this.handleError);        
    }

    deleteMenus(ids:string[]){
        let body = JSON.stringify(ids);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });     
        return this.http.post(this._deleteMenusURL, body, options)
                        .toPromise()
                        .then((data)=>{return true})
                        .catch(this.handleError);      
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
} 