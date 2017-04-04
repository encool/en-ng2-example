import { Component, OnInit, ViewChild, ViewContainerRef, Compiler, Type, ComponentFactoryResolver } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import { SysmanageModule } from './sysmanage.module'
import { SharedModule } from '../shared/shared.module'
import { ModalAction } from '../shared/object/modal-action'
import { ModalEvent } from '../shared/object/modal-event'

import { JqgridSetting, JqgridAction, JqgridEvent, JqgridCallback, DefaultJqgridCallback, ColModel, JqgridComponent } from '../shared/jqgrid.module'
import { TreeEvent, ZtreeSetting, ZtreeComponent, onZtreeAction, TreeAction, TreeNode, ZtreeCallback, DefaultZtreeCallBack } from '../shared/ztree.module'

import { MenuinfoComponent } from './menuinfo.component'
import { JobinfoComponent } from './jobinfo.component'
import { OrginfoComponent } from './orginfo.component'

import { MenuService } from '../service/menu.service'
import { OrgService } from '../service/org.service'
import { JobService } from '../service/job.service'
import { ModalService } from '../service/modal.service'

@Component({
    selector: 'resource-manage',
    templateUrl: './resourcemanage.component.html',
})
export class ResourcemanageComponent implements OnInit, onZtreeAction {

    // private menuTreeEvent:TreeEvent
    @ViewChild("menutree_ref") menuTree: ZtreeComponent
    @ViewChild("orgtree_ref") orgTree: ZtreeComponent
    @ViewChild("jobgrid_ref") jobGrid: JqgridComponent

    $model: any = {}
    _orginfo_params: any = {}
    _menuinfo_params: any = {}
    _jobinfo_params: any = {}

    _modalContext: {
        vcRef: ViewContainerRef,
        componentFactoryResolver: ComponentFactoryResolver
    }

    _menutree_autoParam = ["id", "pid", "type", "checked", "virtual"];

    _menumodal_actions: Array<ModalAction> = [
        new ModalAction({ key: "cancel", name: "取消", order: 1, cancel: true }),
        new ModalAction({ key: "save", name: "保存", order: 2 })
    ]
    _orgmodal_actions: Array<ModalAction> = [
        new ModalAction({ key: "cancel", name: "取消", order: 1, cancel: true }),
        new ModalAction({ key: "save", name: "保存", order: 2 })
    ]

    _menutree_actions: Array<TreeAction> = [
        new TreeAction({ key: "refresh", name: "刷新", order: 1 }),
        new TreeAction({ key: "add", name: "新增", order: 2 }),
        new TreeAction({ key: "edit", name: "编辑", order: 3 }),
        new TreeAction({ key: "set", name: "设置", order: 4 }),
        new TreeAction({ key: "sort", name: "排序", order: 5 }),
        new TreeAction({ key: "delete", name: "删除", order: 6 }),
    ]
    _menutree_setting = new ZtreeSetting({
        dataUrl: "tree/restreecontent",
        treeId: "menutree",
        autoParam: this._menutree_autoParam,
        selectedMulti: true,
        checkEnable: true,
        autoCheckTrigger: true,
        actions: this._menutree_actions
    })

    _orgtree_actions: Array<TreeAction> = [
        new TreeAction({ key: "refresh", name: "刷新", order: 1 }),
        new TreeAction({ key: "add", name: "新增", order: 2 }),
        new TreeAction({ key: "edit", name: "编辑", order: 3 }),
        new TreeAction({ key: "set", name: "设置", order: 4 }),
        new TreeAction({ key: "sort", name: "排序", order: 5 }),
        new TreeAction({ key: "delete", name: "删除", order: 6 }),
    ]
    _orgtree_setting = new ZtreeSetting({
        dataUrl: "tree/orgtreecontent",
        treeId: "orgtree",
        // dataUrl:"tree/orgtreenojob",
        actions: this._orgtree_actions
    })

    _job_col_model = [
        new ColModel({ label: "岗位名称", name: "jobName", width: "50%" }),
        new ColModel({ label: "岗位描述", name: "jobDesc", width: "50%" }),
        new ColModel({ label: "ID", name: "jobId", key: true, hidden: true })
    ]
    _job_grid_actions = [
        new JqgridAction({ key: "add", name: "新增", order: 2 }),
        new JqgridAction({ key: "edit", name: "编辑", order: 3 }),
        new JqgridAction({ key: "refresh", name: "刷新", order: 1 }),
        new JqgridAction({ key: "delete", name: "删除", order: 6 }),
    ]
    _job_grid_setting = new JqgridSetting({
        primaryKey: "jobId",
        title: "岗位管理",
        actions: this._job_grid_actions,
        url: "list/jobdatacontent",
        gridId: "jobmanage"
    })

    _model: any = {
        menu: {
            menuName: "", menuNo: ""
        },
        org: {
        },
        job: {

        }
    };

    constructor(private http: Http, private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver,
        private menuService: MenuService, private orgService: OrgService,
        private jobService: JobService, private modalService: ModalService) {
        this._modalContext = {
            vcRef: vcRef,
            componentFactoryResolver: componentFactoryResolver
        }
    }

    ngOnInit() {
        this.jobService.getAdminJobId().then((data) => {
            this.$model.adminJobId = data;
        })
        this.jobService.getEveryoneJobId().then((data) => {
            this.$model.everyoneJobId = data;
        })
    }

    onGridAction(event: JqgridEvent) {
        if (event.businessId == "jobmanage") {
            switch (event.action.key) {
                case "add":
                    let nodes: Array<TreeNode> = this.orgTree.getSelectedNodes();
                    if (nodes != undefined && nodes.length == 1) {
                        let node: TreeNode = nodes[0];
                        this._jobinfo_params.type = "add"
                        this._jobinfo_params.orgId = node.id;
                        this._model.job = {}
                        if ("-1" == node.id) {
                            this._model.job.jobScope = "0";
                        } else {
                            this._model.job.jobScope = "1";
                        }
                        this.modalService.open(
                            this._modalContext,
                            {
                                comp: JobinfoComponent,
                                title: '新增岗位',
                                width: '800px'
                            },
                            {
                                params: {
                                    type: 'add',
                                    orgId: node.id,
                                },
                                job: this._model.job
                            },
                            data => {
                                this.jobGrid.refresh();
                            }
                        );
                    }
                    break
                case "edit":
                    this.jobService.get(event.rowId).then((data) => {
                        this._model.job = data;
                        this._jobinfo_params.type = "edit"
                        this.modalService.open(
                            this._modalContext,
                            {
                                comp: JobinfoComponent,
                                title: '编辑岗位',
                                width: '800px'
                            },
                            {
                                params: {
                                    type: 'edit',
                                },
                                job: this._model.job
                            },
                            data => {
                                this.jobGrid.refresh();
                            }
                        );
                    })
                    break
                case "delete":
                    let ids: string[] = this.jobGrid.getSelectRowIds();
                    if (ids != undefined && ids.length > 0) {
                        this.jobService.deleteByIds(ids).then((data) => {
                            var node = this.orgTree.getSelectedNodes()
                            this.jobGrid.refresh({ orgId: node[0].id })
                        })
                    }
                    break
                case "refresh":
                    var node = this.orgTree.getSelectedNodes()
                    if (node != undefined && node.length > 0) {
                        this.jobGrid.refresh({ orgId: node[0].id })
                    }
            }
        }
    }

    onZtreeAction(treeEvent: TreeEvent) {
        // this.menuTreeEvent = treeEvent;
        if (treeEvent.businessId == "menutree") {
            switch (treeEvent.action.key) {
                case "edit":
                    this.menuService.getMenuByMenuId(treeEvent.node.id).then(data => {
                        // console.log("geted menu",data);
                        // this._model.menu = data;
                        // this._menuinfo_params.type = "edit"
                        // $('#testmodalid').modal('show')

                        this.modalService.open(
                            this._modalContext,
                            {
                                comp: MenuinfoComponent,
                                title: "编辑菜单信息"
                            },
                            {
                                model: data,
                                params: {
                                    type: "edit"
                                }
                            },
                            () => {

                            }
                        )
                    });
                    break
                case "add":
                    this._model.menu = {};
                    this._menuinfo_params.type = "add"
                    this._menuinfo_params.pNode = treeEvent.node;
                    this.modalService.open(
                        this._modalContext,
                        {
                            comp: MenuinfoComponent,
                            title: "编辑菜单信息"
                        },
                        {
                            model: {},
                            params: {
                                type: "add",
                                pNode: treeEvent.node
                            }
                        },
                        () => {

                        }
                    )
                    break
                case "refresh":
                    this.menuTree.refreshTree()
                    break
                case "delete":
                    var node = treeEvent.node;
                    this.menuService.deleteMenus([node.id]).then(() => {
                        this.menuTree.refreshTree();
                    })
                    break
                case "set":
                    this.resourceSet()
                    break
            }
        } else if (treeEvent.businessId == "orgtree") {
            switch (treeEvent.action.key) {
                case "edit":
                    let node1: any = treeEvent.node;
                    this.modalService.open(
                        this._modalContext,
                        {
                            comp: OrginfoComponent,
                            title: "编辑菜单信息"
                        },
                        {
                            model: {},
                            params: {
                                type: "edit",
                                id: node1.id
                            }
                        },
                        () => {

                        }
                    )

                    // let node1: any = treeEvent.node;
                    // this.orgService.getOrgByPK(node1.id, null).then(data => {
                    //     this._model.org = data;
                    //     this._orginfo_params.pNode = { id: node1.pid };
                    //     this._orginfo_params.type = "edit"
                    //     $('#orgmodal').modal('show')
                    // });
                    // $('#orgmodal').modal('show')
                    break;
                case "add":
                    this._model.org = {}
                    if (treeEvent.node.id == "-1") {
                        alert("通用岗位下不能新增机构!");
                        return;
                    }

                    this.modalService.open(
                        this._modalContext,
                        {
                            comp: OrginfoComponent,
                            title: "新增菜单信息"
                        },
                        {
                            params: {
                                type: "add",
                                pNode: treeEvent.node
                            }
                        },
                        () => {

                        }
                    )
                    break;
                case "refresh":
                    this.orgTree.refreshTree()
                    break;
                case "delete":
                    let node: TreeNode = treeEvent.node;
                    let delArray: Array<string> = [node.id]
                    this.orgService.deleteOrgByPKs(delArray).then(data => {
                        this.orgTree.refreshNode(null, treeEvent.node.pid, null)
                    })
                    break;
                // case "onclick":
                //     this.jobGrid.refresh({orgId:treeEvent.node.id})
                //     break                                                         
                default:
                    break;
            }
        }
    }

    onModalAction(event: ModalEvent) {
        switch (event.businessId) {
            case "testmodalid":
                if (event.action.key == "save") {
                    event.childContainer.modalOnSave().then((date) => {
                        this.menuTree.refreshSelectedNode();
                    })
                }
                break
            case "orgmodal":
                if (event.action.key == "save") {
                    event.childContainer.modalOnSave().then(() => {
                        this.orgTree.refreshSelectedNode();
                    })
                }
                break;
            case "jobmodalid":
                if (event.action.key == "save") {
                    event.childContainer.modalOnSave().then(() => {
                        var node = this.orgTree.getSelectedNodes();
                        this.jobGrid.refresh({ orgId: node[0].id })
                    })
                }
        }
    }

    onModalSave(data) {
        if (data != undefined && data.type == "menuupdate") {
            this.menuTree.refreshSelectedNode();
        } else if (data != undefined && data.type == "orgadd") {
            this.orgTree.refreshSelectedNode();
        } else if (data != undefined && data.type == "orgupdate") {
            this.orgTree.refreshSelectedNode();
        }
    }

    onModalCancel(data) {

    }

    resourceSet() {
        var jobIds = [];
        var jobNames = "";
        var __this = this;
        var delErrMess = "";
        var jobSelectNodes = this.jobGrid.getSelectDatas();
        if (_.isArray(jobSelectNodes) && jobSelectNodes.length > 0) {
            _.forEach(jobSelectNodes, function (value: any, key) {
                jobIds.push(value.jobId);
                jobNames += value.jobName + ",";
                if (__this.getAdministratorJobId() == value.jobId) {
                    delErrMess += value.jobName + ",";
                }
            });
        } else {
            toastr.warning('请选择需要设置资源的岗位！')
            return;
        }
        if (delErrMess.length > 0) {
            toastr.warning(delErrMess.substring(0, delErrMess.length - 1) + "不能设置资源！")
            return;
        }
        var resTreeNodeChecded = this.$model.resTreeNodeChecded;
        if (_.isUndefined(resTreeNodeChecded)) {
            toastr.warning('资源勾选没有变化，请选择需要设置的资源！')
            return;
        }
        var isEmpty = true;
        var addResIds = [];
        var delResIds = [];
        var addResNames = "";
        var delResNames = "";
        _.forEach(resTreeNodeChecded, function (value, key) {
            if (value.resChecked) {
                addResIds.push(value.id);
                addResNames += value.name + ",";
            } else {
                delResIds.push(value.id);
                delResNames += value.name + ",";
            }
            if (isEmpty) {
                isEmpty = false;
            }
        });

        if (isEmpty) {
            toastr.warning('资源勾选没有变化，请选择需要设置的资源！')
            return;
        } else {
            jobNames = jobNames.length > 0 ? jobNames.substring(0, jobNames.length - 1) : "";
            addResNames = addResNames.length > 0 ? "<br>待新增资源：" + addResNames.substring(0, addResNames.length - 1) : "";
            delResNames = delResNames.length > 0 ? "<br>待删除资源：" + delResNames.substring(0, delResNames.length - 1) : "";
        }
        this.modalService.openConfirm(
            this._modalContext,
            { message: "是否确认岗位设置资源?<br>待设置岗位：" + jobNames + addResNames + delResNames },
            () => {
                debugger
                this.http.post("jobresmgt/setprivileges", { "jobIds": jobIds, "addPrivileges": addResIds, "delPrivileges": delResIds }).toPromise()
                    .then(function (response) {
                        toastr.success('设置资源成功！')
                    });
            });
    }

    getAdministratorJobId() {
        return this.$model.adminJobId;
    }

    resTreeCallback: ZtreeCallback = {
        onCheck: (event, treeId, treeNode) => {
            var resTreeNodeChecded = this.$model.resTreeNodeChecded;
            if (_.isUndefined(resTreeNodeChecded)) {
                resTreeNodeChecded = {};
            }
            var privilegeId = treeNode.privilegeId;
            var resName = treeNode.noteTitle;
            var resChecked = treeNode.checked;
            if (treeNode.checkedOld == treeNode.checked) {
                delete resTreeNodeChecded[privilegeId];
            } else {
                resTreeNodeChecded[privilegeId] = { "id": privilegeId, "name": resName, "resChecked": resChecked };
            }
            this.$model.resTreeNodeChecded = resTreeNodeChecded;
            console.log("this.$model.resTreeNodeChecded", this.$model.resTreeNodeChecded)
        },
        onClick() {

        }
    }

    jobgridcall: JqgridCallback = {
        onSelectRow: (rowid, status, e) => {
            var selectRowIds = this.jobGrid.getSelectRowIds();
            if (selectRowIds.length == 1) {
                this.refreshResTree({ jobId: selectRowIds[0] });
            } else {
                this.refreshResTree({ jobId: "" });
            }
        },
        gridComplete() {

        }
    }

    orgTreeCall = _.assign(this.orgTreeCall, DefaultZtreeCallBack, {
        onClick: (event, treeId, treeNode, clickFlag) => {
            var selected = this.orgTree.getSelectedNodes()
            this.jobGrid.refresh({ orgId: selected[0].id })
        },
        onCheck: (event, treeId, treeNode, clickFlag) => {
            // this.userGrid.refresh({ orgId: treeNode.id })
        }
    })

    // 带参数刷新资源树
    refreshResTree(obj) {
        this.$model.resTreeNodeChecded = {};
        this.menuTree.refresh2(obj, true, true, false);
    }
}