import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import { JqgridSetting, JqgridAction, JqgridEvent, JqgridCallback, DefaultJqgridCallback, ColModel, JqgridComponent} from '../../shared/jqgrid.module'

import { DropdownField } from '../../shared/form/dropdown-field';
import { FieldBase } from '../../commonshared/form/field-base'
import { TextField }  from '../../shared/form/text-field';
import { DynamicFormComponent } from '../../shared/form/dynamic-form.component'

@Component({
    selector: 'ff-rel-add',
    template: `
    <my-container>
        <my-grid #fieldmanagegrid_ref [colModel]="_fieldmgt_col_model" [jqgridSetting]="_fieldmgt_grid_setting"
            (jqgridevent)="onGridAction($event)" [callback]="fgridCall">
        </my-grid> 
    </my-container>
    `
})
export class RelAddComponent implements OnInit {

    @ViewChild("fieldmanagegrid_ref") fieldGrid: JqgridComponent

    _fieldmgt_col_model = [
        new ColModel({ label: "fieldId", name: "fieldId", width: 20, hidden: true, key: true }),
        new ColModel({ label: "字段编码", name: "fieldNo", width: 20 }),
        new ColModel({ label: "字段名称", name: "fieldName", width: 20 }),
        new ColModel({ label: "字段描述", name: "fieldDescribe", width: 20 }),
    ]
    _fieldmgt_grid_setting = new JqgridSetting({
        gridId: "fieldmgtgrid",
        primaryKey: "fieldId",
        url: "list/e/workflowformfield",
        // title: "字段管理",
    })


    @Input() $model: any = {
        model: {},
        params: {}
    }


    constructor(private http: Http) {

    }

    _sn = "workflowformfieldrel"

    ngOnInit() {
        if (this.$model.model == undefined) {
            this.$model.model = {}
        }
    }

    onModalAction(): Promise<any> {
        let ids = this.fieldGrid.getSelectRowIds()
        let body = JSON.stringify(ids);
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.set('formId', this.$model.param.formId);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });
        return this.http.post('formmgt/addformfieldrel', body, options)
            .toPromise()
            .then((data) => {

            })
    }

    onModalNativeEvent(event: String, e: any): any {
        if (event === "shown.bs.modal") {
            this.fieldGrid.onResize();
        }
    }
}