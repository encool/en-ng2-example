import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

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

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}