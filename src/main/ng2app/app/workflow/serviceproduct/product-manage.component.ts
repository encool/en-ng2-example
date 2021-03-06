import { Component, OnInit, ViewContainerRef, Compiler, Type, ComponentFactoryResolver, ViewChild } from '@angular/core';

import { JqgridSetting, JqgridAction, JqgridEvent, JqgridCallback, DefaultJqgridCallback, ColModel, JqgridComponent } from '../../shared/jqgrid.module'

import { ModalService } from '../../service/modal.service'
import { WorkflowService } from '../../core/workflow/workflow.service'

import { ProductInfoComponent } from './product-info.component'

@Component({
    selector: 'sp-manage',
    templateUrl: './product-manage.component.html'
})
export class ProductManageComponent implements OnInit {
    _model: any = {}

    @ViewChild("spmanagegrid_ref") formGrid: JqgridComponent
    _modalContext: {
        vcRef: ViewContainerRef,
        componentFactoryResolver: ComponentFactoryResolver
    }

    constructor(private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver, private workflowService: WorkflowService,
        private modalService: ModalService) {
        this._modalContext = {
            vcRef: vcRef,
            componentFactoryResolver: componentFactoryResolver
        }
    }

    _spmgt_col_model = [
        new ColModel({ label: "productId", name: "productId", width: 20, hidden: true, key: true }),
        new ColModel({ label: "服务编码", name: "productNo", width: 20 }),
        new ColModel({ label: "服务名称", name: "productName", width: 20 }),
        new ColModel({ label: "服务类型", name: "serviceTypeId", width: 20 }),
        new ColModel({ label: "表单名称", name: "formName", width: 20 }),
    ]
    _spmgt_grid_actions = [
        new JqgridAction({ key: "add", name: "新增", order: 2 }),
        new JqgridAction({ key: "edit", name: "编辑", order: 3 }),
        new JqgridAction({ key: "refresh", name: "刷新", order: 1 }),
        new JqgridAction({ key: "delete", name: "删除", order: 6 }),
    ]
    _procdefmgt_grid_setting = new JqgridSetting({
        gridId: "spmgntgrid",
        primaryKey: "productId",
        url: "list/e/workflowserviceproduct",
        title: "服务产品管理",
        actions: this._spmgt_grid_actions,
    })
    ngOnInit() { }

    onGridAction(event: JqgridEvent) {
        let rowData = event.rowData;
        if (event.businessId == 'spmgntgrid') {
            switch (event.action.key) {
                case 'add':
                    this.modalService.open(
                        this._modalContext,
                        {
                            comp: ProductInfoComponent,
                            title: "新增服务",
                            width: "800px"
                        },
                        {
                            params: {
                                type: "add"
                            }
                        },
                        data => {
                            this.formGrid.refresh()
                        })
                    break;
                case 'edit':
                    this.workflowService.getProduct(rowData.productId).then(data => {
                        this._model.product = data;
                        this.modalService.open(
                            this._modalContext,
                            {
                                comp: ProductInfoComponent,
                                title: "编辑服务",
                                width: "800px"
                            },
                            {
                                product: this._model.product,
                                params: {
                                    productId: rowData.productId,
                                    type: "edit"
                                }
                            },
                            data => {
                                this.formGrid.refresh()
                            })
                    })
                    break;
                case 'delete':
                    let ids = this.formGrid.getSelectRowIds()
                    if (ids) {
                        this.modalService.openConfirm(
                            this._modalContext,
                            {
                                title: "确认",
                                message: '是否删除？'
                            },
                            data => {
                                this.workflowService.delProduct(ids).then(() => {
                                    toastr.success('删除成功!')
                                    this.formGrid.refresh()
                                })
                            }
                        )
                    }
                    break;
                case 'refresh':
                    break;
            }
        } else if (event.businessId == '') {
            switch (event.action.key) {
                case 'add':
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
}