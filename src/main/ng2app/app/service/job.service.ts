import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class JobService {
    private _job_create_url = 'job/create'
    private _job_get_url_prefix = 'job/'
    private _job_update_url = 'job/update'
    private _job_deletebyids_url = 'job/deletebyids'
    private _job_getadminjobid = 'job/getadminjobid'
    private _geteveryonejobid = 'job/geteveryonejobid'
    constructor(private http:Http){}

    create(jobDTO,orgId):Promise<any>{
        let body = JSON.stringify(
            {
                jobDTO:jobDTO,
                orgId:orgId
            });
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this._job_create_url, body, options)
                        .toPromise()
                        .then(()=>{return true})
                        .catch(this.handleError);
    }

    get(orgId){
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this._job_get_url_prefix + orgId, options)
                        .toPromise()
                        .then((data)=>{return data.json()})
                        .catch(this.handleError);       
    }

    update(jobDTO){
        let body = JSON.stringify(jobDTO);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });     
        return this.http.post(this._job_update_url, body, options)
                        .toPromise()
                        .then((data)=>{return true})
                        .catch(this.handleError);       
    }

    deleteByIds(ids:string[]){
        let body = JSON.stringify(ids);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });     
        return this.http.post(this._job_deletebyids_url, body, options)
                        .toPromise()
                        .then((data)=>{return true})
                        .catch(this.handleError);         
    }

    getAdminJobId(){
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this._job_getadminjobid, options)
                        .toPromise()
                        .then((data)=>{return data.json()})
                        .catch(this.handleError);       
    }

    getEveryoneJobId(){
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this._geteveryonejobid, options)
                        .toPromise()
                        .then((data)=>{return data.json()})
                        .catch(this.handleError);        
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }    
}