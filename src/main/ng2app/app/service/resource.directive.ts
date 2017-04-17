import { Directive, ElementRef, Input } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import { Resource } from './resource'

@Directive({ selector: 'enResource' })
export class ResourceDirective {
    @Input() sn: string
    @Input() sname: string
    @Input() psn: string
    @Input() type: string

    @Input("enResource") resource: Resource

    constructor(private el: ElementRef, private http: Http) {
        el.nativeElement.style.backgroundColor = 'yellow';
    }

    ngOnInit() {
        debugger
        if (process.env.ENV != 'production') {
            let body = JSON.stringify({ res: this.resource });
            let urlSearchParams = new URLSearchParams();
            // urlSearchParams.set('', );
            let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
            let options = new RequestOptions({
                headers: headers,
                search: urlSearchParams
            });
            this.http.post('jobresmgt/createprivilege', body, options)
                .toPromise()
                .then((data) => { return })
        }
    }
}