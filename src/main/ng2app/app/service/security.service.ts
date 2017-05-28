import { Injectable, Inject } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Resource } from './resource'

@Injectable()
export class SecurityService {

    $window: any

    get subject() {
        if (!_.isUndefined(this.$window.sessionStorage.subject)
            && "undefined" != this.$window.sessionStorage.subject) {
            return JSON.parse(this.$window.sessionStorage.subject);
        } else {
            return undefined;
        }
    }

    constructor(private http: Http, @Inject('Window') window) {
        this.$window = window
    }

    createRes(r: Resource) {

    }

    isAuthenticated() {
        if (!_.isUndefined(this.$window.sessionStorage.authenticated)) {
            return this.$window.sessionStorage.authenticated;
        } else {
            return false;
        }
    }


    getSubject(): Observable<any> {
        if (!_.isUndefined(this.$window.sessionStorage.subject)
            && "undefined" != this.$window.sessionStorage.subject) {
            var source = Observable.create(observer => {
                observer.next(JSON.parse(this.$window.sessionStorage.subject));
                observer.complete();
            });
            return source
        } else {
            let urlSearchParams = new URLSearchParams();
            let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
            let options = new RequestOptions({
                headers: headers,
                search: urlSearchParams
            });
            return this.http.get('getsubject', options)
                .map(res => {
                    window.sessionStorage.subject = JSON.stringify(res.json());
                    // this.$window.sessionStorage.syssubject = res.json()
                    return res.json()
                })
        }
    }
    login(username, password, url, errFun) {

        // //手动输入登陆页面情况，登陆成功要进首页
        // if(_.isUndefined(url)||""==url){
        //     var locationUrl=$location.absUrl();
        //     var pageStr=locationUrl.substr(locationUrl.lastIndexOf("/"));
        //     if(pageStr.indexOf("login")!=-1){
        //         url="./";
        //     }
        // }

        // this.http.post("ws/login", {
        //     "username" : username,
        //     "password" : password
        // }).success(function(data) {
        //     this.$window.sessionStorage.authenticated = true;
        //     this.$window.sessionStorage.subject = JSON.stringify(data.result);

        //     //被拦截的模块登陆，需要直接进入该模块
        //     if (""==url||_.isUndefined(url)) {
        //         var hrefStr=location.href;
        //         if(hrefStr.indexOf("backUrl")!=-1){
        //             var backUrl=hrefStr.substr(hrefStr.indexOf("backUrl")+8,hrefStr.length);
        //             location.href = "./"+backUrl;
        //         }else if(hrefStr.indexOf("login.jsp")!=-1||hrefStr.indexOf("login.html")!=-1){
        //             location.href = "./";
        //         }else{
        //             window.location.reload();
        //         }
        //     }else{
        //         this.$window.location.href = url;
        //     }

        // }).error(function() {
        //     this.$window.sessionStorage.authenticated = false;
        //     this.$window.sessionStorage.subject = undefined;

        //     if(!_.isUndefined(errFun) && _.isFunction(errFun)){
        //         errFun();
        //     }
        // });
    }
    logout() {
        this.http.post("logoutAction", {}).toPromise().then((data) => {

            this.$window.sessionStorage.authenticated = false;
            this.$window.sessionStorage.subject = undefined;
            if (_.isUndefined(data) || _.isUndefined(data.json().result)) {
                this.$window.location.reload();
            } else {
                this.$window.location.href = data.json().result;
            }
        }).catch(function () {
        });
    }
}