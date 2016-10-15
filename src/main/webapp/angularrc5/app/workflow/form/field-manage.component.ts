import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { JqgridSetting, JqgridAction, JqgridEvent, JqgridCallback, DefaultJqgridCallback, ColModel, JqgridComponent} from '../../shared/jqgrid.module'

import { ModalService } from '../../service/modal.service'

import { FieldEditComponent } from './field-edit.component'

@Component({
    moduleId: module.id,
    selector: 'field-manage',
    template: `
        <my-container>
            <my-row>
                <my-col [span]="12">
                    <my-grid #fieldmanagegrid_ref [colModel]="_fieldmgt_col_model" [jqgridSetting]="_fieldmgt_grid_setting"
                        (jqgridevent)="onGridAction($event)" [callback]="fgridCall">
                    </my-grid>                 
                </my-col>
            </my-row>
        </my-container>
       
    `
})
export class FieldManageComponent implements OnInit {

    @ViewChild("fieldmanagegrid_ref") fieldGrid: JqgridComponent

    _fieldmgt_col_model = [
        new ColModel({ label: "fieldId", name: "fieldId", width: 20, hidden: true, key: true }),
        new ColModel({ label: "字段编码", name: "fieldNo", width: 20 }),
        new ColModel({ label: "字段名称", name: "fieldName", width: 20 }),
        new ColModel({ label: "字段描述", name: "fieldDescribe", width: 20 }),
    ]
    _fieldmgt_grid_actions = [
        new JqgridAction({ key: "add", name: "新增", order: 2 }),
        new JqgridAction({ key: "edit", name: "编辑", order: 3 }),
        new JqgridAction({ key: "refresh", name: "刷新", order: 1 }),
        new JqgridAction({ key: "delete", name: "删除", order: 6 }),
    ]
    _fieldmgt_grid_setting = new JqgridSetting({
        gridId: "fieldmgtgrid",
        primaryKey: "fieldId",
        url: "list/e/workflowformfield",
        title: "字段管理",
        actions: this._fieldmgt_grid_actions,
    })

    fgridCall = new DefaultJqgridCallback({
        onSelectRow: (rowid: string, status: string, e: any) => {

        }
    })

    _modalContext: {
        vcRef: ViewContainerRef,
        componentFactoryResolver: ComponentFactoryResolver
    }

    constructor(private http: Http, private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver,
        private modalService: ModalService) {
        this._modalContext = {
            vcRef: vcRef,
            componentFactoryResolver: componentFactoryResolver
        }
    }

    ngOnInit() { }

    onGridAction(event: JqgridEvent) {
        if (event.businessId == 'fieldmgtgrid') {
            switch (event.action.key) {
                case 'add':
                    this.modalService.open(
                        this._modalContext,
                        {
                            comp: FieldEditComponent,
                            title: "新增字段信息",
                            width: "650px"
                        },
                        {
                            params: {
                                type: "add"
                            }
                        },
                        data => {

                        }
                    )
                    break;
                case 'edit':
                    this.modalService.open(
                        this._modalContext,
                        {
                            comp: FieldEditComponent,
                            title: "编辑字段信息",
                            width: "650px"
                        },
                        {
                            params: {
                                fieldId: event.rowId,
                                type: "edit"
                            }
                        },
                        data => {
                            this.fieldGrid.refresh();
                        }
                    )
                    break;
                case 'delete':
                    let ids: string[] = this.fieldGrid.getSelectRowIds();
                    let idstr = ids.join(",")
                    let urlSearchParams = new URLSearchParams();

                    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                    let options = new RequestOptions({
                        headers: headers,
                        search: urlSearchParams
                    });
                    this.http.delete("e/workflowformfield/" + ids, options)
                        .toPromise()
                        .then((data) => {
                            this.fieldGrid.refresh();
                        })
                    break;
                case 'refresh':
                    break;
            }
        }
    }
}