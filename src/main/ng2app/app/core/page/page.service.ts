import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PageService {

    constructor(private http: Http) { }

    getPage(url: string, rows: number, page: number,
        cond?: Object, sidx?: string, sord?: string, _search?: boolean): Promise<any> {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.set("rows", rows.toString());
        urlSearchParams.set("page", page.toString());
        urlSearchParams.set("sidx", sidx || "");
        urlSearchParams.set("sord", sord || "asc");
        urlSearchParams.set("_search", _search ? "true" : "false");
        urlSearchParams.set("cond", JSON.stringify(cond));
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers, search: urlSearchParams });
        return this.http.get(url, options)
            .toPromise()
            .then((data) => { return data.json() })
    }

}