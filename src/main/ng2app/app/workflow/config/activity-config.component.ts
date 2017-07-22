import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Tab } from '../../shared/form/widget/tab'
import { FormGroup } from '@angular/forms'
import { Observable } from 'rxjs/Observable'

import { FieldBase } from '../../shared/form/field-base'
import { TextField } from '../../shared/form/text-field'
import { WorkflowService } from '../../core/workflow/workflow.service'
import { ModalService } from '../../service/modal.service'

import { ChooseCandidateComponent } from './choose-candidate.component'

@Component({
    selector: 'wf-activity-config',
    template: `
    <my-form>
        <tabs (tabclick)="onTabClick($event)">
            <tabpanel [tab]="tabs[0]">
                <dynamic-form-hori #df_ref [fields]="_basic_fields" [model]="$model.basic" ></dynamic-form-hori>
            </tabpanel>
            <tabpanel [tab]="tabs[1]">          
                <my-div padding="false" span=10 offset=1>
                    <f-checkbox-input span=4 offset=0 [model]="$model.params" key="allowReject" (valuechange)="returnStatusChange($event)" label="允许退回"></f-checkbox-input>                
                    <f-dropdown-input span=6 offset=2 [disabled]="!$model.params.allowReject" [model]="$model.activityConfig" key="returnActivity" 
                        label="退回节点" [optionsOb]="activities" optionId="id" optionName="name"></f-dropdown-input>                
                </my-div>     
                <my-div padding=false span=10 offset=1>
                    <f-checkbox-input span=4 offset=0 [model]="$model.params" key="freeChoose" (valuechange)="chooseStatusChange($event)" label="自由选择"></f-checkbox-input>                
                    <f-text-input span=6 offset=2 [disabled]="!$model.params.freeChoose" [model]="$model.activityConfig" key="freechooseUrl" label="选择组件"></f-text-input>                
                </my-div>    
                <my-div padding=false span=10 offset=1>
                    <f-radio-group span=4 offset=0 [model]="$model.params" [options]="strategy_options" 
                        key="filtertype"  label="处理人策略" (valuechange)="strategyStatusChange($event)"></f-radio-group>                
                </my-div>                                                  
            </tabpanel>   
            <tabpanel [tab]="tabs[2]">
                <my-form>
                    <f-dropdown-input span=6 offset=2 [model]="$model.processconfig" (click)="candidateChooseClick($event)" optionId="jobId"
                        optionName="jobName" key="groupPerformer" label="处理组" [options]="alljobs"></f-dropdown-input>                 
                </my-form>
            </tabpanel>                                 
        </tabs>    
    </my-form>        
    `
})
export class ActivityConfigComponent implements OnInit {

    $model: any = {
        basic: {},
        activityConfig: {},
        params: {},
    }
    _basic_fields: FieldBase<any>[]
    activities: Observable<any>

    tabs: Tab[] = [
        new Tab({
            key: 'basicinfotab',
            name: "基本信息",
            active: true
        }),
        new Tab({
            key: 'actionstab',
            name: "操作",
            active: false
        }),
        new Tab({
            key: 'handler',
            name: "处理人",
            active: false
        })
    ]

    strategy_options = {
        "falsefilter": "无过滤",
        "orgfilter": "按部门过滤",
        "orgbossfilter": "按部门&领导过滤",
        "starter": "分派申请人",
        "historyassign": "历史处理人"
    }

    alljobs: any = []

    _modalContext: {
        vcRef: ViewContainerRef,
        componentFactoryResolver: ComponentFactoryResolver
    }
    constructor(private wfs: WorkflowService, private http: Http, private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver,
        private modalService: ModalService) {
        this._modalContext = {
            vcRef: vcRef,
            componentFactoryResolver: componentFactoryResolver
        }
    }
    ngOnInit() {
        let con: any = {}
        con.moduleId = this.$model.params.moduleId;
        con.taskDefId = this.$model.curActivity.businessObject.id;
        let body = JSON.stringify(con);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        this.http.post('workflow/getactivityconfig', body, options)
            .map(res => res.json())
            .subscribe(data => {
                // debugger
                this.$model.activityConfig = data;
                if (_.isUndefined(this.$model.activityConfig.taskDefId) || _.isNull(this.$model.activityConfig.taskDefId)) {
                    this.$model.activityConfig.taskDefId = this.$model.curActivity.businessObject.id;
                }
                var returnindex = this.has_action("return");
                if (returnindex == undefined) {
                    this.$model.params.allowReject = false;
                } else {
                    this.$model.params.allowReject = true;
                }
                var freechooseindex = this.has_action("freechoose");
                if (freechooseindex == undefined) {
                    this.$model.params.freeChoose = false;
                    this.$model.activityConfig.freeshooseUrl = "f/choosetaskhandler";
                } else {
                    this.$model.params.freeChoose = true;
                }
                var filtervalue = this.get_action("filtertype");
                if (filtervalue) {
                    var kvs = filtervalue.split(":");
                    var value = kvs[1];
                    this.$model.params.filtertype = value;
                }
            })
        let headers1 = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options1 = new RequestOptions({
            headers: headers1,
        });
        this.http.get('workflow/getjobs', options1)
            .toPromise()
            .then((data) => {
                this.alljobs = data.json()
            })
        let paramconfig = new URLSearchParams()
        paramconfig.set("processDefinitionId", this.$model.params.processDefId)
        paramconfig.set("moduleId", this.$model.params.moduleId)
        paramconfig.set("taskDefKey", this.$model.curActivity.businessObject.id)
        this.http.get('workflowrule/getprocessconfig',
            new RequestOptions({
                headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }),
                search: paramconfig
            })).toPromise().then(data => {
                try {
                    this.$model.processconfig = data.json()
                } catch (error) {
                    this.$model.processconfig = {}
                }
            })
        this.activities = this.wfs.getActivities(this.$model.params.processDefId)
        this.$model.basic = {}
        this.$model.basic = this.$model.curActivity.businessObject
        this.$model.activityConfig = {}
        this.$model.activityConfig.freechooseUrl = "test"
        this._basic_fields = [
            new TextField({
                key: 'name',
                label: '节点名称',
                disable: true,
                span: 6,
                order: 1
            }),

        ]
    }

    onTabClick(event) {

    }

    onModalAction(): Promise<any> {

        let param = {
            processDefinitionId: this.$model.params.processDefId,
            taskDefinitionId: this.$model.curActivity.businessObject.id,
            moduleId: this.$model.params.moduleId,
            wpcp: {
                groupPerformer: this.$model.processconfig.groupPerformer
            }
        }
        let body1 = JSON.stringify(param);
        let urlSearchParams1 = new URLSearchParams();
        let headers1 = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options1 = new RequestOptions({
            headers: headers1,
            search: urlSearchParams1
        });
        this.http.post('workflowrule/saveprocessconfig', body1, options1)
            .toPromise()
            .then((data) => { return })

        this.$model.activityConfig.moduleId = this.$model.params.moduleId;
        let body = JSON.stringify(this.$model.activityConfig);
        let urlSearchParams = new URLSearchParams();
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });
        return this.http.post('workflow/saveactivityconfig', body, options)
            .toPromise()
            .then((data) => { return data })
    }

    candidateChooseClick(e) {

        // this.modalService.open(
        //     this._modalContext,
        //     {
        //         comp:ChooseCandidateComponent,
        //         title: '选择处理组',
        //         width: '1200px'
        //     },
        //     {
        //         params: {
        //             type: ''
        //         }
        //     },
        //     data => {
        //     }
        // );
        // debugger
    }

    //是否退回状态改变
    returnStatusChange = (newvalue) => {
        if (this.$model.params.allowReject) {
            this.add_action("return", "return");
        } else {
            this.$model.activityConfig.returnActivity = undefined;
            this.del_action("return");
        }
    }
    //自由选择状态改变
    chooseStatusChange = (newvalue) => {
        if (this.$model.params.freeChoose) {
            this.add_action("freechoose", "freechoose");
        } else {
            if (this.$model.activityConfig.freeChooseUrl == undefined) {
                this.$model.activityConfig.freeChooseUrl = "f/choosetaskhandler";
            }
            this.del_action("freechoose");
        }
    }
    //处理人策略状态改变
    strategyStatusChange(value) {
        if (value != "falsefilter") {
            console.log("selected filter", value);
            var action = this.assemble_action("filtertype", value);
            this.add_action("filtertype", action);
        } else {
            this.del_action("filtertype");
        }
    }

    //组装action字符串。组装成 key:value 或 key:value1|value2 的形式
    assemble_action(key, value, arrayvalues?) {
        //value是单个值
        if (value != undefined) {
            return key + ":" + value;
        }
        //value是多个值
        if (arrayvalues instanceof Array) {
            var result = "";
            for (var i = 0; i < arrayvalues.length; i++) {
                result = result + "|" + arrayvalues[i]
            }
            return key + ":" + result;
        }
    }

    add_action(action, value) {
        if (this.$model.activityConfig.includeActions == undefined || this.$model.activityConfig.includeActions == "") {
            this.$model.activityConfig.includeActions = value;
        } else {
            this.del_action(action);
            this.$model.activityConfig.includeActions = this.$model.activityConfig.includeActions + "," + value;
        }
    }
    get_action(action) {
        var a = this.$model.activityConfig.includeActions.split(",");
        for (var i = 0; i < a.length; i++) {
            if (a[i].match(action)) {
                return a[i];
            }
        }
    }
    has_action(action) {
        var a = this.$model.activityConfig.includeActions.split(",");
        var index = undefined;
        for (var i = 0; i < a.length; i++) {
            if (a[i].match(action)) {
                index = i;
                break;
            }
        }
        return index;
    }
    del_action(action, actions?) {
        if (actions != undefined) {
            var a = actions.split(",");
            var index = undefined;
            for (var i = 0; i < a.length; i++) {
                if (a[i].match(action)) {
                    index = i;
                    break;
                }
            }
            if (index != undefined) {
                a.splice(index, 1);
                return a.join(",")
            } else {
                return actions
            }
        } else if (this.$model.activityConfig.includeActions != undefined) {
            var a = this.$model.activityConfig.includeActions.split(",");
            var index = undefined;
            for (var i = 0; i < a.length; i++) {
                if (a[i].match(action)) {
                    index = i;
                    break;
                }
            }
            if (index != undefined) {
                a.splice(index, 1);
                this.$model.activityConfig.includeActions = a.join(",")
            }
        }
    }
}