import { Component ,OnInit, ViewChild, ViewContainerRef, Compiler } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import { TreeNode } from '../shared/object/treenode'
import { TreeEvent } from '../shared/object/treeevent'
import { ZtreeComponent } from '../shared/component/ztree.component'
import { JqgridComponent } from '../shared/component/jqgrid.component'
import { SharedModule } from '../shared/shared.module'
import { TreeAction } from '../shared/object/tree-action'
import { ModalAction } from '../shared/object/modal-action'
import { JqgridAction } from '../shared/object/jqgrid-action'
import { JqgridEvent } from '../shared/object/jqgrid-event'
import { ModalEvent } from '../shared/object/modal-event'
import { ColModel } from '../shared/object/col-model'

import { MenuService } from '../service/menu.service'
import { OrgService } from '../service/org.service'
import { JobService } from '../service/job.service'
import { ModalService } from '../service/modal.service'

import { onZtreeAction } from '../shared/interface/ztree_hook'
import { ZtreeCallback } from '../shared/interface/ztree.callback'
import { JqgridCallback } from '../shared/interface/jqgrid.callback'

@Component({
    moduleId: module.id,
    selector: 'resource-manage',
    templateUrl: 'resourcemanage.component.html',
})
export class ResourcemanageComponent implements OnInit,onZtreeAction{

    // private menuTreeEvent:TreeEvent
    @ViewChild("menutree_ref") menuTree:ZtreeComponent
    @ViewChild("orgtree_ref") orgTree:ZtreeComponent
    @ViewChild("jobgrid_ref") jobGrid:JqgridComponent

    $model:any = {}
    _orginfo_params:any = {}
    _menuinfo_params:any = {}
    _jobinfo_params:any = {}

    _menutree_autoParam = ["id","pid","type","checked","virtual"];

    _menumodal_actions:Array<ModalAction> = [
        new ModalAction("cancel","取消",1,true),
        new ModalAction("save","保存",2)
    ]
    _orgmodal_actions:Array<ModalAction> = [
        new ModalAction("cancel","取消",1,true),
        new ModalAction("save","保存",2) 
    ]

    _menutree_actions:Array<TreeAction> = [
        new TreeAction("refresh","刷新",1),
        new TreeAction("add","新增",2),
        new TreeAction("edit","编辑",3),
        new TreeAction("set","设置",4),
        new TreeAction("sort","排序",5),
        new TreeAction("delete","删除",6),
    ]
    _orgtree_actions:Array<TreeAction> = [
        new TreeAction("refresh","刷新",1),
        new TreeAction("add","新增",2),
        new TreeAction("edit","编辑",3),
        new TreeAction("set","设置",4),
        new TreeAction("sort","排序",5),
        new TreeAction("delete","删除",6),
    ]

    _job_col_model = [
        new ColModel("岗位名称","jobName","50%"),
        new ColModel("岗位描述","jobDesc","50%"),
        new ColModel("ID","jobId",null,null,true,true)
    ]
    _job_grid_actions = [
        new JqgridAction("add","新增",2),
        new JqgridAction("edit","编辑",3),
        new JqgridAction("refresh","刷新",1),
        new JqgridAction("delete","删除",6),
    ]

    _model:any = {
        menu:{
            menuName:"",menuNo:""
        },
        org:{
        },
        job:{

        }
    };

    constructor(private http:Http,private vcRef: ViewContainerRef, private compiler:Compiler,
                    private menuService:MenuService,private orgService:OrgService,
                    private jobService:JobService,private modalService:ModalService){
    }
 
    ngOnInit(){
        this.jobService.getAdminJobId().then((data)=>{
            this.$model.adminJobId = data;
        })
        this.jobService.getEveryoneJobId().then((data)=>{
            this.$model.everyoneJobId = data;
        })
    }

    onGridAction(event:JqgridEvent){
        if(event.businessId == "jobmanage"){
            switch(event.action.key){
                case "add":
                    let nodes:Array<TreeNode> = this.orgTree.getSelectedNodes();
                    if(nodes!=undefined && nodes.length == 1){
                        let node:TreeNode = nodes[0];
                        this._jobinfo_params.type = "add"
                        this._jobinfo_params.orgId = node.id;
                        this._model.job = {}
                        if("-1"==node.id){
                            this._model.job.jobScope = "0";
                        }else{
                            this._model.job.jobScope = "1";
                        }
                        $('#jobmodalid').modal('show')
                    }
                    break
                case "edit":
                    this.jobService.get(event.rowId).then((data)=>{
                        this._model.job = data;
                        this._jobinfo_params.type = "edit"
                        // this._jobinfo_params.orgId
                        $('#jobmodalid').modal('show')
                    })
                    break
                case "delete":
                    let ids:string[] = this.jobGrid.getSelectRowIds();
                    if(ids!=undefined && ids.length > 0){
                        this.jobService.deleteByIds(ids).then((data)=>{
                            var node = this.orgTree.getSelectedNodes()
                            this.jobGrid.refresh({orgId:node[0].id})
                        })
                    }
                    break
                case "refresh":
                    var node = this.orgTree.getSelectedNodes()
                    if(node!=undefined && node.length > 0){
                        this.jobGrid.refresh({orgId:node[0].id})
                    }                   
            }
        }
    }

    onZtreeAction(treeEvent:TreeEvent){
        // this.menuTreeEvent = treeEvent;
        if (treeEvent.businessId == "menutree") {
            switch(treeEvent.action.key){
                case "edit":
                    this.menuService.getMenuByMenuId(treeEvent.node.id).then(data => {
                        // console.log("geted menu",data);
                        this._model.menu = data;
                        this._menuinfo_params.type = "edit"
                        $('#testmodalid').modal('show')
                    });
                    break
                case "add":
                    this._model.menu = {};
                    this._menuinfo_params.type = "add"
                    this._menuinfo_params.pNode = treeEvent.node;
                    $('#testmodalid').modal('show')
                    break
                case "refresh":
                    this.menuTree.refreshTree()
                    break
                case "delete":
                    var node = treeEvent.node;
                    this.menuService.deleteMenus([node.id]).then(()=>{
                        this.menuTree.refreshTree();
                    })
                    break                
                case "set":
                    this.resourceSet()
                    break                
            } 
        } else if(treeEvent.businessId == "orgtree"){
            switch (treeEvent.action.key) {
                case "edit":
                    let node1:any = treeEvent.node;
                    this.orgService.getOrgByPK(node1.id,null).then(data=>{
                        this._model.org = data;
                        this._orginfo_params.pNode = {id:node1.pid};
                        this._orginfo_params.type = "edit"
                        $('#orgmodal').modal('show')
                    });
                    $('#orgmodal').modal('show')                     
                    break;
                case "add":
                    this._model.org = {}
                    if(treeEvent.node.id == "-1"){
                        alert("通用岗位下不能新增机构!");
                        return;
                    }
                    this._orginfo_params.pNode = treeEvent.node;
                    this._orginfo_params.type = "add"
                    $('#orgmodal').modal('show')                    
                    break;
                case "refresh":
                    this.orgTree.refreshTree()                
                    break;
                case "delete":
                    let node:TreeNode = treeEvent.node;
                    let delArray:Array<string> = [node.id]
                    this.orgService.deleteOrgByPKs(delArray).then(data=>{
                        this.orgTree.refreshNode(null,treeEvent.node.pid,null)
                    })                    
                    break;   
                case "onclick":
                    this.jobGrid.refresh({orgId:treeEvent.node.id})
                    break                                                         
                default:
                    break;
            }     
        }
    }

    onModalAction(event:ModalEvent){ 
        switch(event.businessId){
            case "testmodalid":
                if(event.action.key == "save"){
                    event.childContainer.modalOnSave().then((date)=>{
                        this.menuTree.refreshSelectedNode();
                    })
                }
                break
            case "orgmodal":
                if(event.action.key == "save"){
                    event.childContainer.modalOnSave().then(()=>{
                        this.orgTree.refreshSelectedNode();
                    })               
                }
                break;  
            case "jobmodalid":  
                if(event.action.key == "save"){
                    event.childContainer.modalOnSave().then(()=>{
                        var node = this.orgTree.getSelectedNodes();
                        this.jobGrid.refresh({orgId:node[0].id})
                    })               
                }                          
        }
    }

    onModalSave(data){
        if(data!=undefined && data.type ==  "menuupdate"){
            this.menuTree.refreshSelectedNode();
        }else if (data!=undefined && data.type ==  "orgadd") {
            this.orgTree.refreshSelectedNode();
        } else if(data!=undefined && data.type == "orgupdate"){
            this.orgTree.refreshSelectedNode();
        }   
    }

    onModalCancel(data){
        
    }

    resourceSet(){
        var jobIds = [];
        var jobNames = "";	
        var __this = this;
        var delErrMess = "";
        var jobSelectNodes = this.jobGrid.getSelectDatas();
        if(_.isArray(jobSelectNodes) && jobSelectNodes.length>0){		
            _.forEach(jobSelectNodes, function (value:any, key) {
                    jobIds.push(value.jobId);
                    jobNames += value.jobName+",";
                    if(__this.getAdministratorJobId()==value.jobId){
                        delErrMess += value.jobName+",";
                    }
                });        	
        }else{
            // Messenger.post({
            //     'message': "请选择需要设置资源的岗位！",
            //     'type': 'error',
            // });
            return;
        }
        if(delErrMess.length>0){
                // Messenger.post({
                //         'message': delErrMess.substring(0,delErrMess.length-1) + "不能设置资源！",
                //         'type': 'error',
                //     });
                return;
        }
        
        var resTreeNodeChecded = this.$model.resTreeNodeChecded;
        
        if(_.isUndefined(resTreeNodeChecded)){
            // Messenger.post({
            //     'message': "资源勾选没有变化，请选择需要设置的资源！",
            //     'type': 'error',
            // });
            return;
        }
        var isEmpty = true;
        var addResIds = [];
        var delResIds = [];
        var addResNames = "";
        var delResNames = ""; 	
        _.forEach(resTreeNodeChecded, function (value, key) {
            if(value.resChecked){
                addResIds.push(value.id);
                addResNames += value.name + ",";
            }else{
                delResIds.push(value.id);
                delResNames += value.name + ",";
            }
            if(isEmpty){
                isEmpty = false;
            }
        });	
        
        if(isEmpty){
            // Messenger.post({
            //     'message': "资源勾选没有变化，请选择需要设置的资源！",
            //     'type': 'error',
            // });
            return;
        }else{
            jobNames = jobNames.length>0?jobNames.substring(0, jobNames.length-1):"";
            addResNames = addResNames.length>0?"<br>待新增资源："+addResNames.substring(0, addResNames.length-1):"";
            delResNames = delResNames.length>0?"<br>待删除资源："+delResNames.substring(0, delResNames.length-1):"";
        }
        this.modalService.openConfirm(this.vcRef,this.compiler,{message:"是否确认岗位设置资源?<br>待设置岗位："+jobNames+addResNames+delResNames},()=>{
            debugger
            this.http.post("jobresmgt/setprivileges",{"jobIds":jobIds,"addPrivileges":addResIds,"delPrivileges":delResIds}).toPromise()
                    .then(function(response){ 
                        // Messenger.post({
                        //     'message': "设置资源成功！",
                        //     'type': 'success',
                        // });	           
                    });
            
        });        
    }

    getAdministratorJobId(){
        return this.$model.adminJobId;
    }

    resTreeCallback:ZtreeCallback = {
        onCheck:(event, treeId, treeNode)=>{
            var resTreeNodeChecded = this.$model.resTreeNodeChecded;
            
            if(_.isUndefined(resTreeNodeChecded)){
                resTreeNodeChecded = {};
            }
            
            var privilegeId = treeNode.privilegeId;
            var resName = treeNode.noteTitle;
            var resChecked = treeNode.checked;
            
            if(treeNode.checkedOld==treeNode.checked){
                delete resTreeNodeChecded[privilegeId];
            }else{		
                resTreeNodeChecded[privilegeId] = {"id":privilegeId,"name":resName,"resChecked":resChecked};
            }
            
            this.$model.resTreeNodeChecded = resTreeNodeChecded;  
            console.log("this.$model.resTreeNodeChecded",this.$model.resTreeNodeChecded)     
        },
        onSelectRow:(rowid,status,e)=>{}
    }
 
    jobgridcall:JqgridCallback = {
        onSelectRow:(rowid,status,e)=>{
            var selectRowIds = this.jobGrid.getSelectRowIds();	
            if(selectRowIds.length==1){
                this.refreshResTree({jobId:selectRowIds[0]});
            }else{
                this.refreshResTree({jobId:""});
            }
        }        
    }

    // 带参数刷新资源树
    refreshResTree(obj){
        this.$model.resTreeNodeChecded = {};	
        this.menuTree.refresh2(obj,true,true,false);
    }   
}