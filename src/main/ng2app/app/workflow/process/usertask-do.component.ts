import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject'
import 'rxjs/Subject'
import 'rxjs/add/observable/forkJoin'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import { TextField } from '../../shared/form/text-field'
import { DropdownField } from '../../shared/form/dropdown-field'
import { DatetimePickField } from '../../shared/form/widget/datetime-pick.field'
import { TextareaField } from '../../shared/form/widget/textarea.field'
import { Select2Field } from '../../shared/form/widget/select2.field'
import { CheckboxField } from '../../shared/form/widget/checkbox.field'
import { FileUploadField } from '../../shared/form/widget/file-upload.field'
import { CustomTemplateField } from '../../shared/form/custom-template.field'


import { DynamicFormHorizontalComponent } from '../../shared/form/dynamic-form-horizontal.component'

import { WorkprocessService } from '../service/workprocess.service'
import { WorkflowService } from '../service/workflow.service'
import { SecurityService } from '../../service/security.service'
import { ModalService } from '../../service/modal.service'

import { BpmnMonitorComponent } from '../bpmn2/bpmn-monitor.component'
// import { BpmnViewerComponent } from '../bpmn2/bpmn-viewer.component'
// <button type="button" *ngIf="processInsId" class="btn btn-default">退回</button>    
@Component({
    selector: 'usertask-do',
    template: `
        <my-div [hidden]="completed" [styles]="'background: #fff; border: 2px solid #dadada; box-shadow: 0 0 10px #d0d0d0;'">
            <my-div span=12>
                <button type="button" *ngIf="!processInsId" class="btn btn-primary" (click)="submitFlow()">提交</button>
                <button type="button" *ngIf="processInsId" class="btn btn-primary" (click)="completeTask()">提交</button>
                <button type="button" *ngIf="processInsId" class="btn btn-primary" (click)="processMonitor()">流程监控</button>                
            </my-div>
            <wf-title *ngIf="titleField" [field]="titleField"></wf-title>
            <dynamic-form-hori *ngIf="!isCustomForm" [fields]="fields" ></dynamic-form-hori>
            <ng-content></ng-content>
        </my-div>    
        <my-div [hidden]="!completed">
            处理完成！
        </my-div>
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
    primaryFormData: any

    permissiondata: any
    formfields: any[]
    fields: any[]

    product: any
    startInfo: any
    subject: any
    transitions: any[]
    transition: any

    formDataSubject: Subject<any> = new Subject();
    onFieldInit: Subject<any> = new Subject();

    completed: boolean = false
    titleField: any

    @ViewChild(DynamicFormHorizontalComponent) formCom: DynamicFormHorizontalComponent;
    @Output() modelinit = new EventEmitter()
    @Input() isCustomForm = true
    @Input() check: Function //外面自定义表单的check 废弃
    @Input() outFormData: Function
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

    }

    ngAfterViewInit() {
        this.route.params.subscribe(data => {
            //start || complete
            this.moduleId = data["productId"] || data["moduleId"]
            this.formId = data["formId"]
            this.taskDefKey = data["taskDefKey"] || data["taskdefid"]
            this.businessKey = data["businessKey"] == undefined ? this.generateBusinessKey() : data["businessKey"]
            this.processInsId = data["PROC_INST_ID_"]
            this.processDefinitionId = data["processDefinitionId"] || data["PROC_DEF_ID_"]
            this.taskId = data["taskId"]
            //formBusinessKey一定有业务数据预期对应的
            let formBusinessKey
            if (this.processInsId || data["businessKey"]) {
                formBusinessKey = this.businessKey
            }
            let forkTask = [
                this.flowService.getProduct(this.moduleId),
                this.flowService.getformdata(this.formId, formBusinessKey, this.processInsId),
                this.securityService.getSubject(),
                this.flowService.getformfield(this.formId, null, false),
            ]
            //开始流程
            if (this.processInsId == undefined) {
                forkTask.push(this.flowService.getStartInfo(this.moduleId))
            }


            Observable.forkJoin(forkTask).subscribe(res => {
                // debugger
                this.product = res[0]

                this.subject = res[2]
                this.formfields = res[3].all

                let formValue = res[1]
                this.primaryFormData = formValue
                this.formDataSubject.next(formValue)
                this.modelinit.emit(formValue)

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
                    setTimeout(() => {
                        this.formCom.form.patchValue(formValue)
                        this.onFieldInit.next("data")
                    })
                    this.transitions = res[1]
                    this.transition = res[1][0]
                })

            });
        })
    }

    get formData() {
        let formData: any = _.cloneDeep(this.primaryFormData)
        if (this.outFormData) {
            let outData = this.outFormData()
            if (outData) {
                Object.assign(formData, outData)
            }
        }
        if (this.formCom) {
            let inData = this.formCom.form.value
            if (inData) {
                Object.assign(formData, inData)
            }
        }
        return formData
    }

    submitFlow() {
        debugger
        if (this.formCom && !this.formCom.form.valid) {
            toastr.warning('验证失败')
            return
        }
        if (this.check && !this.check()) {
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

    completeTask() {
        debugger
        if (this.formCom && !this.formCom.form.valid) {
            toastr.warning('验证失败')
            return
        }
        if (this.check && !this.check()) {
            toastr.warning('验证失败')
            return
        }

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
                    this.completed = true
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
                comp: BpmnMonitorComponent,
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
                case "select2":
                    newFields.push(new Select2Field({
                        key: field.fieldNo,
                        label: field.displayName || field.fieldId.fieldName,
                        labelWidth: field.labelWidth,
                        span: field.displaySpan,
                        required: permissiondata[field.fieldNo].fillnecessary,
                        disable: !permissiondata[field.fieldNo].writePermission,
                        hidden: !permissiondata[field.fieldNo].visible,
                        dictName: field.dictName,
                        optionsUrl: field.remark1,
                        optionId: field.remark2,
                        optionName: field.remark3,
                        multiple: (field.remark4 === "true" || field.remark4 == true) ? true : false
                    }))
                    break
                case "checkbox":
                    newFields.push(new CheckboxField({
                        key: field.fieldNo,
                        label: field.displayName || field.fieldId.fieldName,
                        labelWidth: field.labelWidth,
                        span: field.displaySpan,
                        required: permissiondata[field.fieldNo].fillnecessary,
                        disable: !permissiondata[field.fieldNo].writePermission,
                        hidden: !permissiondata[field.fieldNo].visible,
                    }))
                    break
                case "fileupload":
                    newFields.push(new FileUploadField({
                        key: field.fieldNo,
                        label: field.displayName || field.fieldId.fieldName,
                        labelWidth: field.labelWidth,
                        span: field.displaySpan,
                        required: permissiondata[field.fieldNo].fillnecessary,
                        disable: !permissiondata[field.fieldNo].writePermission,
                        hidden: !permissiondata[field.fieldNo].visible,
                        params: {
                            writePermission: permissiondata[field.fieldNo].writePermission,
                            businessKey: this.businessKey,
                            businessType: this.product.productNo
                        }
                    }))
                    break
                case "f-file-upload-inrow":
                    newFields.push(new FileUploadField({
                        key: field.fieldNo,
                        type: "inrow",
                        label: field.displayName || field.fieldId.fieldName,
                        labelWidth: field.labelWidth,
                        span: field.displaySpan,
                        required: permissiondata[field.fieldNo].fillnecessary,
                        disable: !permissiondata[field.fieldNo].writePermission,
                        hidden: !permissiondata[field.fieldNo].visible,
                        params: {
                            writePermission: permissiondata[field.fieldNo].writePermission,
                            businessKey: this.businessKey,
                            businessType: this.product.productNo
                        }
                    }))
                    break
                case "wftitle":
                    this.titleField = field
                    break
                case "f-text-input":
                    newFields.push(new TextField({
                        selector: field.webDisplayTypeId,
                        key: field.fieldNo,
                        label: field.displayName || field.fieldId.fieldName,
                        labelWidth: field.labelWidth,
                        span: field.displaySpan,
                        required: permissiondata[field.fieldNo].fillnecessary,
                        disable: !permissiondata[field.fieldNo].writePermission,
                        hidden: !permissiondata[field.fieldNo].visible,
                        click: field.click || (() => { })
                    }))
                    break
                default:
                    newFields.push(new CustomTemplateField({
                        selector: field.webDisplayTypeId,
                        key: field.fieldNo,
                        label: field.displayName || field.fieldId.fieldName,
                        labelWidth: field.labelWidth,
                        span: field.displaySpan,
                        required: permissiondata[field.fieldNo].fillnecessary,
                        disable: !permissiondata[field.fieldNo].writePermission,
                        hidden: !permissiondata[field.fieldNo].visible,
                        click: field.click || (() => { }),
                        params: {
                            processDefinitionId: this.processDefinitionId,
                            processInsId: this.processInsId,
                            moduleId: this.moduleId,
                            product: this.product,
                            taskDefKey: this.taskDefKey,
                            taskId: this.taskId,
                            formId: this.formId,
                            businessKey: this.businessKey,
                        }
                    }))
            }

        })
        return newFields
    }
}