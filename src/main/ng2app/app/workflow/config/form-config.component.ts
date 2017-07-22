import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin'
// import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import { WorkflowService } from '../../core/workflow/workflow.service'


@Component({
    selector: 'wf-form-config',
    template: `
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="table-height">
    <tbody>
    	<tr *ngFor="let a of formfields" style="margin-bottom: 10px;">                                                    
        	<td width="33.3%" *ngFor="let tmp of a">
    			<table width="100%">
    			<tbody>
    				<td width="32%">{{tmp.fieldName}}</td>    
    				<td width="68%">
    				<input type="checkbox" checked="checked" [(ngModel)]="permissiondata[tmp.fieldNo].writePermission"  name="checkboxFieldW">可写
    				<input type="checkbox" checked="checked" [(ngModel)]="permissiondata[tmp.fieldNo].visible"  name="checkboxFieldW1">可见
    				<input type="checkbox" checked="checked" [(ngModel)]="permissiondata[tmp.fieldNo].fillnecessary"  name="checkboxFieldW2">必填
    				</td>    
    			</tbody></table>
            </td>                                                                                                    
        </tr>
    </tbody>
</table>    
    `
})
export class FormConfigComponent implements OnInit {
    serviceProduct: any
    // @Input() taskDefKey: string
    @Input() $model: any
    permissiondata: any
    formfields: any[]
    constructor(private flowService: WorkflowService) { }

    ngOnInit() {
        Observable.forkJoin(
            this.flowService.getfieldpermissiondata({ serviceProductId: this.$model.params.moduleId }, this.$model.curActivity.id),
            this.flowService.getProduct(this.$model.params.moduleId),
        ).subscribe(res => {
            this.permissiondata = res[0]
            this.serviceProduct = res[1]
            this.flowService.getformfield(this.serviceProduct.formId, null, false).subscribe(data => {
                let f: any[] = data.all
                var a = new Array();
                var col = 3;
                var size = f.length;
                for (var i = 0; i < size; i = i + col) {
                    var b = new Array();
                    var j = i;
                    var m = col;
                    while (j < size && m > 0) {
                        b.push(f[j]);
                        j++;
                        m--;
                    }
                    a.push(b);
                }
                this.formfields = a
            })
        })
    }

    onModalAction(): Promise<any> {
        return this.flowService.savefieldpermissiondata(this.serviceProduct, this.$model.curActivity.id, this.permissiondata)
            .toPromise()
    }
}