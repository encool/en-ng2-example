import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { WorkflowService } from '../../../core/workflow/workflow.service'

@Component({
    selector: 'wf-sp-entry',
    template: `
    <my-container>
    <table id="productentry" width="100%" border="0" cellspacing="0" cellpadding="0" class="ng-scope"><tbody>
        <tr *ngFor="let a of products" style="padding-bottom:30px" class="ng-scope">
            <td align="left" valign="top" width="33%" style="line-height:110px;" *ngFor="let tmp of a" class="ng-scope">
        	<table width="95%" border="0" cellspacing="0" cellpadding="0" class="tab_chanpin">
        		<tbody>
        			<tr id="servic_icon">
        				<td width="21%" rowspan="2" style="text-align:right;padding-right:10px">
                            <a href="javascript:" (click)="startProductService(tmp)">
        					<img src="/assets/images/serviceproducticon\pulish.png" width="64" height="64"></a></td>
        					<th width="79%" class="chapin_name ng-binding">{{tmp.productName}}</th>
        			</tr>
        			<tr>
        				<td title=""><p></p></td>
        			</tr>
        	</tbody>
        
        	</table>
        	</td>
        </tr>
    </tbody>
    </table>
    </my-container>
    `
})
export class ServiceproductEntryComponent implements OnInit {
    //for test
    $model = {}
    strategy_options = {
        "falsefilter": "无过滤",
        "orgfilter": "按部门过滤",
        "orgbossfilter": "按部门&领导过滤",
        "starter": "分派申请人",
        "historyassign": "历史处理人"
    }
    // testend

    products: any[] = []

    constructor(private router: Router, private wfs: WorkflowService) { }

    startProductService(product) {
        let url = product.wfProcessstartUrl
        if (url) {
            this.router.navigate([url, product]);
        } else {

            this.router.navigate(['/workflow/usertaskdo', product]);
        }
    }

    ngOnInit() {
        this.wfs.getAvaliableProducts(null).then(
            data => {
                var r = data;
                var size = data.length;
                var a = new Array();
                var col = 3;
                for (var i = 0; i < size; i = i + 3) {
                    var b = new Array();
                    var j = i;
                    var m = col;
                    while (j < size && m > 0) {
                        b.push(r[j]);
                        j++;
                        m--;
                    }
                    a.push(b);
                }
                this.products = a;
            }
        )
    }
}