import { Component, OnInit, ViewChild, ContentChild } from '@angular/core';

import { DropdownField } from '../../shared/form/dropdown-field';
import { FieldBase } from '../../shared/form/field-base';
import { TextField } from '../../shared/form/text-field';
import { DatetimePickField } from '../../shared/form/widget/datetime-pick.field'
import { DynamicFormHorizontalComponent } from '../../shared/form/dynamic-form-horizontal.component'
import { DynamicFormComponent } from '../../shared/form/dynamic-form.component'

import { UsertaskDoComponent } from '../../workflow/process/usertask-do.component'
// <dynamic-form-hori [fields]="_fields" [model]="$model" ></dynamic-form-hori>
@Component({
    selector: 'contract-form',
    template: `
    <my-container [styles]="'width: 210mm;'">
        <usertask-do [outFormData]="getFormData" (modelinit)="onModelEvent($event)" [isCustomForm]=false> 
           
        </usertask-do>
    </my-container>
    `
})
export class ContractinfoComponent implements OnInit {
    _fields: Array<FieldBase<string>>
    $model: any = {}
    @ViewChild(UsertaskDoComponent) taskDo: UsertaskDoComponent
    @ViewChild(DynamicFormHorizontalComponent) contractForm: DynamicFormHorizontalComponent
    // @ViewChild("df_ref") taskDo: UsertaskDoComponent
    constructor() { }

    ngOnInit() {
        this.taskDo.onFieldInit.subscribe(data => {
            let ptController = this.taskDo.formCom.form.get('projectType');
            let pcController = this.taskDo.formCom.form.get('projectCategory');
            let pcField = this.taskDo.formCom.getField("projectCategory")
            let sdField = this.taskDo.formCom.getField("supervisionDept")
            sdField.click = ($event) => {
                alert("监管部门clicked")
            }
            let pcValue = ptController.value
// debugger
            if (pcValue == "ZJ") {
                pcField.dictName = "项目管理_造价项目类型"
            } else if (pcValue == "ZB") {
                pcField.dictName = "项目管理_招标项目类型"
            }

            ptController.valueChanges.forEach(
                (value: string) => {
                    // debugger
                    if (value == "ZJ") {
                        pcField.dictName = "项目管理_造价项目类型"
                    } else if (value == "ZB") {
                        pcField.dictName = "项目管理_招标项目类型"
                    }
                }
            );
        })

        this.taskDo.formDataSubject.subscribe(data => {
            //  this.contractForm.form.patchValue(data)
        })
        this._fields = [
            new TextField({
                key: 'contractName', label: '合同名称', required: true, span: 12, order: 1
            }),
            new TextField({
                key: 'client', label: '委托方', required: true, span: 12, order: 2
            }),
            new TextField({
                key: 'contactPerson', label: '委托方联系人', required: true, span: 6, order: 3
            }),
            new TextField({
                key: 'contactPhone', label: '委托方联系电话', required: true, span: 6, order: 4
            }),
            new TextField({
                key: 'supervisionDept', label: '预报监管部门', required: true, span: 6, order: 5
            }),
            new DatetimePickField({
                key: 'submitSuperviseDate', label: '预报监管日期', required: true, span: 6, order: 6
            }),
            new TextField({
                key: 'contractNo', label: '合同编号', required: true, span: 6, order: 5
            }),
            new TextField({
                key: 'undertaker', label: '承办方', required: true, span: 6, order: 5
            }),
            new DropdownField({
                key: 'serviceTypeId',
                label: '服务分类',
                options: [
                    { key: 'F', value: '女' },
                    { key: 'M', value: '男' },
                ],
                span: 6,
                order: 4
            }),
            new DropdownField({
                key: 'formId',
                label: '表单',
                // optionsOb:
                // this.http.get('formmgt/getallform', new RequestOptions({
                //     headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }),
                // })).map(data => data.json()),
                span: 6,
                order: 4,
                optionId: "formId",
                optionName: "formName",
            }),
            new TextField({
                key: 'productNo',
                label: '编码',
                required: true,
                span: 6,
                order: 1
            }),
            new TextField({
                key: 'productName',
                label: '服务名称',
                required: true,
                span: 6,
                order: 2
            }),
            new TextField({
                key: 'ico',
                label: '图标',
                required: true,
                span: 6,
                order: 3
            }),
        ];

    }
    ngAfterViewInit() {

    }

    getFormData = () => {
        // return this.contractForm.form.value
    }

    onModelEvent(e) {

    }
}