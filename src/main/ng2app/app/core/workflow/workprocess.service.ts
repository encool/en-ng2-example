import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WorkprocessService {
    constructor(private http: Http) {

    }
    startWorkFlow(moduleId: string, formId: string, businessKey: string, processDefinitionId: string,
        entity: any, transition: any, variables: any, wfOperator: any, userId: string): Promise<any> {

        let paramsData = {
            transition: transition,
            moduleId: moduleId,
            formId: formId,
            businessKey: businessKey,
            processDefinitionId: processDefinitionId,
            variables: variables,
            entity: entity,
            wfOperator: {
                userId: userId,
                businessData: {
                    moduleId: moduleId,
                    businessKey: businessKey
                }
            }

        }
        let body = JSON.stringify(paramsData);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
        });
        return this.http.post('flow/startflow', body, options)
            .toPromise()
            .then((data) => {

            })
    }

    goAnyWhereTakeTransition(moduleId: string, formId: string, businessKey: string, processDefinitionId: string,
        taskId: string, processInstanceId: string, taskDefKey: string, opinion: string,
        entity: any, transition: any, variables: any, wfOperator: any, userId: string): Promise<any> {

        let paramData = {
            transition: transition,
            transitionId: transition.id,
            formId: formId,
            wfOperator: {
                userId: userId,
                businessData: {
                    moduleId: moduleId,
                    businessKey: businessKey
                }
            },
            businessKey: businessKey,
            isStart: false,
            processDefinitionId: processDefinitionId,
            moduleId: moduleId,
            currenTaskId: taskId,
            destTaskDefinitionKey: transition.dest.id,
            useHisAssignee: false,
            variables: variables,
            entity: entity,
            proInsId: processInstanceId,
            taskDefKey: taskDefKey,
            opinion: opinion

        }
        let body = JSON.stringify(paramData);

        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
        });
        return this.http.post('flow/goanywhere', body, options)
            .toPromise()
            .then((data) => { return })

    }

    rejectFlow(moduleId: string, formId: string, businessKey: string, processDefinitionId: string,
        taskId: string, processInstanceId: string, taskDefKey: string, returnToTaskDefKey: string,
        entity: any, transition: any, variables: any, wfOperator: any, userId: string, opinion: string ): Promise<any> {

        let paramData = {
            rejectMessage: "reject",

            formId: formId,
            wfOperator: {
                userId: userId,
                businessData: {
                    moduleId: moduleId,
                    businessKey: businessKey
                }
            },
            curActivity: transition.src,
            businessKey: businessKey,
            isStart: false,
            processDefinitionId: processDefinitionId,
            moduleId: moduleId,
            currenTaskId: taskId,
            destTaskDefinitionKey: returnToTaskDefKey,
            useHisAssignee: true,
            variables: variables,
            entity: entity,
            proInsId: processInstanceId,
            taskDefKey: taskDefKey,
            opinion: opinion
        }

        let body = JSON.stringify(paramData);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
        });
        return this.http.post('flow/reject', body, options)
            .toPromise()
            .then((data) => { return })
    }
}