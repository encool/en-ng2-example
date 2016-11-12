import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin'

import { TextComponent } from '../../shared/form/widget/text.component'
import { TextField } from '../../shared/form/text-field'
import { DropdownField } from '../../shared/form/dropdown-field'

import { WorkflowService } from '../service/workflow.service'

@Component({
    selector: 'wf-task-form',
    template: `
    <my-form>
        <dynamic-form-hori></dynamic-form-hori>
    </my-form>
    `
})
export class TaskFormComponent implements OnInit {


    @Input() formId: any
    @Input() permissiondata: any
    @Input() formData: any

    fields: any[]
    @ViewChild('wrapper', { read: ViewContainerRef }) wrapperRef: ViewContainerRef;

    constructor(private flowService: WorkflowService, private http: Http,
        private wfs: WorkflowService, private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
        debugger
        let urlSearchParams = new URLSearchParams();
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });
        Observable.forkJoin(
            this.flowService.getformfield(this.formId, null, false),
            this.http.get('flowservice/gettemplatesmap', options)
        ).subscribe(res => {
            debugger
            let fields = res[0].all
            let templates = res[1].json()
            // this.fields = this.toFormGroupField(fields)
            // this.fields.forEach(field => {
            //     let fact = this.componentFactoryResolver.resolveComponentFactory(TextComponent);
            //     let cmpRef: ComponentRef<any> = this.wrapperRef.createComponent(fact);
            // })
        })
    }

}