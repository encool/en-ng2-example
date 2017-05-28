import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject'
import 'rxjs/Subject'
import 'rxjs/add/observable/forkJoin'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

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
            <my-div span=12 [hidden]="global.handleinline">
                <button type="button" *ngIf="!processInsId" class="btn btn-primary" (click)="submitFlow()">提交</button>
                <button type="button" *ngIf="processInsId" class="btn btn-primary" (click)="autoswitchcommit()">提交</button>
                <button type="button" *ngIf="processInsId" class="btn btn-primary" (click)="processMonitor()">流程监控</button>                
            </my-div>
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
    properties: any

    formDataSubject: Subject<any> = new Subject();
    onFieldInit: Subject<any> = new Subject();
    global: {
        handleinline?: any
        oppositive?: boolean
        operatefuncs: {
            submitFlow: Function,
            completeTask: Function,
            processMonitor: Function,
        }
    } = {
        operatefuncs: {
            submitFlow: this.submitFlow.bind(this),
            completeTask: this.autoswitchcommit.bind(this),
            processMonitor: this.processMonitor.bind(this),
        }
    }

    completed: boolean = false
    // titleField: any

    @ViewChild(DynamicFormHorizontalComponent) formCom: DynamicFormHorizontalComponent;
    @Output() modelinit = new EventEmitter()
    @Input() isCustomForm = true
    // @Input() check: Function //外面自定义表单的check 废弃
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
        // this.global.handleinline
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
                this.flowService.getActions(this.moduleId, this.taskDefKey)
            ]
            //开始流程
            if (this.processInsId == undefined) {
                forkTask.push(this.flowService.getStartInfo(this.moduleId))
            }


            Observable.forkJoin(forkTask).subscribe(res => {
                this.product = res[0]

                this.subject = res[2]
                this.formfields = res[3].all

                let formValue = res[1]
                this.primaryFormData = formValue
                this.formDataSubject.next(formValue)
                this.modelinit.emit(formValue)
                this.properties = res[4]
                if (res.length === 6) { //开始 有获取开始信息
                    this.startInfo = res[5]
                    this.taskDefKey = res[5].startActivity.id
                    this.processDefinitionId = res[5].processDefinitionId
                }
                Observable.forkJoin(
                    this.flowService.getfieldpermissiondata(this.product, this.taskDefKey),
                    this.flowService.getTransitions(this.processDefinitionId, this.taskDefKey),
                ).subscribe(res => {
                    this.permissiondata = res[0]
                    this.transitions = res[1]
                    this.transition = res[1][0]
                    this.fields = this.flowService.toWfFormGroupField(this.formfields, this.permissiondata, this)
                    setTimeout(() => {
                        this.formCom.form.patchValue(formValue)
                        this.onFieldInit.next("data")
                    })
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

    //提交 自动决定退回与流转
    autoswitchcommit($event) {
        //func 为业务表单提交前验证函数
        /*	if(!angular.isUndefined($model.func)){
                var a = $model.func();
                if(a==false){
                    Messenger.post({
                        'message': "必填项为空！",
                        'type': 'error',
                        'hideAfter':4
                    });	
                    return;
                }	
            }
        */
        if (this.global.oppositive || this.properties.return == undefined) { //积极意见或者流程没有退回配置 流转流程

            if (!this.global.oppositive && this.properties.return == undefined) {
                console.warn("本环节没有退回配置，但是是否定意见。默认继续走流程！")
            }

            if (this.formCom && !this.formCom.form.valid) {
                toastr.warning('验证失败')
                return
            }
            //func 为业务表单提交前验证函数
            // if (!_.isUndefined($model.func)) {
            //     var a = $model.func("submit");
            //     if (a == false) {
            //         Messenger.post({
            //             'message': "必填项为空！",
            //             'type': 'error',
            //             'hideAfter': 3
            //         });
            //         return;
            //     }
            // }
            //如果有下一步选人页面弹出就不用 确认页面了？
            var hasSelectPage = !this.global.handleinline
                && this.properties.freechoose != undefined
                && this.properties.freechoose != "";
            if (!hasSelectPage) {
                this.modalService.openConfirm(this._modalContext, { title: "是否确认", message: '确定提交？' }, (data) => {
                    debugger
                    this.completeTask()
                })
                // Modal.openConfirm({ message: '确定提交？' }, function () {
                //     functions.commit($event)
                // })
            } else {
                this.completeTask()
            }
        } else {
            if (this.properties.return == undefined) {
                toastr.warning('本环节没有退回配置，请联系系统维护人员！')
                // Messenger.post({
                //     'message': "本环节没有退回配置，请联系系统维护人员！",
                //     'type': 'error',
                //     'hideAfter': 4
                // });
                return
            }
            //退回 需不需要必填项验证？
            // if (!_.isUndefined($model.func)) {
            //     var a = $model.func("return");
            //     if (a == false) {
            //         Messenger.post({
            //             'message': "必填项为空！",
            //             'type': 'error',
            //             'hideAfter': 4
            //         });
            //         return;
            //     }
            // }
            //退回 需不需要必填项验证？
            if (this.formCom && !this.formCom.form.valid) {
                toastr.warning('验证失败')
                return
            }

            //否定意见 退回流程
            this.modalService.openConfirm(this._modalContext, { title: "是否确认", message: '确定提交？' }, (data) => {
                this.rejectTask()
            })
            // this.modalService.openConfirm({ message: '确定提交？' }, function () {
            //     functions.newField_click($event)
            // })
        }
    }

    completeTask() {
        //没有集成那个处理模板 并且是自由选择
        if (!this.global.handleinline
            && this.properties.freechoose != undefined
            && this.properties.freechoose != "") {
            var url = this.properties.freechoose.openUrl;

            //     Modal.open(
            //         url,
            //         {
            //             actions: $model.actions,
            //             formentity: $scope.formentity,
            //             params: $params.params,
            //             transitions: $model.getOutTransition.result,
            //             curUserId: $scope.subject.id
            //         },
            //         function (data) {
            //             console.log("choosed", data);
            //             $model.assigneeList = data.assigneeList == "" ? undefined : data.assigneeList;//避免传空字符进去，影响判断;
            //             $model.assigneeid = data.assignee == "" ? undefined : data.assignee;
            //             $model.nexthandlegroupid = data.candidateGroups == "" ? undefined : data.candidateGroups;
            //             $model.nexthandleid = data.candidateUsers == "" ? undefined : data.candidateUsers;
            //             $model.ccInform = data.ccInform;
            //             $model.transition = data.transition;
            //             $model.dest = $model.transition.dest;
            //             $model.transitionId = $model.transition.id;

            //             $model.variables = {
            //                 assignee: $model.assigneeid,
            //                 candidateGroups: $model.nexthandlegroupid,
            //                 candidateUsers: $model.nexthandleid,
            //                 assigneeList: $model.assigneeList,
            //                 wfComment: $model.opinion
            //             }

            //             functions.newField5_click($event);

            //         });
            //     return;
        }


        let variables = {}
        if (!this.global.handleinline) {
            // $model.variables = {
            //     assignee: $model.assigneeid,
            //     candidateGroups: $model.nexthandlegroupid,
            //     candidateUsers: $model.nexthandleid,
            //     assigneeList: $model.assigneeList,
            //     wfComment: $model.opinion
            // }
        } else {  //集成处理页面模板了 一些参数用模板设置到全局中的值
            variables = this.global.handleinline.variables
            this.transition = this.global.handleinline.transition
            // $model.transitionId = $model.transition.id
            // $model.dest = $model.transition.dest
        }
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

    //回退
    rejectTask($event?: any) {

        //提交前函数 各字段可以在这里把自己的数据放入业务js对象
        // $model.funcsbeforsubmit();

        var userId = this.subject.id
        var processDefinitionId = this.processDefinitionId
        var moduleId = this.moduleId
        var taskDefKey = this.taskDefKey
        let variables = {
        }
        this.http.post("flow/reject",
            {
                rejectMessage: "reject",

                formId: this.formId,
                wfOperator: {
                    userId: userId,
                    businessData: {
                        moduleId: moduleId,
                        businessKey: this.businessKey
                    }
                },
                curActivity: this.transition.src,
                businessKey: this.businessKey,
                isStart: false,
                processDefinitionId: this.processDefinitionId,
                moduleId: this.moduleId,
                currenTaskId: this.taskId,
                destTaskDefinitionKey: this.properties.return.returnTo,
                useHisAssignee: true,
                variables: variables,
                entity: this.formData,
                proInsId: this.processInsId,
                taskDefKey: this.taskDefKey,
                // opinion: ""
            }).map(data => data.json()).subscribe(data => {
                if (data.result == '200') {
                    this.completed = true
                    toastr.success('退回成功！')
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


}