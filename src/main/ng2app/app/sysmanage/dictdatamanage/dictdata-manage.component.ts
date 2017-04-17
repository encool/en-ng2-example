import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import { JqgridSetting, JqgridAction, JqgridEvent, JqgridCallback, DefaultJqgridCallback, ColModel, JqgridComponent } from '../../shared/jqgrid.module'
import { TreeEvent, ZtreeSetting, ZtreeComponent, onZtreeAction, TreeAction, TreeNode, ZtreeCallback, DefaultZtreeCallBack } from '../../shared/ztree.module'

import { ModalService } from '../../service/modal.service'
import { DicttypeEditComponent } from './dicttype-edit.component'
import { DictdataEditComponent } from './dictdata-edit.component'


@Component({
    selector: 'dictdata',
    templateUrl: './dictdata-manage.component.html'
})
export class DictdataManageComponent implements OnInit {

    @ViewChild("dicttree_ref") dictTree: ZtreeComponent
    @ViewChild("_dictdatagrid_ref") dictdataGrid: JqgridComponent

    _dicttree_actions: Array<TreeAction> = [
        new TreeAction({ key: "refresh", name: "刷新", order: 1 }),
        new TreeAction({ key: "add", name: "新增", order: 2 }),
        new TreeAction({ key: "edit", name: "编辑", order: 3 }),
        new TreeAction({ key: "delete", name: "删除", order: 6 }),
    ]
    _dicttree_setting = new ZtreeSetting({
        dataUrl: "tree/dictdatatypes",
        treeId: "dicttypetree",
        autoParam: ["id"],
        selectedMulti: true,
        checkEnable: true,
        autoCheckTrigger: true,
        actions: this._dicttree_actions,
    })
    dictTreeCall = _.assign(this.dictTreeCall, DefaultZtreeCallBack, {
        onClick: (event, treeId, treeNode, clickFlag) => {
            var selected = this.dictTree.getSelectedNodes()
            this.dictdataGrid.refresh({ dtypeId: treeNode.id })
            // if(angular.isUndefined($model.search)){
            //     $model.search = {};
            // }
            // $model.search.dtypeId = treeNode.id;       
        },
        onCheck: (event, treeId, treeNode, clickFlag) => {
            // this.userGrid.refresh({ orgId: treeNode.id })
        }
    })


    _dictdata_col_model = [
        new ColModel({ label: "字典真实值", name: "dictdataName", width: "20" }),
        new ColModel({ label: "字典显示值", name: "dictdataValue", width: "20" }),
        new ColModel({ label: "是否默认值", name: "dictdataIsdefault", width: "20", formatter: (value, option, rowObject) => { return value ? "是" : "否" } }),
        new ColModel({ label: "dictdataId", name: "dictdataId", key: true, hidden: true }),
        new ColModel({ label: "dicttypeId", name: "dicttypeId", hidden: true })
    ]
    grid_actions = [
        new JqgridAction({ key: "add", name: "新增", order: 2 }),
        new JqgridAction({ key: "edit", name: "编辑", order: 3 }),
        new JqgridAction({ key: "refresh", name: "刷新", order: 1 }),
        new JqgridAction({ key: "delete", name: "删除", order: 6 }),
    ]

    _dictdata_grid_setting = new JqgridSetting({
        primaryKey: "dictdataId",
        title: "字典管理",
        actions: this.grid_actions,
        url: "list/dictdatacontents",
        gridId: "dictdatamanage"
    })

    _dictdatagridcall: JqgridCallback = {
        onSelectRow: (rowid, status, e) => {
            var selectRowIds = this.dictdataGrid.getSelectRowIds();
        },
        gridComplete: () => {

        }
    }

    _modalContext: {
        vcRef: ViewContainerRef,
        componentFactoryResolver: ComponentFactoryResolver
    }

    constructor(private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver,
        private modalService: ModalService, private http: Http) {
        this._modalContext = {
            vcRef: vcRef,
            componentFactoryResolver: componentFactoryResolver
        }
    }

    ngOnInit() { }

    onZtreeAction(treeEvent: TreeEvent) {
        let node = treeEvent.node;
        if (treeEvent.businessId == 'dicttypetree') {
            switch (treeEvent.action.key) {
                case 'add':
                    this.modalService.open(
                        this._modalContext,
                        {
                            comp: DicttypeEditComponent,
                            title: '新增字典类型信息',
                            width: '800px'
                        },
                        {
                            params: {
                                type: 'add'
                            }
                        },
                        data => {
                            this.dictTree.refresh2({})
                        }
                    );
                    break;
                case 'edit':
                    if (!node) {
                        toastr.warning('请选择！')
                        return
                    }
                    this.modalService.open(
                        this._modalContext,
                        {
                            comp: DicttypeEditComponent,
                            title: "编辑字典信息",
                            width: "800px"
                        },
                        {
                            params: {
                                dicttypeId: node.id,
                                type: "edit"
                            }
                        },
                        data => {
                            this.dictTree.refresh2({})
                        }
                    );
                    break;
                case 'delete':
                    let body = JSON.stringify([node.id]);
                    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                    let options = new RequestOptions({ headers: headers });
                    this.http.post('dicttype/delete', body, options)
                        .toPromise()
                        .then((data) => {
                            if (data) {
                                this.dictTree.refresh2({})
                            }
                        });
                    break;
                case 'refresh':
                    this.dictTree.refresh2({});
                    break;
            }
        }
    }

    onGridAction(event: JqgridEvent) {
        let rowObject = event.rowData;
        if (event.businessId == 'dictdatamanage') {
            switch (event.action.key) {
                case 'add':
                    var selectNode = this.dictTree.getSelectedNodes()[0];
                    if (_.isUndefined(selectNode) || _.isUndefined(selectNode.id)) {
                        toastr.warning('请选择字典类型！')
                    } else {
                        this.modalService.open(
                            this._modalContext,
                            {
                                comp: DictdataEditComponent,
                                title: '新增字典数据',
                                width: '800px'
                            },
                            {
                                params: {
                                    dicttypeId: selectNode.id,
                                    type: 'add'
                                }
                            },
                            data => {
                                this.dictdataGrid.refresh()
                            }
                        );
                    }
                    break;
                case 'edit':
                    if (!rowObject) {
                        toastr.warning('请选择！')
                        return
                    }
                    this.modalService.open(
                        this._modalContext,
                        {
                            comp: DictdataEditComponent,
                            title: '编辑字典数据',
                            width: '800px'
                        },
                        {
                            params: {
                                dictdataId: rowObject.dictdataId,
                                type: 'edit'
                            }
                        },
                        data => {
                            this.dictdataGrid.refresh()
                        }
                    );
                    break;
                case 'delete':
                    this.modalService.openConfirm(
                        this._modalContext,
                        {
                            message: "确认删除所选记录？",
                            title: "是否确认"
                        },
                        data => {
                            let ids: string[] = this.dictdataGrid.getSelectRowIds();
                            let body = JSON.stringify(ids);
                            let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                            let options = new RequestOptions({ headers: headers });
                            this.http.post('dictdata/delete', body, options)
                                .toPromise()
                                .then((data) => {
                                    this.dictdataGrid.refresh()
                                    return data
                                })

                        }
                    )

                    break;
                case 'refresh':
                    this.dictdataGrid.refresh()
                    break;
            }
        }
    }
}