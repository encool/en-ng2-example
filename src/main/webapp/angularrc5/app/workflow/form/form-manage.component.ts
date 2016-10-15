import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { JqgridSetting, JqgridAction, JqgridEvent, JqgridCallback, DefaultJqgridCallback, ColModel, JqgridComponent} from '../../shared/jqgrid.module'

import { FormEditComponent } from './form-edit.component'
import { RelAddComponent } from './rel-add.component'
import { RelEditComponent } from './rel-edit.component'
import { ModalService } from '../../service/modal.service'

@Component({
    moduleId: module.id,
    selector: 'form-manage',
    template: `
        <my-container>
            <my-row>
                <my-div [span]="12">
                    <my-grid #formmanagegrid_ref [colModel]="_formmgt_col_model" [jqgridSetting]="_formmgt_grid_setting"
                        (jqgridevent)="onGridAction($event)" [callback]="fgridCall">
                    </my-grid>                 
                </my-div>
            </my-row>
            <my-row>
                <my-div [span]="12">
                    <my-grid #rel_ref [colModel]="_rel_col_model" [jqgridSetting]="_rel_grid_setting"
                        (jqgridevent)="onGridAction($event)" [callback]="relgridCall">
                    </my-grid>                 
                </my-div>
            </my-row>            
        </my-container>    
    `
})
export class FormManageComponent implements OnInit {
    @ViewChild("formmanagegrid_ref") formGrid: JqgridComponent

    _formmgt_col_model = [
        new ColModel({ label: "formId", name: "formId", width: 20, hidden: true, key: true }),
        new ColModel({ label: "表单编码", name: "formNo", width: 20 }),
        new ColModel({ label: "表单名称", name: "formName", width: 20 }),
        new ColModel({ label: "表单描述", name: "formDescribe", width: 20 }),
    ]
    _formmgt_grid_actions = [
        new JqgridAction({ key: "add", name: "新增", order: 2 }),
        new JqgridAction({ key: "edit", name: "编辑", order: 3 }),
        new JqgridAction({ key: "refresh", name: "刷新", order: 1 }),
        new JqgridAction({ key: "delete", name: "删除", order: 6 }),
    ]
    _formmgt_grid_setting = new JqgridSetting({
        gridId: "formmgtgrid",
        primaryKey: "formId",
        url: "list/e/workflowform",
        title: "字段管理",
        actions: this._formmgt_grid_actions,
    })

    fgridCall = new DefaultJqgridCallback({
        onSelectRow: (rowid: string, status: string, e: any) => {
            var formId: any = {};
            formId.formId = rowid;
            this.formRelGrid.setParams({ "formId": formId }, true);
        }
    })


    @ViewChild("rel_ref") formRelGrid: JqgridComponent

    _rel_col_model = [
        new ColModel({ label: "relId", name: "relId", width: 20, hidden: true, key: true }),
        new ColModel({ label: "字段编码", name: "fieldId.fieldNo", width: 20 }),
        new ColModel({ label: "字段名称", name: "fieldId.fieldName", width: 20 }),
        new ColModel({ label: "字段类别", name: "categotyId", width: 20 }),
        new ColModel({ label: "字段描述", name: "fieldId.fieldDescribe", width: 20 }),
    ]
    _rel_grid_actions = [
        new JqgridAction({ key: "add", name: "新增", order: 2 }),
        new JqgridAction({ key: "edit", name: "编辑", order: 3 }),
        new JqgridAction({ key: "refresh", name: "刷新", order: 1 }),
        new JqgridAction({ key: "delete", name: "删除", order: 6 }),
    ]
    _rel_grid_setting = new JqgridSetting({
        gridId: "formfieldrelgrid",
        primaryKey: "relId",
        url: "list/e/workflowformfieldrel",
        title: "关联字段",
        actions: this._rel_grid_actions,
        postData: {
            formId: { formId: "999" }
        }
    })

    relgridCall = new DefaultJqgridCallback({
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
        if (event.businessId == 'formmgtgrid') {
            switch (event.action.key) {
                case 'add':
                    this.modalService.open(
                        this._modalContext,
                        {
                            comp: FormEditComponent,
                            title: "新增表单",
                            width: "700px"

                        },
                        {
                            params: {
                                type: "add"
                            }
                        },
                        data => {
                            this.formGrid.refresh()
                        }
                    )
                    break;
                case 'edit':
                    this.modalService.open(
                        this._modalContext,
                        {
                            comp: FormEditComponent,
                            title: "编辑表单",
                            width: "700px"

                        },
                        {
                            params: {
                                formId: event.rowId,
                                type: "edit"
                            }
                        },
                        data => {
                            this.formGrid.refresh()
                        }
                    )
                    break;
                case 'delete':
                    let ids: string[] = this.formGrid.getSelectRowIds();
                    let idstr = ids.join(",")
                    let urlSearchParams = new URLSearchParams();
                    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                    let options = new RequestOptions({
                        headers: headers,
                        search: urlSearchParams
                    });
                    this.http.delete('e/workflowform/' + idstr, options)
                        .toPromise()
                        .then((data) => {
                            this.formGrid.refresh();
                        })
                    break;
                case 'refresh':
                    break;
            }
        } else if (event.businessId == 'formfieldrelgrid') {
            let relId = event.rowId
            switch (event.action.key) {
                case 'add':
                    let formId = this.formGrid.getSingleSelectRowId()
                    if (formId == undefined) {
                        toastr.warning('請選擇表單')
                        return
                    }
                    this.modalService.open(
                        this._modalContext,
                        {
                            comp: RelAddComponent,
                            title: "字段选择"
                        },
                        {
                            param: {
                                formId: formId
                            }
                        },
                        data => {
                            this.formRelGrid.refresh()
                        }
                    )
                    break;
                case 'edit':
                    this.modalService.open(
                        this._modalContext,
                        {
                            comp: RelEditComponent,
                            title: '编辑表单字段',
                            width: '800px'
                        },
                        {
                            params: {
                                relId: relId
                            }
                        },
                        data => {
                            this.formRelGrid.refresh()
                        }
                    );
                    break;
                case 'delete':
                    let ids: string[] = this.formRelGrid.getSelectRowIds();
                    let idstr = ids.join(",")
                    let urlSearchParams = new URLSearchParams();
                    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                    let options = new RequestOptions({
                        headers: headers,
                        search: urlSearchParams
                    });
                    this.http.delete('e/workflowformfieldrel/' + idstr, options)
                        .toPromise()
                        .then((data) => {
                            this.formRelGrid.refresh();
                        })
                    break;
                case 'refresh':
                    break;
            }
        }
    }
}