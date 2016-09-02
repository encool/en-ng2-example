import { Component, OnInit, ViewChild, ViewContainerRef, Compiler } from '@angular/core';

import { OrgService } from '../service/org.service'
import { JobService } from '../service/job.service'
import { ModalService } from '../service/modal.service'

import { TreeNode } from '../shared/object/treenode'
import { onZtreeAction } from '../shared/interface/ztree_hook'
import { TreeAction } from '../shared/object/tree-action'
import { ModalAction } from '../shared/object/modal-action'

import { ZtreeComponent } from '../shared/component/ztree.component'
import { MenuinfoComponent } from './menuinfo.component'

import { TestComponent } from './test.component'

@Component({
    moduleId: module.id,
    selector: 'userorg-manage',
    templateUrl: 'userorg-manage.component.html'
})
export class UserorgManageComponent implements OnInit, onZtreeAction {

    _model:any = {
        org:{

        }
    }
    @ViewChild("orgtree_ref") orgTree:ZtreeComponent
    
    _orginfo_params:any = {}
    _orgtree_actions:Array<TreeAction> = [
        new TreeAction("refresh","刷新",1),
        new TreeAction("add","新增",2),
        new TreeAction("edit","编辑",3),
        new TreeAction("set","设置",4),
        new TreeAction("sort","排序",5),
        new TreeAction("delete","删除",6),
    ]
    _orgmodal_actions:Array<ModalAction> = [
        new ModalAction("cancel","取消",1,true),
        new ModalAction("save","保存",2) 
    ]

    constructor(private vcRef: ViewContainerRef, private compiler:Compiler,private orgService:OrgService,private modalService:ModalService) { }

    ngOnInit() { }

    onZtreeAction(treeEvent){
        if(treeEvent.businessId == "orgtree"){
            switch (treeEvent.action.key) {
                case "edit":
                    let node1:any = treeEvent.node;
                    this.orgService.getOrgByPK(node1.id,null).then(data=>{
                        this._model.org = data;
                        this._orginfo_params.pNode = {id:node1.pid};
                        this._orginfo_params.type = "edit"
                        $('#orgmodal').modal('show') 
                    });
                    break;
                case "add":debugger
                    // this.modalService.open(this.vcRef,this.compiler,TestComponent,{},a=>{})
                    this.modalService.open(this.vcRef,this.compiler,MenuinfoComponent,{},a=>{})

                    // this._model.org = {}
                    // if(treeEvent.node.id == "-1"){
                    //     alert("通用岗位下不能新增机构!");
                    //     return;
                    // }
                    // this._orginfo_params.pNode = treeEvent.node;
                    // this._orginfo_params.type = "add"
                    // $('#orgmodal').modal('show')                    
                    // break;
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
                    // this.jobGrid.refresh({orgId:treeEvent.node.id})
                    break                                                         
                default:
                    break;
            }     
        }
    }
}