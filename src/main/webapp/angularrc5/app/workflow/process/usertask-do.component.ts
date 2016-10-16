import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin'
import { Router, ActivatedRoute, Params } from '@angular/router';

import { WorkprocessService } from '../service/workprocess.service'
import { WorkflowService } from '../service/workflow.service'

@Component({
    selector: 'usertask-do',
    template: `
    <wf-task-form ></wf-task-form>
    `
})
export class UsertaskDoComponent implements OnInit {
    processDefinitionId: string
    processInsId: string
    moduleId: string
    taskDefKey: string
    formId: string
    businessKey: string

    permissiondata: any
    formfields: any

    constructor(private route: ActivatedRoute, private flowService: WorkflowService) {

    }

    ngOnInit() {
        this.route.params.subscribe(data => {
            
            this.moduleId = data["productId"]
            this.formId = data["formId"]
            this.businessKey = data["businessKey"] == undefined ? this.generateBusinessKey():data["businessKey"]
            Observable.forkJoin(
                    this.flowService.getProduct(this.moduleId),
                    this.flowService.getformdata(this.formId, this.businessKey, this.processInsId)
                ).subscribe(res => {
                    let product = res[0]
                    let formData = res[1]
                    Observable.forkJoin(
                        this.flowService.getfieldpermissiondata(product, this.taskDefKey),
                        this.flowService.getformfield(this.formId, null, false)
                    ).subscribe(res => {
                        this.permissiondata = res[0]
                        this.formfields = res[1]
                    })

                });
        })
    }

    generateBusinessKey() {
        return this.moduleId + "_" +new Date().getTime();
    }
}