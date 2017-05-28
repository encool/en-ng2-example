import { Component, OnInit, ViewContainerRef, Compiler, Type, ComponentFactoryResolver, ViewChild } from '@angular/core';

import { JqgridSetting, JqgridAction, JqgridEvent, JqgridCallback, DefaultJqgridCallback, ColModel, JqgridComponent } from '../../shared/jqgrid.module'

import { ModalService } from '../../service/modal.service'
import { DictdataService } from '../../service/dictdata.service'

import { Router } from '@angular/router'

@Component({
    selector: 'contract-manage',
    template: `
    <my-container>
        <my-grid #contracmgtgrid [jqgridSetting]="grid_setting" [colModel]="col_model" (jqgridevent)="onGridAction($event)" [callback]="callback">
        </my-grid>
    </my-container>   
    `
})
export class ContractmgtComponent implements OnInit {
    _model: any = {}

    @ViewChild("contracmgtgrid") formGrid: JqgridComponent
    _modalContext: {
        vcRef: ViewContainerRef,
        componentFactoryResolver: ComponentFactoryResolver
    }

    constructor(private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver,
        private modalService: ModalService, private dictdataService: DictdataService, private router: Router) {
        this._modalContext = {
            vcRef: vcRef,
            componentFactoryResolver: componentFactoryResolver
        }
    }

    col_model = [
        new ColModel({ label: "productId", name: "productId", width: 20, hidden: true, key: true }),
        new ColModel({ label: "合同名称", name: "contractName", width: 20 }),
        new ColModel({ label: "承办方", name: "undertaker", width: 20 }),
        new ColModel({ label: "经办人", name: "excutorName", width: 20 }),
        new ColModel({
            label: "状态", name: "instStatus", width: 20,
            formatter: (cellvalue, a, b) => {
                let value = this.dictdataService.getDictDataValue("工作流_审核状态", cellvalue)
                if (!value) {
                    value = cellvalue
                }
                return '<a class="contractstatus">' + value + '</a>'
            }
        }),
    ]
    _spmgt_grid_actions = [
        new JqgridAction({ key: "add", name: "新增", order: 2 }),
        new JqgridAction({ key: "edit", name: "编辑", order: 3 }),
        new JqgridAction({ key: "refresh", name: "刷新", order: 1 }),
        new JqgridAction({ key: "query", name: "查询", isQuery: true, order: 1 }),
        new JqgridAction({ key: "delete", name: "删除", order: 6 }),
    ]
    grid_setting = new JqgridSetting({
        gridId: "contractmgntgrid",
        primaryKey: "productId",
        url: "list/e/contract",
        title: "合同管理",
        actions: this._spmgt_grid_actions,
    })

    callback = new DefaultJqgridCallback(
        {
            gridComplete: () => {
                $('a[class=contractstatus]').each((index, ele: any) => {
                    ele.onclick = (e: Event) => {
                        let target: any = e.target
                        let attr = target.attributes
                        let taskId = attr.taskId.value
                        let rowO = this.formGrid.getRowData(taskId)
                        // this.router.navigate(['/workflow/usertaskdo', rowO]);
                    }
                })
            }

        }
    )

    ngOnInit() { }

    onGridAction(event: JqgridEvent) {
        let rowData = event.rowData;
        if (event.businessId == 'contractmgntgrid') {
            switch (event.action.key) {
                case 'add':
                    let $params = {
                        productId: 'NFcvaAWUShKRa3wTpUc0HQ',
                        productNo: 'YCSQ',
                        formId: '7fLQGV6YQf6UZQ3W_1ktGg'
                    }
                    this.router.navigate(['/project/contractform', $params]);
                    // this.router.navigate(['/workflow/usertaskdo', $params]);
                    break;
                case 'edit':
                    break;
                case 'delete':
                    break;
                case 'refresh':
                    break;
            }
        }
    }

    statusClicked() {
        debugger
    }
}