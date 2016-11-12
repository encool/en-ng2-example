import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import { TextField } from '../../shared/form/text-field'
import { DropdownField } from '../../shared/form/dropdown-field'
import { DatetimePickField } from '../../shared/form/widget/datetime-pick.field'
import { TextareaField } from '../../shared/form/widget/textarea.field'

import { DynamicFormHorizontalComponent } from '../../shared/form/dynamic-form-horizontal.component'

import { WorkprocessService } from '../service/workprocess.service'
import { WorkflowService } from '../service/workflow.service'
import { SecurityService } from '../../service/security.service'
import { ModalService } from '../../service/modal.service'

import { BpmnViewerComponent } from '../bpmn2/bpmn-viewer.component'

@Component({
    selector: 'usertask-do',
    template: `
    <my-container>
        <my-div [hidden]="completed">
            <my-div span=12>
                <button type="button" class="btn btn-primary" (click)="submitFlow()">提交流程</button>
                <button type="button" class="btn btn-primary" (click)="completeTask()">完成任务</button>
                <button type="button" class="btn btn-primary" (click)="processMonitor()">流程监控</button>
                <button type="button" class="btn btn-default">Default button</button>    
            </my-div>
            <dynamic-form-hori #df_ref [fields]="fields" [model]="formData" ></dynamic-form-hori>
        </my-div>    
        <my-div [hidden]="!completed">
            处理完成！
        </my-div>
    </my-container>
    `
})
export class UsertaskDoComponent implements OnInit {
    processDefinitionId: string
    processInsId: string
    moduleId: string
    taskDefKey: string
    taskId: string
    formId: string
    businessKey: string

    permissiondata: any
    formfields: any[]
    fields: any[]

    product: any
    formData: any
    startInfo: any
    subject: any
    transitions: any[]
    transition: any

    completed: boolean = false
    @ViewChild("df_ref") formCom: DynamicFormHorizontalComponent
    _modalContext: {
        vcRef: ViewContainerRef,
        componentFactoryResolver: ComponentFactoryResolver
    }

    constructor(private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver,
        private securityService: SecurityService, private http: Http, private route: ActivatedRoute,
        private flowService: WorkflowService, private modalService: ModalService) {
        this._modalContext = {
            vcRef: vcRef,
            componentFactoryResolver: componentFactoryResolver
        }
    }

    ngOnInit() {
        this.route.params.subscribe(data => {
            //start || complete
            this.moduleId = data["productId"] || data["moduleId"]
            this.formId = data["formId"]
            this.taskDefKey = data["taskDefKey"] || data["taskdefid"]
            this.businessKey = data["businessKey"] == undefined ? this.generateBusinessKey() : data["businessKey"]
            this.processInsId = data["PROC_INST_ID_"]
            this.processDefinitionId = data["processDefinitionId"] || data["PROC_DEF_ID_"]
            this.taskId = data["taskId"]
            let forkTask = [
                this.flowService.getProduct(this.moduleId),
                this.flowService.getformdata(this.formId, this.businessKey, this.processInsId),
                this.securityService.getSubject(),
                this.flowService.getformfield(this.formId, null, false),
            ]
            //开始流程
            if (this.processInsId == undefined) {
                forkTask.push(this.flowService.getStartInfo(this.moduleId))
            }


            Observable.forkJoin(forkTask).subscribe(res => {
                this.product = res[0]
                this.formData = res[1]
                this.subject = res[2]
                this.formfields = res[3].all
                if (res.length === 5) {
                    this.startInfo = res[4]
                    this.taskDefKey = res[4].startActivity.id
                    this.processDefinitionId = res[4].processDefinitionId
                }
                Observable.forkJoin(
                    this.flowService.getfieldpermissiondata(this.product, this.taskDefKey),
                    this.flowService.getTransitions(this.processDefinitionId, this.taskDefKey),
                ).subscribe(res => {
                    this.permissiondata = res[0]
                    this.fields = this.toFormGroupField(this.formfields, this.permissiondata)
                    // this.formfields = res[1].all
                    this.transitions = res[1]
                    this.transition = res[1][0]
                })

            });
        })
    }

    submitFlow() {debugger
        if (!this.formCom.form.valid) {
            toastr.warning('验证失败')
            return
        }
        let variables = {}
        let body = JSON.stringify(
            {
                // ccInform: $model.ccInform,
                transition: this.transitions[0],
                moduleId: this.moduleId,
                formId: this.formId,
                businessKey: this.businessKey,
                processDefinitionId: this.processDefinitionId,
                variables: variables,
                entity: this.formData,
                wfOperator: {
                    userId: this.subject.id,
                    businessData: {
                        moduleId: this.moduleId,
                        businessKey: this.businessKey
                    }
                }

            }
        );
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
        });
        this.http.post('flow/startflow', body, options)
            .toPromise()
            .then((data) => {
                this.completed = true
            })

    }

    completeTask() {debugger
        let variables = {}
        let body = {
            // ccInform:$model.ccInform,
            transition: this.transition,
            // transitionId:transitionId,
            formId: this.formId,
            wfOperator: {
                userId: this.subject.id,
                businessData: {
                    moduleId: this.moduleId,
                    businessKey: this.businessKey
                }
            },
            businessKey: this.businessKey,
            isStart: false,
            processDefinitionId: this.processDefinitionId,
            moduleId: this.moduleId,
            currenTaskId: this.taskId,
            // destTaskDefinitionKey:$model.dest.id,
            useHisAssignee: false,
            variables: variables,
            entity: this.formData,
            proInsId: this.processInsId,
            taskDefKey: this.taskDefKey,
            // opinion:$model.opinion

        }

        let urlSearchParams = new URLSearchParams();
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });
        this.http.post('flow/goanywhere', body, options)
            .map(data => data.json())
            .subscribe((data) => {
                if (data.result == "200") {
                    toastr.success('操作成功！')
                } else {
                    toastr.warning('something wrong！')
                }
            })

    }

    processMonitor() {
        this.modalService.open(
            this._modalContext,
            {
                comp: BpmnViewerComponent,
                title: '流程查看',
                width: '1000px'
            },
            {
                params: {
                    type: 'view',
                    processDefId: this.processDefinitionId,
                    processInsId: this.processInsId
                }
            },
            data => {
            }
        );
    }

    generateBusinessKey() {
        return this.moduleId + "_" + new Date().getTime();
    }

    toFormGroupField(fields: any[], permissiondata: any[]): any[] {
        let newFields = new Array()
        fields.forEach(field => {
            switch (field.webDisplayTypeId) {
                case "dropdowninput":
                    newFields.push(new DropdownField({
                        key: field.fieldNo,
                        label: field.displayName || field.fieldId.fieldName,
                        labelWidth: field.labelWidth,
                        span: field.displaySpan,
                        dictName: field.dictName,
                        required: permissiondata[field.fieldNo].fillnecessary,
                        disable: !permissiondata[field.fieldNo].writePermission,
                        hidden: !permissiondata[field.fieldNo].visible,
                    }))
                    break
                case "datetimepick":
                    newFields.push(new DatetimePickField({
                        key: field.fieldNo,
                        label: field.displayName || field.fieldId.fieldName,
                        labelWidth: field.labelWidth,
                        span: field.displaySpan,
                        required: permissiondata[field.fieldNo].fillnecessary,
                        disable: !permissiondata[field.fieldNo].writePermission,
                        hidden: !permissiondata[field.fieldNo].visible,
                    }))
                    break
                case "textarea":
                    newFields.push(new TextareaField({
                        key: field.fieldNo,
                        label: field.displayName || field.fieldId.fieldName,
                        labelWidth: field.labelWidth,
                        span: field.displaySpan,
                        required: permissiondata[field.fieldNo].fillnecessary,
                        disable: !permissiondata[field.fieldNo].writePermission,
                        hidden: !permissiondata[field.fieldNo].visible,
                    }))
                    break
                default:
                    newFields.push(new TextField({
                        key: field.fieldNo,
                        label: field.displayName || field.fieldId.fieldName,
                        labelWidth: field.labelWidth,
                        span: field.displaySpan,
                        required: permissiondata[field.fieldNo].fillnecessary,
                        disable: !permissiondata[field.fieldNo].writePermission,
                        hidden: !permissiondata[field.fieldNo].visible,
                    }))
            }

        })
        // debugger
        return newFields
    }
}