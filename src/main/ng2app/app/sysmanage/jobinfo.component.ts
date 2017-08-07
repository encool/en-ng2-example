import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { FieldDataService } from '../shared/form/field-data.service'
import { JobService } from '../service/job.service'

import { DropdownField } from '../shared/form/dropdown-field';
import { FieldBase } from '../commonshared/form/field-base'
import { TextField } from '../shared/form/text-field';
import { DynamicFormComponent } from '../shared/form/dynamic-form.component'
import { onModalAction } from '../shared/interface/modal_hook'
@Component({
    selector: 'my-jobinfo',
    templateUrl: './jobinfo.component.html'
})
export class JobinfoComponent implements OnInit, onModalAction {
    @Input() $model: any = {
        job: {}
    }
    @ViewChild("form") myForm: DynamicFormComponent

    jobfields: any[];
    constructor(private jobService: JobService) {
        // this.menufields = fieldDataService.getFields();
        this.jobfields = [
            // new DropdownField({
            //     key: 'brave',
            //     label: 'Bravery Rating',
            //     options: [
            //     {key: 'solid',  value: 'Solid'},
            //     {key: 'great',  value: 'Great'},
            //     {key: 'good',   value: 'Good'},
            //     {key: 'unproven', value: 'Unproven'}
            //     ],
            //     order: 3
            // }),
            new TextField({
                key: 'jobName',
                label: '岗位名称',
                required: true,
                order: 1
            }),
            new TextField({
                key: 'jobNumber',
                label: '岗位编号',
                required: true,
                order: 3
            }),
            new TextField({
                key: 'jobFunction',
                label: '岗位职责',
                required: true,
                order: 3
            }),
            new TextField({
                key: 'jobDesc',
                label: '岗位描述',
                required: true,
                order: 4
            })
        ];
    }
    ngOnInit() {

    }
    onModalAction(): Promise<any> {
        if (this.$model.params.type == 'edit') {
            if (this.myForm.form.valid) {
                let job = this.myForm.form.value
                job.jobId = this.$model.job.jobId
                return this.jobService.update(job).then(() => { return "jobupdated" })

            } else {
                return new Promise((resolve, reject) => {
                    reject('no valid');
                    toastr.warning('验证不通过！')
                })
            }
        } else if (this.$model.params.type == 'add') {
            if (this.myForm.form.valid) {
                let job = this.myForm.form.value
                job.jobScope = this.$model.job.jobScope
                return this.jobService.create(job, this.$model.params.orgId).then(() => { return "jobadded" })
            } else {
                return new Promise((resolve, reject) => {
                    reject('no valid');
                    toastr.warning('验证不通过！')
                })
            }
        }
    }
}