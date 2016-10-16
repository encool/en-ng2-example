import { Component, Input } from '@angular/core';
import { Menu} from './object/menu';
import {MenuService } from './service/menu.service';


@Component({
    selector: 'my-menubar',
    templateUrl: './menusidebar.component.html',
    providers: [MenuService]
})
export class MenusidebarComponent {
    menus: Menu[];
    selectedMene:Menu;
    constructor(private menuService: MenuService) { }
    geMenus() {
        return this.menuService.getMenus();
    } 
    ngOnInit() {
        this.geMenus().then(menus => {this.menus = menus;console.log("this.menus",this.menus)}); 
    }
    setIconClasses(menu) {
        var icon = menu.i;
        let classes =  {
            fa:true
        };
        classes[icon] = true;
        return classes;
    }  
    setMenuId(menu,index,isherf) {
        var a = escape(menu.t);
        a = a.replace(/%/g,'a');
        if(isherf){
            return '#'+ a
        }else{
            return a
        }      
    }   

    setrouterLink(menu,index,isherf){
        if(menu.l){
            return menu.l;
        }else{
            return "dd"
        }
        
    }   
}