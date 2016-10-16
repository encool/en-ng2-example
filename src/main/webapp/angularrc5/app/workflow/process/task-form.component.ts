import { Component, OnInit, Input } from '@angular/core';

import { WorkflowService } from '../service/workflow.service'

@Component({
    selector: 'wf-task-form',
    template: `
    <div *ngFor="let field of fields">
        <div [ngSwitch]="field.webDisplayType">
            <div *ngSwitchCase="TEXT_INPUT">
                <wf-text-input [field]="field"></wf-text-input>
            </div>
        </div>
    </div>
    `
})
export class TaskFormComponent implements OnInit {
    @Input() formId: any
    @Input() permissiondata: any
    @Input() fields: any
    constructor(private wfs: WorkflowService) { }

    ngOnInit() {
        this.wfs.getformfield(this.formId, null, false)
    }
}