import { Component, OnInit, Input } from '@angular/core';

import { FieldDataService } from '../shared/form/field-data.service'
import { JobService } from '../service/job.service'

import { DropdownField } from '../shared/form/dropdown-field';
import { FieldBase }     from '../shared/form/field-base';
import { TextField }  from '../shared/form/text-field';

import { modalOnSave } from '../shared/interface/modal_hook' 
@Component({
    selector: 'my-jobinfo',
    templateUrl: './jobinfo.component.html'
})
export class JobinfoComponent implements OnInit,modalOnSave {
    @Input() model:any = {}
    @Input() params:any
    jobfields:any[];
    constructor(private jobService:JobService) { 
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
    modalOnSave(){
        console.log("save model",this.model)
        if(this.params.type == "edit"){
            return this.jobService.update(this.model).then(()=>{ return "jobupdated"})
        }else if(this.params.type == "add"){
            return this.jobService.create(this.model,this.params.orgId).then(()=>{ return "jobadded"})
        }
        
    }
}