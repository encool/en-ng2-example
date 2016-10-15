import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { WorkflowService } from '../service/workflow.service'

@Component({
    moduleId: module.id,
    selector: 'wf-sp-entry',
    template: `
    <table id="productentry" width="100%" border="0" cellspacing="0" cellpadding="0" class="ng-scope"><tbody>
    <!-- ngRepeat: a in $model.a -->
        <tr *ngFor="let a of products" style="padding-bottom:30px" class="ng-scope">
        	<!-- ngRepeat: tmp in a -->
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
        	</td><!-- end ngRepeat: tmp in a -->
        </tr>
    </tbody></table>    
    `
})
export class ServiceproductEntryComponent implements OnInit {

    products: any[] = []

    constructor(private router: Router,private wfs: WorkflowService) { }

    startProductService(product) {
        this.router.navigate(['/workflow/usertaskdo', product]);
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