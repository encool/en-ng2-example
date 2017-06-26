import { Injectable } from '@angular/core';
import { Menu } from './menu';
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

    private menus = []
    //选中的菜单 一级二级三级 压入
    public selectedMenus: Menu[] = new Array()

    breadcrumbArray: Menu[]

    constructor(private http: Http) { }

    initBreadcrumbArray() {
        this.breadcrumbArray = [new Menu("$dkiesdf", "1", "首页", "index")]
    }

    setMenuSelected(menulink, menus?: Menu[]) {
        if (menus) {
            for (let i in menus) {
                let menu = menus[i]
                if (menu.l == menulink) {
                    menu.isSelected = true
                    this.selectedMenus.push(menu)
                    return true
                } else if (menu.c && menu.c.length > 0) {
                    let result = this.setMenuSelected(menulink, menu.c)
                    menu.isSelected = result
                    if (result) {
                        this.selectedMenus.push(menu)
                    }
                } else {
                    menu.isSelected = false
                }
            }
        } else {
            this.selectedMenus = []
            for (let i in this.menus) {
                let menu = this.menus[i]
                if (menu.l == menulink) {
                    menu.isSelected = true
                    this.selectedMenus.push(menu)
                    return true
                } else if (menu.c && menu.c.length > 0) {
                    let result = this.setMenuSelected(menulink, menu.c)
                    menu.isSelected = result
                    if (result) {
                        this.selectedMenus.push(menu)
                    }
                } else {
                    menu.isSelected = false
                }
            }
        }
    }

    getMenus(): Promise<any> {
        if (this.menus.length > 0) {
            return new Promise((resolve, reject) => {
                resolve(this.menus)
            });
        } else {
            return this.http.get(this._menusUrl)
                .toPromise()
                .then((response) => {
                    console.log("response", response.json());
                    this.menus = response.json();
                    return this.menus
                })
                .catch(this.handleError);
        }
    }

    getMenuByMenuId(menuId: string) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.set("menuId", menuId);
        return this.http.get(this._getmenubymenuidUrl, { search: urlSearchParams })
            .toPromise()
            .then(function (response) {
                console.log("response", response.json());
                return response.json();
            })
            .catch(this.handleError);
    }

    updateMenu(menuDTO) {
        let body = JSON.stringify(menuDTO);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this._updatemenuUrl, body, options)
            .toPromise()
            .then(() => { return true })
            .catch(this.handleError);
    }

    createMenu(parentId, menuDTO) {
        menuDTO.parentId = parentId
        let body = JSON.stringify(menuDTO);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this._createmenuUrl, body, options)
            .toPromise()
            .then(() => { return true })
            .catch(this.handleError);
    }

    deleteMenus(ids: string[]) {
        let body = JSON.stringify(ids);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this._deleteMenusURL, body, options)
            .toPromise()
            .then((data) => { return true })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
} 