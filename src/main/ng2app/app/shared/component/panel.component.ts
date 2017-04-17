import { Component, Input, ContentChild } from '@angular/core';
import { BaseAction } from '../object/base-action'

//   <div class="btn-group-xs pull-right">
//     <button type="button" class="btn btn-default" *ngFor="let action of actions" (click)="onAction(action)">{{action.name}}</button>
//   </div>
@Component({
    selector: 'my-panel',
    template: `
    <div class="panel panel-default">
      <div class="panel-heading clearfix">
        <div *ngIf="actions.length > 0" class="dropdown pull-right">
            <div class="btn-group btn-group-sm" role="group" aria-label="...">
                <button type="button" class="btn btn-default" (click)="onAction(actions[0])">{{actions[0].name}}</button>
                <button *ngIf="actions.length > 1" class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">                  
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1" style="min-width:1px">
                    <li *ngFor="let action of actions; let i = index;">
                        <a *ngIf="i >= 1" (click)="onAction(action)">{{action.name}}</a>
                    </li>
                </ul>                    
            </div>
        </div>
        <h3 style="font-size: 16px;color: inherit;margin-top: 6px; margin-bottom: 6px;">{{title}}</h3>
      </div>
      <div class="panel-body">
        <ng-content></ng-content>
      </div>
    </div>
    `
})
export class PanelComponent {
    @Input() title: string;
    @Input() actions: Array<BaseAction> = []
    @ContentChild('panelcontent_ref') containerChild;

    onAction(action: BaseAction) {
        this.containerChild.onAction(action);
    }
}