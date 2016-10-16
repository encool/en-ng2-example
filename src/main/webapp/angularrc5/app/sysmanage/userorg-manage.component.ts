import { Component, OnInit, ViewChild, ViewContainerRef, Compiler, Type, ComponentFactoryResolver } from '@angular/core';

import * as _ from "lodash"

import { OrgService } from '../service/org.service'
import { JobService } from '../service/job.service'
import { ModalService } from '../service/modal.service'
import { UserService } from '../service/user.service'

import { JqgridSetting, JqgridAction, JqgridEvent, JqgridCallback, DefaultJqgridCallback, ColModel, JqgridComponent} from '../shared/jqgrid.module'
import { TreeEvent, ZtreeSetting, ZtreeComponent, onZtreeAction, TreeAction, TreeNode, ZtreeCallback, DefaultZtreeCallBack} from '../shared/ztree.module'


import { ModalAction } from '../shared/object/modal-action'
import { OrginfoComponent } from './orginfo.component'
import { SysmanageModule } from './sysmanage.module'
import { UserinfoComponent } from './userinfo.component'

@Component({
    selector: 'userorg-manage',
    templateUrl: './userorg-manage.component.html'
})
export class UserorgManageComponent implements OnInit, onZtreeAction {

    _model: any = {
        org: {

        },
        user: {

        }
    }
    @ViewChild("jobtree_ref") jobTree: ZtreeComponent
    @ViewChild("orgtree_ref") orgTree: ZtreeComponent
    @ViewChild("usergrid_ref") userGrid: JqgridComponent
    _modalContext: {
        vcRef: ViewContainerRef,
        compiler: Compiler,
        ngModule: Type<any>
        componentFactoryResolver:ComponentFactoryResolver
    }
    _orginfo_params: any = {}
    _orgtree_actions: Array<TreeAction> = [
        new TreeAction({ key: "refresh", name: "刷新", order: 1 }),
        new TreeAction({ key: "add", name: "新增", order: 2 }),
        new TreeAction({ key: "edit", name: "编辑", order: 3 }),
        new TreeAction({ key: "set", name: "设置", order: 4 }),
        new TreeAction({ key: "sort", name: "排序", order: 5 }),
        new TreeAction({ key: "delete", name: "删除", order: 6 }),
    ]
    _orgtree_setting = new ZtreeSetting({
        treeId:"orgtree",
        dataUrl:"tree/orgtreenojob",
        actions:this._orgtree_actions
    })

    _jobtree_actions: Array<TreeAction> = [
        new TreeAction({ key: "refresh", name: "刷新", order: 1 }),
        new TreeAction({ key: "set", name: "设置", order: 4 }),
    ]
    _jobtree_setting = new ZtreeSetting({
        treeId:"jobtree",
        dataUrl:"tree/orgjobtree",
        actions:this._jobtree_actions,
        checkEnable:true,
        nameIsHTML:true
    })

    _usermodal_actions: Array<ModalAction> = [
        new ModalAction({ key: "cancel", name: "取消", order: 1, cancel: true, style:"default" }),
        new ModalAction({ key: "close", name: "保存", order: 2 })
    ]
    _usermgt_col_model = [
        new ColModel({ label: "账号", name: "userName", width: "50%" }),
        new ColModel({ label: "姓名", name: "userRealname", width: "50%" }),
        new ColModel({ label: "ID", name: "userId", hidden: true, key: true }),
    ]
    _usermgt_grid_actions = [
        new JqgridAction({ key: "add", name: "新增", order: 2 }),
        new JqgridAction({ key: "edit", name: "编辑", order: 3 }),
        new JqgridAction({ key: "refresh", name: "刷新", order: 1 }),
        new JqgridAction({ key: "delete", name: "删除", order: 6 }),
    ]
    _usermgt_grid_setting = new JqgridSetting({
        gridId:"usermanage",
        primaryKey:"userId",
        url:"list/orgusercontent",
        title:"用户管理",
        actions:this._usermgt_grid_actions,
    })

    constructor(private componentFactoryResolver:ComponentFactoryResolver,private vcRef: ViewContainerRef, private compiler: Compiler,
        private orgService: OrgService, private modalService: ModalService,
        private userService: UserService) {
        this._modalContext = {
            vcRef: vcRef,
            compiler: compiler,
            ngModule: SysmanageModule,
            componentFactoryResolver:componentFactoryResolver
        }
    }

    ngOnInit() { }

    onGridAction(event: JqgridEvent) {
        if (event.businessId == 'usermanage') {
            switch (event.action.key) {
                case 'add':
                    console.log('event', event);
                    this.addUser();
                    break;
                case 'edit':
                    this.editUser(event)
                    break;
                case 'delete':
                    let ids:string[] = this.userGrid.getSelectRowIds();
                    if(ids!=undefined && ids.length > 0){
                        this.userService.deleteByIds(ids).then((data)=>{
                            this.userGrid.refresh()
                        })
                    }else{
                        toastr.warning('请选择需要删除的记录！')
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

    addUser() {
        var selectNode = this.orgTree.getSelectedNodes()[0];
        if (_.isUndefined(selectNode) || _.isUndefined(selectNode.id)) {
            toastr.warning('请选择需要新增用户的机构！')
        } else if ("0" == selectNode.id) {
            toastr.warning(selectNode.name+"下不允许新增用户！")
        } else {
            this._model.user = {}
            this.modalService.open(
                this._modalContext,
                {
                    comp: UserinfoComponent,
                    width: "800px",
                    actions:this._usermodal_actions
                },
                {
                    user: this._model.user,
                    params: {
                        type: "add",
                        orgId: selectNode.id
                    }
                },
                (data) => {
                    this.userGrid.refresh();
                    console.log('addUser success',this._model);
                }
            )

            // this.modalService.openConfirm(
            //     this._modalContext,
            //     {
            //         message:"11",
            //         width: "800px",
            //         actions:this._usermodal_actions
            //     },
            //     (data) => {
            //         this.userGrid.refresh();
            //         console.log('addUser success',this._model);
            //     }
            // )

        }
    }

    editUser(event:JqgridEvent){
        if(event.rowId == undefined){
            toastr.warning("请选择一条用户记录！")
            return
        }
        if(event.rowDatas.length > 1){
            toastr.warning('请只选择一条记录！')
            return
        }
        var selectNode = this.orgTree.getSelectedNodes()[0];
        this.userService.getUserByPK(event.rowId).then(data =>{
            this._model.user = data
            this.modalService.open(
                this._modalContext,
                {
                    comp: UserinfoComponent,
                    width: "800px",
                    actions:this._usermodal_actions
                },
                {
                    user: this._model.user,
                    params: {
                        type: "edit",
                        // orgId: selectNode.id
                    }
                },
                (data) => {
                    this.userGrid.refresh();
                    console.log('addUser success',this._model);
                }
            )            
        })
    }

    onZtreeAction(treeEvent:TreeEvent) {
        if (treeEvent.businessId == "orgtree") {
            switch (treeEvent.action.key) {
                case "edit":
                    let node1: any = treeEvent.node;
                    this.orgService.getOrgByPK(node1.id, null).then(data => {
                        this._model.org = data;
                        this._orginfo_params.pNode = { id: node1.pid };
                        this._orginfo_params.type = "edit"

                        this.modalService.open(
                            this._modalContext,
                            { comp: OrginfoComponent, width: "600px" },
                            { org: data, params: this._orginfo_params },
                            (data) => {
                                this.orgTree.refreshTree()
                            },
                            (data) => {
                                console.log('data', data);
                            }
                        )
                        // $('#orgmodal').modal('show') 
                    });
                    break;
                case "add":
                    this._model.org = {}
                    if (treeEvent.node.id == "-1") {
                        alert("通用岗位下不能新增机构!");
                        return;
                    }
                    this._orginfo_params.pNode = treeEvent.node;
                    this._orginfo_params.type = "add"
                    this.modalService.open(
                        this._modalContext,
                        { comp: OrginfoComponent, width: "600px" },
                        { org: this._model.org, params: this._orginfo_params },
                        a => {
                            this.orgTree.refreshTree()
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
                case "onclick":
                    // this.jobGrid.refresh({orgId:treeEvent.node.id})
                    break
                default:
                    break;
            }
        }else if(treeEvent.businessId = "jobtree"){
            switch (treeEvent.action.key) {
                case "set":
                    this.jobtreeSet()
                    break;
            
                default:
                    break;
            }
        }
    }

    jobtreeSet(){
        var userIds = [];
        var userNames = "";
        var jobIds = [];
        var jobNames = "";		
        var userSelectNodes = this.userGrid.getSelectDatas();
        if(_.isArray(userSelectNodes) && userSelectNodes.length>0){		
            _.forEach(userSelectNodes, function (value:any, key) {
                    userIds.push(value.userId);
                    userNames += value.userRealname+",";
                });        	
        }else{
            toastr.warning('请选择需要设置岗位的用户')
            return;
        }
        var jobSelectNodes = this.jobTree.getCheckedNodes(true);
        if(_.isArray(jobSelectNodes) && jobSelectNodes.length>0){		
            _.forEach(jobSelectNodes, function (value:any, key) {				
                        jobIds.push(value.id);
                        jobNames += value.hiddenName+",";
                });     
            this.modalService.openConfirm(
                this._modalContext,
                {
                    message:"是否确认用户设置岗位?<br>待设置用户："+userNames.substring(0, userNames.length-1)+"<br>被设置岗位："+jobNames.substring(0, jobNames.length-1)
                },
                data =>{
                    this.userService.setJobs(userIds,jobIds).then(
                        data =>{
                            toastr.success("设置岗位成功！")
                        }
                    )
                })   
            // Modal.openConfirm({message:"是否确认用户设置岗位?<br>待设置用户："+userNames.substring(0, userNames.length-1)+"<br>被设置岗位："+jobNames.substring(0, jobNames.length-1)},function(){
            //     $http.post("ws/userSetJobs",{"userIds":userIds,"jobIds":jobIds})
            //             .success(function(data, status, headers, config){
            //                 Messenger.post({
            //                     'message': "设置岗位成功！",
            //                     'type': 'success',
            //                 });	           
            //             });
            // });		
        }else{
            this.modalService.openConfirm(
                this._modalContext,
                {
                    message:"是否确认回收用户的所有岗位?<br>待回收岗位的用户："+userNames.substring(0, userNames.length-1)
                },
                data =>{
                    this.userService.removeAllJobs(userIds).then(
                        data =>{
                            toastr.success("设置岗位成功！")
                        }
                    )
                })            
            // Modal.openConfirm({message:"是否确认回收用户的所有岗位?<br>待回收岗位的用户："+userNames.substring(0, userNames.length-1)},function(){
            //     $http.post("ws/userRemoveAllJobs",{"userIds":userIds})
            //             .success(function(data, status, headers, config){
            //                 Messenger.post({
            //                     'message': "回收岗位成功！",
            //                     'type': 'success',
            //                 });	           
            //             });
            // });	
        }      
    }

    userGridCall: JqgridCallback = _.assign(this.userGridCall, DefaultJqgridCallback, {
        onSelectRow:(rowid:string,status:string,e:any) => {
            var selectRowIds = this.userGrid.getSelectRowIds();	
            if(selectRowIds.length>0){		
                this.refresh2OrgJobTree({userIds:selectRowIds});
            }else{
                this.refresh2OrgJobTree({userIds:[]});
            }
        }
    })

    orgTreeCall = _.assign(this.orgTreeCall, DefaultZtreeCallBack, {
        onClick: (event, treeId, treeNode, clickFlag) => {
            this.userGrid.refresh({ orgId: treeNode.id })
        }
    })

    jobTreeCall = _.assign(this.jobTreeCall, DefaultZtreeCallBack, {
        onClick: (event, treeId, treeNode, clickFlag) => {
            // this.userGrid.refresh({ orgId: treeNode.id })
        },
        onCheck: (event, treeId, treeNode, clickFlag) => {
            // this.userGrid.refresh({ orgId: treeNode.id })
        }
    })

    refresh2OrgJobTree(obj){
        this.jobTree.refresh2(obj,true,false,false)
    }
}