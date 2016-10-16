import { Component, OnInit, ViewContainerRef, Compiler, Type, ComponentFactoryResolver } from '@angular/core';

import { JqgridSetting, JqgridAction, JqgridEvent, JqgridCallback, DefaultJqgridCallback, ColModel, JqgridComponent} from '../../shared/jqgrid.module'

import { ModalService } from '../../service/modal.service'
import { WorkflowService } from '../service/workflow.service'

import { ProcessModelInfoComponent } from './process-model-info.component'
import { BpmnEditorComponent } from '../../shared/component/bpmn-editor.component'
 
@Component({
    selector: 'process-def',
    templateUrl: './process-definition.component.html'
})
export class ProcessDefinitionComponent implements OnInit {

    _model = {

    }

    _procmodel : {
        key?:string
        name?:string
        describe?:string
    } = { }

    _modalContext: {
        vcRef: ViewContainerRef,
        componentFactoryResolver: ComponentFactoryResolver
    }

    constructor(private vcRef: ViewContainerRef, private componentFactoryResolver:ComponentFactoryResolver,private workflowService: WorkflowService,
         private modalService: ModalService) {
        this._modalContext = {
            vcRef: vcRef,
            componentFactoryResolver:componentFactoryResolver
       }
    }

    _procdefmgt_col_model = [
        new ColModel({ label: "流程名称", name: "name", width: 20 }),
        new ColModel({ label: "流程标识", name: "key", width: 20 }),
        new ColModel({ label: "流程版本", name: "version", width: 20 }),
        new ColModel({ label: "部署时间", name: "deployTime", width: 20 }),
        new ColModel({ label: "流程定义ID", name: "id",hidden:true, key:true,width: 20 }),
        new ColModel({ label: "部署ID", name: "deploymentId",hidden:true, width: 20 }),
    ]
    _procdefmgt_grid_actions = [
        new JqgridAction({ key: "add", name: "新增", order: 2 }),
        new JqgridAction({ key: "edit", name: "编辑", order: 3 }),
        new JqgridAction({ key: "refresh", name: "刷新", order: 1 }),
        new JqgridAction({ key: "delete", name: "删除", order: 6 }),
    ]
    _procdefmgt_grid_setting = new JqgridSetting({
        gridId:"processdefgrid",
        primaryKey:"id",
        url:"list/processdeflist",
        title:"流程定义管理",
        actions:this._procdefmgt_grid_actions,
    })

    ngOnInit() { }

    onGridAction(event:JqgridEvent) {
        if (event.businessId == 'processdefgrid') {
            switch (event.action.key) {
                case 'add':
                    this._procmodel = {};
                    this.modalService.open(
                        this._modalContext,
                    { 
                        comp:ProcessModelInfoComponent,
                        title:"新增流程定义"
                    },
                    {
                        params:{type:"add"},
                        model:this._procmodel
                    },
                    data=>{
                        this.workflowService.createModel(this._procmodel.name,this._procmodel.key,this._procmodel.describe).then(
                            data => {
                                this.modalService.open(
                                    this._modalContext,
                                    {
                                        comp: BpmnEditorComponent,
                                        title: "编辑流程定义",
                                        width: "1300px",
                                        height: "600px"
                                    },
                                    {
                                        params: { key: data.key,name: data.name, type: "add" },
                                        model: data
                                    },
                                    data=>{
                                        
                                    }
                                );
                            }
                        )
                    })
                    break;
                case 'edit':
                    let processdefId = event.rowData.id
                    this.modalService.open(
                        this._modalContext,
                        {
                            comp: BpmnEditorComponent,
                            title: "编辑流程定义",
                            width: "1300px",
                            height: "600px"
                        },
                        {
                            params: { processDefId: processdefId, type: "edit" },
                        },
                        data=>{
                            debugger
                        }
                    );                               
                    break;
                case 'delete':
                    break;
                case 'refresh':
                    break;
            }
        }else if(event.businessId == ''){
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