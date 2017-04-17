import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class DictdataService {
    private _prefix = "dict/"
    private _getDictDataMaps = 'getDictDataMaps'

    results: any

    constructor(private http: Http) { }

    getDictDataMaps(ids: string[]) {
        let url = this._prefix + this._getDictDataMaps
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, JSON.stringify(ids), options)
            .map((data) => data.json())
            .catch(this.handleError)
            .subscribe(
            data => {
                this.results = data
            }
            )
    }

    getDictDataValue(dictType: string, dictname: string) {
        let dictdata = this.results[dictType][dictname]
        return dictdata.dictdataValue
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}