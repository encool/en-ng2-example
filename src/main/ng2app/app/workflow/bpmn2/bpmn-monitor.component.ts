import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { JqgridSetting, JqgridAction, JqgridEvent, JqgridCallback, DefaultJqgridCallback, ColModel, JqgridComponent } from '../../shared/jqgrid.module'


@Component({
    selector: 'bpmn-monitor',
    template: `
    <my-container>
        <bpmn-viewer [$model]="$model"></bpmn-viewer>
        <my-grid [jqgridSetting]="grid_setting" [colModel]="col_model"></my-grid>
    </my-container>
    `
})

export class BpmnMonitorComponent implements OnInit {

    @Input() $model: {
        params?: {
            key?: string,
            name?: string,
            description?: string
            type?: string
            processDefId?: string
            moduleId?: string
            processInsId?: string
        }
        model?: any
    } = {
        params: {}
    }

    @ViewChild(JqgridComponent) myGrid: JqgridComponent
    col_model = [
        new ColModel({ label: "任务名称", name: "name", width: 20 }),
        new ColModel({ label: "处理人", name: "assignee", width: 20 }),
        new ColModel({ label: "候选人", name: "candidate", width: 20, }),
        new ColModel({ label: "开始时间", name: "startTime", width: 20, }),
        new ColModel({ label: "结束时间", name: "endTime", width: 20, }),
        new ColModel({ label: "状态", name: "status", width: 20, }),
    ]
    // grid_actions = [
    //     new JqgridAction({ key: "add", name: "新增", order: 2 }),
    //     new JqgridAction({ key: "edit", name: "编辑", order: 3 }),
    //     new JqgridAction({ key: "refresh", name: "刷新", order: 1 }),
    //     new JqgridAction({ key: "delete", name: "删除", order: 6 }),
    // ]
    grid_setting: JqgridSetting

    constructor() { }

    ngOnInit() {
        this.grid_setting = new JqgridSetting({
            gridId: "processmonitorgrid",
            primaryKey: "taskId",
            postData: {
                "processInstanceId": this.$model.params.processInsId,
                // "taskDefinitionKey": this.$model.params.taskDefinitionKey
            },
            url: "list/processmonitorcontent",
            title: "任务待办",
            rowNum: 5
            // actions: this.grid_actions,
        })
    }

    onModalNativeEvent(event: String, e: any): any {
        if (event === "shown.bs.modal") {
            this.myGrid.onResize();
        }
    }
}