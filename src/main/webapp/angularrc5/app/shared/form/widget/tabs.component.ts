import { Component, OnInit, ContentChildren, Input, AfterViewInit, QueryList, EventEmitter, Output } from '@angular/core';

import { Tab } from './tab'
import { TabpanelComponent } from './tabpanel.component'

@Component({
    selector: 'tabs',
    template: `
        <ul class="nav nav-tabs" role="tablist" style="margin-bottom: 15px;">
            <li *ngFor="let tab of tabs" role="presentation" [ngClass]="{'active': tab.active}">
                <a (click)="tabClick(tab)" role="tab" data-toggle="tab">{{tab.name}}</a>
            </li>
        </ul>    
        <div class="tab-content">
            <ng-content ></ng-content>
        </div>
    `
})
export class TabsComponent implements OnInit {

    tabs: Tab[] = []
    curTab: Tab

    @Output() tabclick = new EventEmitter();

    @ContentChildren(TabpanelComponent) panes: QueryList<TabpanelComponent>;

    constructor() { }

    ngOnInit() { 

    }

    ngAfterContentInit() {
        this.panes.forEach(data=>{
            if(data.tab.active == true){
                this.curTab = data.tab
            }
            this.tabs.push(data.tab)
        });
    }

    tabClick(tab:Tab){
        let reverse:boolean = tab === this.curTab?false:true
        if(reverse){
            this.curTab = tab
            this.tabclick.emit(tab)
        }
        this.activeTab(tab)
    }

    private activeTab(tab:Tab){
        this.tabs.forEach(data=>{
            if(data.key == tab.key){
                data.active = true
            }else{
                data.active = false
            }
        })
    }
}