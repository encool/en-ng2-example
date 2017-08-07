import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms'
import { Http } from '@angular/http'

import { JqgridSetting, JqgridAction, JqgridEvent, JqgridCallback, DefaultJqgridCallback, ColModel, JqgridComponent } from '../../shared/jqgrid.module'
import { JqgridFormatter } from '../../shared'

import { UIComponent } from '../../commonshared/decorators/ui-component.decorator'
import { FieldBase } from '../../commonshared/form/field-base'
import { TextField } from '../../shared/form/text-field'
import { DropdownField } from '../../shared/form/dropdown-field'
import { FieldGroup } from '../../commonshared/form/field-group'
import { DatetimePickField } from '../../shared/form/widget/datetime-pick.field'
import { TextareaField } from '../../shared/form/widget/textarea.field'
import { DynamicFormHorizontalComponent } from '../../shared/form/dynamic-form-horizontal.component'

import { SecurityService } from '../../core/security/security.service'
import { DictdataService } from '../../service/dictdata.service'

@UIComponent({
    selector: 'wf-audit',
    component: AuditinfoComponent
})
@Component({
    selector: 'wf-audit',
    template: `
    <div *ngIf="!field.params.preview">
        <my-div [hidden]="isStart">
            <h3 class="col-sm-12">审核信息</h3>
        </my-div>
        <dynamic-form-hori [fields]="auditFields"></dynamic-form-hori>
        <my-div [hidden]="isStart">
            <my-grid [colModel]="_fieldmgt_col_model" [jqgridSetting]="_fieldmgt_grid_setting"></my-grid>
        </my-div>
        <my-div span=12>
            <div style="float:right">
                <button type="button" *ngIf="isStart" class="btn btn-primary" (click)="submitFlow()">提交</button>
                <button type="button" *ngIf="!isStart" class="btn btn-primary" (click)="completeTask()">提交</button>
                <button type="button" *ngIf="!isStart" class="btn btn-primary" (click)="processMonitor()">流程监控</button>      
            </div>          
        </my-div>        
    </div>    
    `
})
export class AuditinfoComponent implements OnInit {
    @Input() form: FormGroup
    @Input() field: FieldBase<any>

    @ViewChild(DynamicFormHorizontalComponent) auditform: DynamicFormHorizontalComponent
    auditFields: FieldBase<any>[]
    control: AbstractControl
    span: number = 12

    transition: any
    isParallel: boolean
    nextHandlerField: FieldBase<any>

    global: any = {}

    _fieldmgt_col_model = [
        new ColModel({ label: "oId", name: "oId", width: 20, hidden: true, key: true }),
        new ColModel({ label: "环节名称", name: "activityName", width: 20 }),
        new ColModel({
            label: "处理人", name: "auditerId", width: 20, formatter: (v, op, o) => {
                if (v) {
                    return v.userRealname
                } else {
                    return ""
                }
            }
        }),
        new ColModel({ label: "处理时间", name: "auditTime", formatter: new JqgridFormatter.Millstime().formatter, width: 20 }),
        new ColModel({ label: "处理结论", name: "auditState", formatter: new JqgridFormatter.DictData(this.dictdataService, "工作流_处理结论").formatter, width: 20 }),
        new ColModel({ label: "处理意见", name: "opinionContent", width: 20 }),
    ]
    // _fieldmgt_grid_actions = [
    //     new JqgridAction({ key: "add", name: "新增", order: 2 }),
    //     new JqgridAction({ key: "edit", name: "编辑", order: 3 }),
    //     new JqgridAction({ key: "refresh", name: "刷新", order: 1 }),
    //     new JqgridAction({ key: "delete", name: "删除", order: 6 }),
    // ]
    _fieldmgt_grid_setting: any
    isStart: boolean
    isviewpage: boolean = false
    choosed: Array<any> = new Array()

    constructor(private http: Http, private securityService: SecurityService, private dictdataService: DictdataService) {

    }

    ngOnInit() {
        if (!this.field.params.preview) {
            this.doInit()
        }
    }

    doInit() {

        this.global = this.field.params.global
        setTimeout(() => {
            // debugger
            this.global.handleinline = {}
        });

        this.isStart = this.field.params.processInsId == undefined ? true : false
        if (this.field.params.transitions == undefined) {
            this.isviewpage = true
        }
        this._fieldmgt_grid_setting = new JqgridSetting({
            gridId: "auditloggrid",
            primaryKey: "oId",
            postData: { procInsId: this.field.params.processInsId == undefined ? "-1" : this.field.params.processInsId },
            url: "list/e/wfarchhandle",
            title: "审核日志",
            // actions: this._fieldmgt_grid_actions,
        })
        // debugger
        let transitions: any[] = (this.field.params.transitions as Array<any>).map(v => {
            return {
                dest: v.dest,
                id: v.id,
                destid: v.dest.id,
                destname: v.dest.name,
                src: v.src,
            }
        })

        this.control = this.form.get(this.field.key)
        this.auditFields = [
            new TextField({
                key: 'activityName',
                label: '环节名称',
                span: 12,
                value: this.field.params.taskDefKey,
                disable: true,
                order: 1,
                hidden: this.isStart || !this.field.params.permissiondata.writePermission,
            }),
            new DropdownField({
                key: 'nexttransiId',
                label: '下一环节',
                value: transitions[0].id,
                required: true,
                span: 6,
                order: 2,
                options: transitions,
                optionId: "id",
                optionName: "destname",
                hidden: this.isStart || !this.field.params.permissiondata.writePermission || !this.isFreeChoose(this.field.params.properties),
            }),
            new DropdownField({
                key: 'nextHandler',
                label: '下一处理人',
                required: true,
                span: 6,
                order: 3,
                hidden: this.isStart || !this.field.params.permissiondata.writePermission || !this.isFreeChoose(this.field.params.properties),
            }),
            new FieldGroup({
                groupName: "ad",
                order: 4,
                fields: [
                    new FieldGroup({
                        groupName: "auditerId",
                        fields: [
                            new TextField({
                                key: 'userRealName',
                                label: '处理人',
                                required: true,
                                span: 6,
                                order: 2,
                                value: this.securityService.subject().userDTO.userRealname,
                                disable: true,
                                hidden: this.isStart || !this.field.params.permissiondata.writePermission,
                            }),
                        ]
                    }),
                    new DatetimePickField({
                        key: "auditTime",
                        label: '处理时间',
                        value: new Date(),
                        disable: true,
                        hidden: this.isStart || !this.field.params.permissiondata.writePermission,
                    }),
                    new DropdownField({
                        key: 'auditState',
                        label: '处理结论',
                        required: true,
                        value: "TY",
                        dictName: "工作流_处理结论",
                        span: 6,
                        order: 2,
                        hidden: this.isStart || !this.field.params.permissiondata.writePermission,
                    }),
                    new TextareaField({
                        key: "opinionContent",
                        label: "处理意见",
                        span: 12,
                        hidden: this.isStart || !this.field.params.permissiondata.writePermission,
                    })

                ]
            }),
        ]

        this.nextHandlerField = this.auditFields[2]


        this.getTaskHandler(transitions[0])

        setTimeout(() => {
            this.auditform.form.valueChanges.subscribe((value) => {
                this.auditState_change(value.ad.auditState)
                this.selectSimple1_change(value.nextHandler)
                // debugger
            })
        });

        this.form.addControl("inlineaudit", new FormControl(
            '', (control) => {
                // debugger
                // let key = this.field.key
                // return { [key]: "error" }
                return null
            }

        ))
    }

    //此环节是否需要审核意见
    needAudit() {
        return !this.isStart && this.field.params.permissiondata.writePermission
    }

    submitFlow() {
        this.global.operatefuncs.submitFlow()
    }

    completeTask() {
        debugger
        if (this.needAudit()) {
            this.form.patchValue({ "inlineaudit": this.auditform.form.value.ad })
            // $scope.formentity.inlineaudit = $model.ad
        }

        var candidateUsersStr = "";
        if (this.choosed) {
            for (var i = 0; i < this.choosed.length; i++) {
                candidateUsersStr = candidateUsersStr + this.choosed[i].id + ",";
            }
        }
        //如果下一步是会签事件
        //assignee 分派到人 assigneeList 会签人 多个id逗号分隔candidateUsers 候选人 可以多个id 逗号分隔 candidateGroups 候选组 这个组是act_id_group这个试图所描述的组
        //TODO 细分情形
        let result: any = {};
        result.variables = {}
        result.transition = this.transition;
        //freechoose 是自由选择 才要返回人
        let freechoose = this.isFreeChoose(this.field.params.properties)
        if (freechoose && this.isParallel) {
            result.variables.assigneeList = candidateUsersStr;
        } else if (freechoose) {
            result.variables.candidateUsers = candidateUsersStr;
        }
        //下一步普通任务 验证是否选人
        if (freechoose && result.transition.dest.porperties.type != "endEvent"
            && "" == result.variables.candidateUsers && result.variables.assigneeList == undefined) {
            //alert("请选择下一步处理人！");
            toastr.warning('"请选择下一步处理人！"');
            return
            //下一步会签任务 验证是否选人
        } else if (freechoose && result.transition.dest.porperties.type != "endEvent"
            && "" == result.variables.assigneeList && result.variables.candidateUsers == undefined) {
            toastr.warning('"请选择下一步处理人！"');
            return
        } else {
            this.global.handleinline = result
            this.global.operatefuncs.completeTask()
        }
    }

    processMonitor($event) {
        this.global.operatefuncs.processMonitor()
    }

    //审核结论值变换
    auditState_change(auditState) {
        if (auditState == "TY") {
            //积极意见
            this.global.oppositive = true
        } else if (auditState == "BTY") {
            //否定意见
            this.global.oppositive = false
        }
        // qybWorkflowService.getSubject().changed($params.fieldNo, $model.ad)
    }

    getTaskHandler(transi) {
        // debugger
        let nexttransiIdField = this.auditFields[1]
        if (!transi) {
            this.transition = nexttransiIdField._view.getOptionObj(nexttransiIdField._control.value);
        } else {
            this.transition = transi
        }
        if (this.transition.dest.porperties.multiInstance) {
            this.isParallel = true;
        } else {
            this.isParallel = false;
        }
        // debugger
        this.http.post("flowservice/getcandidate2", {
            processDefinitionId: this.field.params.processDefinitionId,
            proInsId: this.field.params.processInsId,
            moduleId: this.field.params.moduleId,
            taskDefKey: this.transition.destid,
            filterType: undefined,  //这个参数应该要后台去获取 而不是前台从后台get后又传回给后台
            curUserId: this.securityService.subject().id
        }
        ).map(data => data.json()).subscribe(data => {
            if (data.length > 0) {
                let candidates = data
                this.nextHandlerField.options = candidates
                this.nextHandlerField.optionId = "id"
                this.nextHandlerField.optionName = "name"
                //初始化选中第一个
                let nextHandler = candidates[0].id
                let choosed: any = {}
                choosed.id = nextHandler
                this.choosed.push(choosed)
                this.auditform.form.patchValue({ [this.nextHandlerField.key]: nextHandler })
            }
        })
        // .success(function (data) {
        //     $model.candidates = data.result
        //     $model.nextHandler = $model.candidates[0].id;
        //     functions.selectSimple1_change()
        // })
    }


    //选择人 单选
    selectSimple1_change(nextHandler) {
        if (nextHandler != null) {
            this.choosed = new Array()
            let choosed: any = {}
            choosed.id = nextHandler
            this.choosed.push(choosed)
        }
    }

    isFreeChoose(wfproperties) {
        if (wfproperties == undefined) {
            return false
        }
        return wfproperties.freechoose == undefined ? false : true
    }

    groupClass() {
        let classExpression = {
            'form-group': true,
            // "text-center": true,
            // 'form-horizontal': true,
            // 'has-error':!this.isValid,
        }
        classExpression["col-sm-" + this.span] = true;
        return classExpression
    }
}