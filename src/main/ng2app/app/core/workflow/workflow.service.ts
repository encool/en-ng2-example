import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { TextField } from '../../shared'
import { DropdownField } from '../../shared'
import { DatetimePickField } from '../../shared'
import { TextareaField } from '../../shared'
import { Select2Field } from '../../shared'
import { CheckboxField } from '../../shared'
import { CheckboxGroupField } from '../../shared'
import { FileUploadField } from '../../shared'
import { CustomTemplateField } from '../../shared'

@Injectable()
export class WorkflowService {

    private _serviceproduct_url = "e/workflowserviceproduct/"

    private _createModelURl: string = "workflow/model/create"

    constructor(private http: Http) { }

    getAvaliableProducts(serviceProduct: any): Promise<any> {
        let body = JSON.stringify(serviceProduct);
        let urlSearchParams = new URLSearchParams();
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });
        return this.http.post('cs/getavaliableproducts', body, options)
            .toPromise()
            .then((data) => {
                return data.json()
            })
    }

    getProduct(id: string): Promise<any> {
        let url = this._serviceproduct_url + id;
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers, });
        return this.http.get(url, options).toPromise()
            .then(data => {
                return data.json()
            })
            .catch(this.handleError)
    }

    createProduct(serviceProduct): Promise<any> {
        let body = JSON.stringify(serviceProduct);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this._serviceproduct_url, body, options)
            .toPromise()
            .then((data) => { return true })
            .catch(this.handleError);
    }

    delProduct(ids: String[]): Promise<any> {
        let idstr = ids.join(",")
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this._serviceproduct_url + idstr, options)
            .toPromise()
            .then((data) => { return true })
            .catch(this.handleError);
    }

    createModel(name, key, description): Promise<any> {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.set("name", name);
        urlSearchParams.set("key", key);
        urlSearchParams.set("description", description);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers, search: urlSearchParams });
        return this.http.get(this._createModelURl, options)
            .toPromise()
            .then((data) => { return data.json() })
            .catch(this.handleError);
    }

    getfieldpermissiondata(serviceProduct: any, taskDefKey: string): Observable<any> {
        let paramData = { "serviceProduct": serviceProduct, "businessKey": taskDefKey }
        let body = JSON.stringify(paramData);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
        });
        return this.http.post('field/getpermissiondata', body, options).map(rep => rep.json())

    }

    savefieldpermissiondata(serviceProduct: any, taskDefKey: string, permissiondata: any[]): Observable<any> {
        let paramData = { "serviceProduct": serviceProduct, "businessKey": taskDefKey, data: permissiondata }
        let body = JSON.stringify(paramData);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
        });
        return this.http.post('field/savepermissiondata', body, options)
    }

    getformdata(formId, businessKey, proInsId): Observable<any> {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.set('formId', formId);
        urlSearchParams.set('businessKey', businessKey);
        urlSearchParams.set('proInsId', proInsId);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });
        return this.http.get('formmgt/getformdata', options).map((res: Response) => res.json())
    }

    getformfield(formId, fieldType: string[], isClassify): Observable<any> {
        let paramData = { "formId": formId, "fieldType": fieldType, isClassify: isClassify }
        let body = JSON.stringify(paramData);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
        });
        return this.http.post('formmgt/getformfield', body, options).map((res: Response) => res.json())
    }

    getTransitions(procDefId, activitiId): Observable<any> {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.set('procDefId', procDefId);
        urlSearchParams.set('activitiId', activitiId);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });
        return this.http.get('flowservice/gettransitions', options)
            .map((data) => { return data.json() })
    }

    getStartInfo(moduleId): Observable<any> {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.set('moduleId', moduleId);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });
        return this.http.get('flow/getstartinfo', options)
            .map((data) => {
                return data.json()
            })
    }

    getAllForm() {
        let urlSearchParams = new URLSearchParams();
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });
        this.http.get('formmgt/getallform', options)
            .toPromise()
            .then((data) => { return data.json() })
    }

    getActivities(procDefId): Observable<any> {
        return this.http.get('flowservice/getactivities',
            new RequestOptions({
                headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }),
                search: new URLSearchParams("procDefId=" + procDefId)
            })).map(resp => resp.json())
    }


    getActions(moduleId: string, activityId: string): Observable<any> {
        return this.http.post('flowservice/getactions',
            {
                moduleId: moduleId,
                activityId: activityId
            }
        ).map(resp => resp.json())
    }

    toWfFormGroupField(fields: any[], permissiondata: any, params: any): any[] {
        // debugger
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
                case "f-checkbox-group":
                    newFields.push(new CheckboxGroupField({
                        key: field.fieldNo,
                        label: field.displayName || field.fieldId.fieldName,
                        labelWidth: field.labelWidth,
                        span: field.displaySpan,
                        dictName: field.dictName,
                        optionsUrl: field.remark1,
                        optionId: field.remark2,
                        optionName: field.remark3,
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
                            businessKey: params.businessKey,
                            businessType: params.productNo
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
                            businessKey: params.businessKey,
                            businessType: params.product.productNo
                        }
                    }))
                    break
                case "f-text-input":
                    newFields.push(new TextField({
                        selector: field.webDisplayTypeId,
                        key: field.fieldNo,
                        type: field.fieldType == 'INT' ? 'number' : null,
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
                            remark1: field.remark1,
                            remark2: field.remark2,
                            remark3: field.remark3,
                            remark4: field.remark4,
                            processDefinitionId: params.processDefinitionId,
                            processInsId: params.processInsId,
                            moduleId: params.moduleId,
                            product: params.product,
                            taskDefKey: params.taskDefKey,
                            taskId: params.taskId,
                            formId: params.formId,
                            businessKey: params.businessKey,
                            transitions: params.transitions,
                            permissiondata: permissiondata[field.fieldNo],
                            properties: params.properties,
                            global: params.global,
                            preview: params.preview || false
                        }
                    }))
            }

        })
        return newFields
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}