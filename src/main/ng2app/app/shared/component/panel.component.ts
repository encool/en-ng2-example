import { Component, Input, ContentChild } from '@angular/core';
import { BaseAction } from '../object/base-action'

@Component({
    selector: 'my-panel',
    template: `
    <div class="panel panel-default">
      <div class="panel-heading clearfix">
          <div class="btn-group-xs pull-right">
            <button type="button" class="btn btn-default" *ngFor="let action of actions" (click)="onAction(action)">{{action.name}}</button>
          </div>
          <h3 class="panel-title">{{title}}</h3>

      </div>
      <div class="panel-body">
        <ng-content></ng-content>
      </div>
    </div>
    `
})
export class PanelComponent {
    @Input() title: string;
    @Input() actions:Array<BaseAction> = []
    @ContentChild('panelcontent_ref') containerChild;
    onAction(action:BaseAction){
        this.containerChild.onAction(action);
    }
}