import { Component, OnInit, ViewContainerRef, Compiler, Type, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http'
import { JqgridSetting, JqgridAction, JqgridEvent, JqgridCallback, DefaultJqgridCallback, ColModel, JqgridComponent } from '../../shared/jqgrid.module'

import { TemplateInfoComponent } from './template-info.component'

import { ModalService } from '../../service/modal.service'

@Component({
    selector: 'template-mgt',
    template: `
    <my-container>
        <my-grid #grid_ref [colModel]="_col_model" [jqgridSetting]="_grid_setting"
            (jqgridevent)="onGridAction($event)" [callback]="gridCall">
        </my-grid>
    </my-container>
    `
})
export class TemplateMgtComponent implements OnInit {
    @ViewChild("grid_ref") formGrid: JqgridComponent
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

    _col_model = [
        new ColModel({ label: "id", name: "id", width: 20, hidden: true, key: true }),
        new ColModel({ label: "编码", name: "categoryNo", width: 20 }),
        new ColModel({ label: "名称", name: "categoryName", width: 20 }),
        new ColModel({ label: "组件", name: "url", width: 20 }),
        new ColModel({ label: "移动组件", name: "mobileUrl", width: 20 }),
        new ColModel({ label: "描述", name: "describe", width: 20 }),
    ]
    _grid_actions = [
        new JqgridAction({ key: "add", name: "新增", order: 2 }),
        new JqgridAction({ key: "edit", name: "编辑", order: 3 }),
        new JqgridAction({ key: "refresh", name: "刷新", order: 1 }),
        new JqgridAction({ key: "delete", name: "删除", order: 6 }),
    ]
    _grid_setting = new JqgridSetting({
        gridId: "spmgntgrid",
        primaryKey: "productId",
        url: "list/e/webdisplaycategory",
        title: "UI定义管理",
        actions: this._grid_actions,
    })

    ngOnInit() { }

    onGridAction(event: JqgridEvent) {
        let rowId = event.rowId
        switch (event.action.key) {
            case 'add':
                this.modalService.open(
                    this._modalContext,
                    {
                        comp: TemplateInfoComponent,
                        title: '新增模板',
                        width: '800px'
                    },
                    {
                        params: {
                            type: 'add'
                        }
                    },
                    data => {
                        this.formGrid.refresh()
                    }
                );
                break;
            case 'edit':
                if (rowId == undefined) {
                    toastr.warning('请选择记录！')
                    return
                }
                this.modalService.open(
                    this._modalContext,
                    {
                        comp: TemplateInfoComponent,
                        title: '编辑模板',
                        width: '800px'
                    },
                    {
                        params: {
                            type: 'edit',
                            id: rowId
                        }
                    },
                    data => {
                        this.formGrid.refresh()
                    }
                );
                break;
            case 'delete':
                if (rowId == undefined) {
                    toastr.warning('请选择记录！')
                    return
                }
                let ids: string[] = this.formGrid.getSelectRowIds();
                let idstr = ids.join(",")
                let urlSearchParams = new URLSearchParams();
                // urlSearchParams.set('', );
                // urlSearchParams.set('', );
                let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                let options = new RequestOptions({
                    headers: headers,
                    search: urlSearchParams
                });
                this.http.delete('e/webdisplaycategory/' + idstr, options)
                    .toPromise()
                    .then((data) => {
                        this.formGrid.refresh()
                    })
                break;
            case 'refresh':
                this.formGrid.refresh()
                break;
        }

    }
}