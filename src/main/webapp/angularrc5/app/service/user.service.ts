import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    private _prefix = "user/"
    private _username_validate_url = 'userorgmgt/validate'
    private _user_add_url = "user/create"
    private _user_update_url = this._prefix + "/update"
    private _user_deletebyids_url = this._prefix + "/delete"
    private _user_setjobs_url = this._prefix + "/setjobs"
    private _user_removealljobs_url = this._prefix + "/removealljobs"

    constructor(private http: Http) { }

    validate(key: string, value: string, type: string): Promise<any> {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.set("key", key);
        urlSearchParams.set("value", value);
        urlSearchParams.set("type", type);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });
        return new Promise(resolve => {
            this.http.get(this._username_validate_url, options)
                .map(res => res.json())
                .subscribe(
                    data => {
                        if (data.validate === "success") {
                            resolve(null);
                        } else {
                            resolve({ userName: false });
                        }
                    },
                    err => {
                        resolve({ userName: false });
                    }
                )
        });
    }

    create(userDTO,orgId):Promise<any>{
        let body = JSON.stringify(
            {
                userDTO:userDTO,
                orgId:orgId,
                sn:999
            });
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this._user_add_url, body, options)
                        .toPromise()
                        .then(()=>{return true})
                        .catch(this.handleError);
    }

    getUserByPK(userId:string){
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
        });
        let url = this._prefix + userId
        return this.http.get(url)
            .toPromise()
            .then(
                data => {
                    return data.json()
                }
            )
    }

    update(userDTO){
        let body = JSON.stringify(userDTO);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });     
        return this.http.post(this._user_update_url, body, options)
                        .toPromise()
                        .then((data)=>{return data.json()})
                        .catch(this.handleError);        
    }

    deleteByIds(ids:string[]){
        let body = JSON.stringify(ids);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });     
        return this.http.post(this._user_deletebyids_url, body, options)
                        .toPromise()
                        .then((data)=>{return true})
                        .catch(this.handleError);         
    }

    setJobs(userIds:string[],jobIds:string[]){
        let body = JSON.stringify({
            userIds:userIds,
            jobIds:jobIds
        });
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });     
        return this.http.post(this._user_setjobs_url, body, options)
                        .toPromise()
                        .then((data)=>{return data.json()})
                        .catch(this.handleError);          
    }

    removeAllJobs(userIds:string[]){
        let body = JSON.stringify(userIds);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });     
        return this.http.post(this._user_removealljobs_url, body, options)
                        .toPromise()
                        .then((data)=>{return data.json()})
                        .catch(this.handleError);  
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}