import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrgService {
    private _createOrgURl:string = "org/create"
    private _getOrgURL:string = "org/getorgbypk"
    private _updateOrgURL:string = "org/update"
    private _deleteOrgsURL:string = "org/deleteorgbypks"

    constructor(private http:Http){}

    create(parentOrgId,orgDTO):Promise<any>{
        orgDTO.parentId = parentOrgId;
        let body = JSON.stringify(orgDTO);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this._createOrgURl, body, options)
                        .toPromise()
                        .then(()=>{return true})
                        .catch(this.handleError);
    }

    getOrgByPK(orgId,parentId):Promise<any>{
        let body = JSON.stringify({orgId:orgId,parentId:parentId});
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });        
        return this.http.post(this._getOrgURL, body, options)
                        .toPromise()
                        .then((data)=>{return data.json()})
                        .catch(this.handleError);
    }

    update(orgDTO):Promise<any>{
        let body = JSON.stringify(orgDTO);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });     
        return this.http.post(this._updateOrgURL, body, options)
                        .toPromise()
                        .then((data)=>{return true})
                        .catch(this.handleError);
    }

    deleteOrgByPKs(ids:string[]):Promise<any>{
        let body = JSON.stringify(ids);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });     
        return this.http.post(this._deleteOrgsURL, body, options)
                        .toPromise()
                        .then((data)=>{return true})
                        .catch(this.handleError);      
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}