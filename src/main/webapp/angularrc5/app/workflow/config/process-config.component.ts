import { Component, OnInit, ViewChild } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import { JqgridSetting, JqgridAction, JqgridEvent, JqgridCallback, DefaultJqgridCallback, ColModel, JqgridComponent} from '../../shared/jqgrid.module'
import { TreeEvent, ZtreeSetting, ZtreeComponent, onZtreeAction, TreeAction, TreeNode, ZtreeCallback, DefaultZtreeCallBack} from '../../shared/ztree.module'

import { Tab } from '../../shared/form/widget/tab'
import { BpmnEditorComponent } from '../../shared/component/bpmn-editor.component'

@Component({
    selector: 'process-config',
    template: `
        <div class="container-fluid" style="height: 80%;">
            <div class="row" style="height: 100%;">
                <div class="col-sm-3">
                    <my-panel title="服务产品" [actions]="_tree_actions" style="height:100%">
                            <my-ztree #panelcontent_ref #tree_ref [ztreeSetting]="_tree_setting" 
                                (zevent)="onZtreeAction($event)" [callback]="productTreeCall"></my-ztree>			
                    </my-panel>
                </div>
                <div class="col-sm-9">
                    <tabs (tabclick)="onTabClick($event)">
                        <tabpanel [tab]="tabs[0]">
                            <my-grid class="col-sm-12" #processgrid_ref [colModel]="_procdefmgt_col_model" [jqgridSetting]="_procdefmgt_grid_setting"
                                (jqgridevent)="onGridAction($event)" [callback]="processGridCall">
                            </my-grid>                        
                        </tabpanel>
                        <tabpanel [tab]="tabs[1]">
                            <bpmn-editor #bpmnview_ref [$model]="bpmnModel"></bpmn-editor>
                        </tabpanel>                        
                    </tabs>
                </div>

            </div>
        </div>    
    `
})
export class ProcessConfigComponent implements OnInit {

    @ViewChild("tree_ref") productTree: ZtreeComponent
    @ViewChild("processgrid_ref") productGrid: JqgridComponent
    @ViewChild("bpmnview_ref") bpmnView: BpmnEditorComponent

    bpmnModel:any = {
        params: {},
        model: {}
    }

    bindProcess:any = {}
    _curModule:any = {} 
    
    tabs:Tab[] = [
        new Tab({
            key:'processdefgrid',
            name:"流程定义",
            active:true
        }),
        new Tab({
            key:'processdefgragh',
            name:"流程配置",
            active:false
        })        
    ]

    _tree_actions: Array<TreeAction> = [
        new TreeAction({ key: "refresh", name: "刷新", order: 4 }),
        new TreeAction({ key: "add", name: "新增", order: 2 }),
        new TreeAction({ key: "edit", name: "编辑", order: 3 }),
        new TreeAction({ key: "delete", name: "删除", order: 6 }),
    ]
    _tree_setting = new ZtreeSetting({
        dataUrl: "tree/moduletreecontent",
        treeId: "producttree",
        autoParam: ["id"],
        actions: this._tree_actions
    })
    productTreeCall = new DefaultZtreeCallBack({
        onClick: (event: any, treeId: any, treeNode: any, clickFlag: any) => {
            let urlSearchParams = new URLSearchParams();
            urlSearchParams.set('moduleId', treeNode.id);
            let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
            let options = new RequestOptions({
                headers: headers,
                search: urlSearchParams
            });
            this.http.get('workflowrule/getbindprocess', options)
                .toPromise()
                .then((data) => { 
                    if(data.text().trim() != ""){
                        let result = data.json();    
                        if(result.key){
                            this.bindProcess = result
                            let param = {key:data.json().key}
                            this.productGrid.refresh(param)
                            this._curModule = {id:treeNode.id}
                        }
                    }else{
                        this.bindProcess = undefined
                        this.productGrid.refresh({})
                    }
                })
        }
    })

    _procdefmgt_col_model = [
        new ColModel({ label: "流程名称", name: "name", width: 20 }),
        new ColModel({ label: "流程标识", name: "key", width: 20 }),
        new ColModel({ label: "流程版本", name: "version", width: 20 }),
        new ColModel({
            label: "操作", name: "deployTime", width: 20,
            formatter: (value, option, rowObject) => {
                if(this.bindProcess != undefined && this.bindProcess.key == rowObject.key){
                    return "<a class='processoperatebtn' optype='unbind' id='" + rowObject.id + "'>解绑</a>"
                }else{
                    return "<a class='processoperatebtn' optype='bind' id='" + rowObject.id + "'>绑定</a>"
                }
                
            }
        }),
        new ColModel({ label: "流程定义ID", name: "id", hidden: true, key: true, width: 20 }),

    ]
    _procdefmgt_grid_setting = new JqgridSetting({
        gridId: "wfconfigprocessdefgrid",
        primaryKey: "id",
        url: "list/processdeflist",
        title: "流程定义",
    })

    processGridCall: JqgridCallback = {
        onSelectRow() {
        },
        gridComplete: () => {
            var btns = $("a[class=processoperatebtn]").each((index, ele: any) => {
                ele.onclick = (e: Event) => {
                    let productNode = this.productTree.getSelectedNodes();
                    if (productNode.length == 0) {
                        toastr.warning('请选择需要操作的服务！')
                    } else {
                        let target: any = e.target
                        let attr = target.attributes;
                        let id = attr.id.value;
                        let optype = attr.optype.value;
                        if(optype == "bind"){
                            let rowObject = this.productGrid.getRowData(id)
                            let body = JSON.stringify({
                                id: id,
                                name: rowObject.name,
                                key: rowObject.key
                            });
                            let urlSearchParams = new URLSearchParams();
                            urlSearchParams.set('moduleId', productNode[0].id);
                            let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                            let options = new RequestOptions({
                                headers: headers,
                                search: urlSearchParams
                            })
                            this.http.post('workflowrule/bindprocesstomodule', body, options)
                                .toPromise()
                                .then((data) => {
                                    
                                })
                        }else if(optype == "unbind"){
                            
                        }

                    }
                }
            })

        }
    }

    constructor(private http: Http) { }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }

    onTabClick(tab:Tab){
        if(tab.key == "processdefgragh"){
            this.bpmnModel.params.processDefId = this.bindProcess == undefined?undefined:this.bindProcess.id
            this.bpmnModel.params.type = "config"
            this.bpmnModel.params.moduleId = this._curModule.id;
            this.bpmnView.initBpmn()
        }
    }
}