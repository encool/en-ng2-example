import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import * as _ from 'lodash';

import { TreeEvent } from '../object/treeevent'
import { TreeNode } from '../object/treenode'
import { TreeAction } from '../object/tree-action'
import { TreeActionKeys } from '../enum/tree-action-keys'
import { ZtreeCallback } from '../interface/ztree.callback'

@Component({
    moduleId:module.id,
    selector: 'my-ztree',
    template: `
            <ul [id]="treeId" class="ztree"></ul>
            <div [id]="_rMenuId" style="z-index: 1" class="rMenu" oncontextmenu="return false">
                <ul>
                    <li *ngFor="let action of actions" (click)="onAction(action)">{{action.name}}</li>
                </ul>
            </div>
        `,
    styleUrls:  ['ztree.component.css']
})
export class ZtreeComponent {
    @Input() treeId:string;
    @Input() rootNodeName:string;
    @Input() dataUrl:string;
    @Input() actions:Array<TreeAction> = []
    //otherParam
    @Input() params:any = {}
    //自动提交参数
    @Input() autoParam:Array<string> = ["id","pid"]
    //初始展开所有
    @Input() expendAll:boolean = false;
    //初始展开层级
    @Input() expendLevel:number = 1;     
    //多选 按住ctrl键可多选
    @Input() selectedMulti:boolean = false

    //勾选
    @Input() checkEnable:boolean = false
    //checkbox 或 radio
    @Input() checkStyle:string = "checkbox"
    // Y 属性定义 checkbox 被勾选后的情况； 
    // N 属性定义 checkbox 取消勾选后的情况； 
    // "p" 表示操作会影响父级节点； 
    // "s" 表示操作会影响子级节点。
    @Input() chkboxType:any = { "Y" : "p", "N" : "s" };
    // 设置自动关联勾选时是否触发 beforeCheck / onCheck 事件回调函数。
    @Input() autoCheckTrigger:boolean = false;

    //多选树 单选树？
    treeType:string

    @Input() callback:ZtreeCallback

    @Output() zevent = new EventEmitter<TreeEvent>();

    public zTreeObj:any;
    private _rMenuId:string;
    private rMenu:any;
    private _treeStateKeep:Function
 

    constructor(private http: Http) { }

    ngOnInit() {
        this._rMenuId = "_rMenuId"+this.treeId;
    };

    ngAfterViewInit(){
        // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
        var setting = {
            async: {
                enable: true,
                type: "post",
                url: this.dataUrl,
                // contentType: "application/json",
                autoParam: this.autoParam,
                otherParam:this.params,
                dataType:"text",
                dataFilter: (treeId, parentNode, responseData) => {
                    return responseData;
                    //下拉树有chkDisabled属性时，去除勾选方法失效
                    // if(this.treeType=="selectTree"){
                    //     _.forEach(responseData,function(v,n){
                    //         delete v.chkDisabled;
                    //     });
                    // }
                    // var params = {treeId: treeId, parentNode: parentNode, responseData: responseData};
                    // return UIDirectiveService.invoke(attrs.filter, scope.filter, params, responseData);
                }                
            },

            data: {
                keep:{
                    leaf:false,
                    parent:false
                },
                key: {
                    children: "children",
                    // name: attrs.nodeName,
                    // title: attrs.nodeTitle,
                    checked:"checked",
                    url:"url"
                },
                simpleData: {
                    enable: "true",
                    idKey: "id",
                    pIdKey: "pid",
                    rootPId: null //用于修正根节点父节点数据，即 pIdKey 指定的属性值
                }
            },

            view: {
                // nameIsHTML:scope.nameIsHtml,
                selectedMulti: this.selectedMulti,
                // showIcon: scope.showIcon,
                // showTitle: scope.showTitle,
                //搜索树的样式
                fontCss: function (treeId, treeNode) {
                    return (!!treeNode.highlight) ? {color: "#A60000", "font-weight": "bold"} : {color: "#333", "font-weight": "normal","font-family":"微软雅黑, STHei, 华文黑体"};
                }
            },
            check: {
                autoCheckTrigger: this.autoCheckTrigger,
                chkboxType: this.chkboxType,
                enable: this.checkEnable,
                chkStyle: this.checkStyle,
                radioType: "all",
                nocheckInherit:false,
                chkDisabledInherit:false
            },

            callback: {
                onRightClick: this.OnRightClick.bind(this),
                onClick: (event, treeId, treeNode, clickFlag) =>{
                    let action:TreeAction = new TreeAction("onclick","点击") 
                    let treeevent:TreeEvent = new TreeEvent(treeNode,this.treeId,action,null,event)
                    this.zevent.emit(treeevent)
                    // scope.nodeClick({event: event, treeId: treeId, treeNode: treeNode, clickFlag:clickFlag});
                },

                onAsyncSuccess:(event, treeId, treeNode, msg)=>{
                    var ztree = this.zTreeObj;
                    if(this.expendAll){
                        var expendTreeNodes = _.isUndefined(treeNode)||treeNode==null?ztree.getNodes():treeNode.children;
                        _.forEach(expendTreeNodes,function(node,n){
                            if(node.isParent)ztree.expandNode(node,true,false,false);
                        });
                    }else{
                        if (this.expendLevel&&this.expendLevel>0) {
                            var expendTreeNodes = _.isUndefined(treeNode)||treeNode==null?ztree.getNodes():treeNode.children;
                            _.forEach(expendTreeNodes,(node,n)=>{
                                if(node.isParent&&node.level < this.expendLevel){
                                    ztree.expandNode(node,true,false,false);
                                }
                            });
                        }
                    }
                    
                    if(!_.isUndefined(this._treeStateKeep))
                        this._treeStateKeep();
                    
                    // this.onAsyncSuccess({event:event,treeId:treeId,treeNode:treeNode,msg:msg});
                },

                // beforeAsync: function (treeId, treeNode) {
                //     var params = {treeId: treeId, treeNode: treeNode};
                //     // return UIDirectiveService.invoke(attrs.beforeAsync, scope.beforeAsync, params, true);
                // },
                // beforeCheck: function (treeId, treeNode) {
                //     var params = {treeId: treeId, treeNode: treeNode};
                //     // return UIDirectiveService.invoke(attrs.beforeCheck, scope.beforeCheck, params, true);
                // },
                // beforeClick: function (treeId, treeNode, clickFlag) {
                //     var params = {treeId: treeId, treeNode: treeNode, clickFlag: clickFlag};
                //     // return UIDirectiveService.invoke(attrs.beforeClick, scope.beforeClick, params, true);
                // },
                // beforeDblClick: function (treeId, treeNode) {
                //     var params = {treeId: treeId, treeNode: treeNode};
                //     // return UIDirectiveService.invoke(attrs.beforeDblClick, scope.beforeDblClick, params, true);
                // },
                // //用于捕获节点被拖拽之前的事件回调函数
                // beforeDrag: function (treeId, treeNodes) {
                //     var params = {treeId: treeId, treeNodes: treeNodes};
                //     // return UIDirectiveService.invoke(attrs.beforeDrag, scope.beforeDrag, params, true);
                // },
                // //用于捕获节点拖拽操作结束之前的事件回调函数，并且根据返回值确定是否允许此拖拽操作
                // beforeDrop: function (treeId, treeNodes, targetNode, moveType, isCopy) {
                //     var params = {treeId: treeId, treeNodes: treeNodes, targetNode: targetNode, moveType: moveType, isCopy: isCopy};
                //     // return UIDirectiveService.invoke(attrs.beforeDrop, scope.beforeDrop, params, true);
                // },
                // //用于捕获节点被删除之前的事件回调函数，并且根据返回值确定是否允许删除操作
                // beforeRemove: function (treeId, treeNode) {
                //     var params = {treeId: treeId, treeNode: treeNode};
                //     // return UIDirectiveService.invoke(attrs.beforeRemove, scope.beforeRemove, params, true);
                // },
                // beforeRename: function(treeId, treeNode, newName, isCancel){
                //     var params = {treeId: treeId, treeNode: treeNode,newName:newName,isCancel:isCancel};
                //     // return UIDirectiveService.invoke(attrs.beforeRename, scope.beforeRename, params, true);
                // },
                // //用于捕获 鼠标右键点击之前的事件回调函数，并且根据返回值确定触发 onRightClick 事件回调函数
                // beforeRightClick: function (treeId, treeNode) {
                //     var params = {treeId: treeId, treeNode: treeNode};
                //     // return UIDirectiveService.invoke(attrs.beforeRightClick, scope.beforeRightClick, params, true);
                // },
                // onAsyncError: function (event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
                //     // scope.onAsyncError({event: event, treeId: treeId, treeNode: treeNode, XMLHttpRequest: XMLHttpRequest, textStatus: textStatus, errorThrown: errorThrown});
                // },
                // onAsyncSuccess:function(event, treeId, treeNode, msg){
                //     // var ztree = controller.getZtree();
                //     // if(scope.expendAll){
                //     //     var expendTreeNodes = angular.isUndefined(treeNode)||treeNode==null?ztree.getNodes():treeNode.children;
                //     //     angular.forEach(expendTreeNodes,function(node,n){
                //     //         if(node.isParent)ztree.expandNode(node,true,false,false);
                //     //     });
                //     // }else{
                //     //     if (scope.expendLevel&&scope.expendLevel>0) {
                //     //         var expendTreeNodes = angular.isUndefined(treeNode)||treeNode==null?ztree.getNodes():treeNode.children;
                //     //         angular.forEach(expendTreeNodes,function(node,n){
                //     //             if(node.isParent&&node.level < scope.expendLevel)ztree.expandNode(node,true,false,false);
                //     //         });
                //     //     }
                //     // }
                    
                //     // if(angular.isDefined(controller.treeStateKeep))controller.treeStateKeep();
                    
                //     // scope.onAsyncSuccess({event:event,treeId:treeId,treeNode:treeNode,msg:msg});
                // },
                onCheck: (event, treeId, treeNode) => {
                    this.callback.onCheck(event, treeId, treeNode);
                    // scope.nodeCheck({event: event, treeId: treeId, treeNode: treeNode});
                },

                // onDblClick: function (event, treeId, treeNode) {
                //     // scope.nodeDblClick({event: event, treeId: treeId, treeNode: treeNode});
                // },
                // onDrag: function (event, treeId, treeNodes) {
                //     // scope.nodeDrag({event: event, treeId: treeId, treeNodes: treeNodes});
                // },
                // onDragMove: function (event, treeId, treeNodes) {
                //     // scope.nodeDragMove({event: event, treeId: treeId, treeNodes: treeNodes});
                // },
                // onDrop: function (event, treeId, treeNodes, targetNode, moveType, isCopy) {
                //     // scope.nodeDrop({event: event, treeId: treeId, treeNodes: treeNodes, targetNode: targetNode, moveType: moveType, isCopy: isCopy});
                // },
                // onRemove: function (event, treeId, treeNode) {
                //     // scope.nodeRemove({event: event, treeId: treeId, treeNode: treeNode});
                // },
                // onRename: function (event, treeId, treeNode, isCancel) {
                //     // scope.nodeRename({event: event, treeId: treeId, treeNode: treeNode, isCancel: isCancel});
                // }
//                    onExpand: function (event, treeId, treeNode) {
                        //只需要简单数据模型进行model同步，普通模型在修改模型时，自动同步所有树的结构
//                        if (!asyncEnable) {
//                            var treeModelNode = UIDirectiveService.getTreeSimpleDataModelNode(scope.bindData, "id", treeNode.id);
//                            treeModelNode = true;
//                        }
//                    },
//                    onCollapse: function (event, treeId, treeNode) {
//                        if (!asyncEnable) {
//                            var treeModelNode = UIDirectiveService.getTreeSimpleDataModelNode(scope.bindData, "id", treeNode.id);
//                            treeModelNode = false;
//                        }
//                    }
                },                      
        };

        // let urlSearchParams = new URLSearchParams();
        // urlSearchParams.set("id","root");
        // urlSearchParams.set("pid","null");
        // this.http.get(this.dataUrl,{search:urlSearchParams}).toPromise()
        //     .then((data)=>{
        //         var zNodes = data.json();
        //         this.zTreeObj = $.fn.zTree.init($('#'+this.treeId), setting, zNodes);               
        //     })
        //     .catch(this.handleError);

        this.zTreeObj = $.fn.zTree.init($('#'+this.treeId), setting);               
            
        // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）

        this.rMenu = $("#"+this._rMenuId);
        //默认展开root节点
        // this.zTreeObj.expandNode(this.zTreeObj.getNodeByParam("id", 'root', null)
    }

    refresh2(params,openState?,checkState?,selectedState?,node?){
        var ztree = this.zTreeObj
        if(params != undefined && params != null){
            ztree.setting.async.otherParam = params;
        }
        var idKey = ztree.setting.data.simpleData.idKey;
        var openNodes = ztree.getNodesByParam("open",true);
        var checkedNodes = ztree.getCheckedNodes(true);
        var selectedNodes = ztree.getSelectedNodes();
        this._treeStateKeep = function(){
            this.treeAsyncSuccess(ztree,openState,checkState,selectedState,openNodes,checkedNodes,selectedNodes);
        }
        ztree.reAsyncChildNodes(node,"refresh");
    }

    private treeAsyncSuccess(ztree,openState,checkState,selectedState,openNodes,checkedNodes,selectedNodes){
        var idKey = ztree.setting.data.simpleData.idKey;
        if(openState){
            _.forEach(openNodes,function(v,n){
                var theKey=v[idKey]?idKey:"name";
                var nsn = ztree.getNodesByParam(theKey,v[theKey]);
                if(nsn.length>0)ztree.expandNode(nsn[0],true,false,false);
            });
        }
        if(checkState){
            _.forEach(checkedNodes,function(v,n){
                var theKey=v[idKey]?idKey:"name";
                var nsn = ztree.getNodesByParam(theKey,v[theKey]);
                if(nsn.length>0)ztree.checkNode(nsn[0],true,false,false);
            });
        }
        if(selectedState){
            _.forEach(selectedNodes,function(v,n){
                var theKey=v[idKey]?idKey:"name";
                var nsn = ztree.getNodesByParam(theKey,v[theKey]);
                if(nsn.length>0)ztree.selectNode(nsn[0],true);
            });
        }
    }

    refreshSelectedNode(){
        var sNodes = this.zTreeObj.getSelectedNodes();
        if (sNodes.length > 0) {
            var pnode = sNodes[0].getParentNode();
            this.zTreeObj.reAsyncChildNodes(pnode, "refresh");
        }
    }

    refreshNode(node,id?:string,pid?:string){
        if(node != undefined){
            this.zTreeObj.reAsyncChildNodes(node, "refresh");
        }else{
            var node = this.zTreeObj.getNodeByParam("id", id, pid);
            this.zTreeObj.reAsyncChildNodes(node, "refresh");
        }
    }

    getSelectedNodes():Array<any>{
        return this.zTreeObj.getSelectedNodes();
    }

    refreshTree(){
        let nodes:Array<any> = this.zTreeObj.getSelectedNodes();   
        if(nodes.length==1){
            let node:TreeNode = nodes[0]
            if(!node.isParent && node.getParentNode()!==null){
                this.refreshNode(node.getParentNode())
            }else{
                this.refreshNode(nodes[0])
            }
        }
        this.hideRMenu();       
    }
    

    private onAction(action:TreeAction){
        let nodes:Array<any> = this.zTreeObj.getSelectedNodes();
        let node:TreeNode;
        if(nodes.length == 1){
            node = nodes[0]
        }
        let treeEvent:TreeEvent = new TreeEvent(node,this.treeId,action,nodes);
        this.zevent.emit(treeEvent)
        this.hideRMenu();
    }

    OnRightClick(event, treeId, treeNode) {
        event.preventDefault();
        if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
            this.zTreeObj.cancelSelectedNode();
            this.showRMenu("root", event.clientX, event.clientY);
        } else if (treeNode && !treeNode.noR) {
            this.zTreeObj.selectNode(treeNode);
            this.showRMenu("node", event.clientX, event.clientY);
        }
    };
    showRMenu(type, x, y) {
        $("#"+this._rMenuId+" ul").show();
        if (type=="root") {
            $("#m_del").hide();
            $("#m_check").hide();
            $("#m_unCheck").hide();
        } else {
            $("#m_del").show();
            $("#m_check").show();
            $("#m_unCheck").show();
        }
        this.rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"});
        $("body").bind("mousedown", this.onBodyMouseDown.bind(this));
    };
    hideRMenu() {
        if (this.rMenu) {
            this.rMenu.css({"visibility": "hidden"});
        }
        $("body").unbind("mousedown", this.onBodyMouseDown.bind(this));
    };
    private onBodyMouseDown(event){  
        if (!(event.target.id == this._rMenuId || $(event.target).parents("#"+this._rMenuId).length>0)) {
            this.rMenu.css({"visibility" : "hidden"});
        }
    };

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }    
}