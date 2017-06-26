import { Component, OnInit, ViewChild } from '@angular/core';
import { JqgridSetting, JqgridAction, JqgridEvent, JqgridCallback, DefaultJqgridCallback, ColModel, JqgridComponent } from '../../shared'
import { JqgridFormatter } from '../../shared'

import { Router } from '@angular/router'

import { WorkflowService } from '../service/workflow.service'
import { DictdataService } from '../../service/dictdata.service'

@Component({
    selector: 'task-todo',
    template: `
    <my-container>
        <my-grid #taskgrid [jqgridSetting]="grid_setting" [colModel]="col_model" [callback]="callback">
        </my-grid>
    </my-container>
    `
})

export class TodoComponent implements OnInit {
    @ViewChild("taskgrid") taskGrid: JqgridComponent
    col_model = [
        new ColModel({ label: "taskId", name: "taskId", width: 20, hidden: true, key: true }),
        new ColModel({
            label: "标题", name: "TITLE", width: 20,
            formatter: (value, option, rowObject) => {
                return "<a class='tasktodotitle' taskId='" + rowObject.taskId + "'>" + value + "</a>"
            }
        }),

        new ColModel({ label: "服务名称", name: "productName", width: 20 }),
        new ColModel({ label: "服务类型", name: "serviceTypeId", width: 20, formatter: new JqgridFormatter.DictData(this.dictdataService, "工作流_事项分类").formatter }),
        new ColModel({ label: "PROC_INST_ID_", name: "PROC_INST_ID_", width: 20, hidden: true }),
        new ColModel({ label: "businessKey", name: "businessKey", width: 20, hidden: true }),
        new ColModel({ label: "moduleId", name: "moduleId", width: 20, hidden: true }),
        new ColModel({ label: "PROC_DEF_ID_", name: "PROC_DEF_ID_", width: 20, hidden: true }),
        new ColModel({ label: "taskdefid", name: "taskdefid", width: 20, hidden: true }),
        new ColModel({ label: "formId", name: "formId", width: 20, hidden: true }),
    ]
    grid_actions = [
        new JqgridAction({ key: "add", name: "新增", order: 2 }),
        new JqgridAction({ key: "edit", name: "编辑", order: 3 }),
        new JqgridAction({ key: "refresh", name: "刷新", order: 1 }),
        new JqgridAction({ key: "delete", name: "删除", order: 6 }),
    ]
    grid_setting = new JqgridSetting({
        gridId: "tasktodogrid",
        primaryKey: "taskId",
        postData: {
            isExternalStorage: true,
            formId: "PAqyQdT0SmKJ9Cj2O9-elA"
        },
        url: "list/tasktodo",
        title: "任务待办",
        actions: this.grid_actions,
    })

    callback = new DefaultJqgridCallback(
        {
            gridComplete: () => {
                $('a[class=tasktodotitle]').each((index, ele: any) => {
                    ele.onclick = (e: Event) => {
                        let target: any = e.target
                        let attr = target.attributes
                        let taskId = attr.taskId.value
                        let rowO = this.taskGrid.getRowData(taskId)
                        this.workflowService.getProduct(rowO.moduleId)
                            .then((data) => {
                                let url = data.wfProcessstartUrl
                                if (url) {
                                    this.router.navigate([url, rowO]);
                                } else {
                                    this.router.navigate(['/workflow/usertaskdo', rowO]);
                                }
                            })
                    }
                })
            }

        }
    )

    constructor(private router: Router, private workflowService: WorkflowService, private dictdataService: DictdataService) { }

    ngOnInit() { }
}