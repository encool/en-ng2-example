import { Component, OnInit } from '@angular/core';
import { TreeEvent, ZtreeSetting, ZtreeComponent, onZtreeAction, TreeAction, TreeNode, ZtreeCallback, DefaultZtreeCallBack} from '../../shared/ztree.module'

@Component({
    selector: 'process-candidate',
    template: `
    <my-ztree #tree_ref [ztreeSetting]="_tree_setting" 
        (zevent)="onZtreeAction($event)" [callback]="TreeCallBack"></my-ztree>	    
    `
})
export class ChooseCandidateComponent implements OnInit {
    _tree_setting = new ZtreeSetting({
        dataUrl: "tree/moduletreecontent",
        treeId: "producttree",
        autoParam: ["id"],
    })    
    constructor() { }

    ngOnInit() { }

    TreeCallBack =  new DefaultZtreeCallBack({
        
    })
}