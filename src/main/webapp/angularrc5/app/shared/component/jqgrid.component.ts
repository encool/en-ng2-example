import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { JqgridEvent } from '../object/jqgrid-event'
import { ColModel } from '../object/col-model'
import { JqgridAction } from '../object/jqgrid-action'
import { JqgridCallback } from '../interface/jqgrid.callback'
import { JqgridSetting } from '../object/jqgrid-setting'

@Component({
    moduleId: module.id,
    selector: 'my-grid',
    templateUrl: "jqgrid.component.html"
})
export class JqgridComponent implements OnInit {

    jqgridObject:any
    @Input() postParams:any = {}

    @Input() colModel:ColModel[]

    @Input() jqgridSetting:JqgridSetting
    @Input() callback:JqgridCallback

    @Output() jqgridevent = new EventEmitter();

    constructor() { }

    ngOnInit() {
		// $.jgrid.defaults.width = 780;
		$.jgrid.defaults.styleUI = 'Bootstrap';        
        this.jqgridObject = $("#jqGrid").jqGrid({
            colModel: this.colModel,
            treeReader:{
                level_field: "level",
                parent_id_field: "pid",
                leaf_field: "isLeaf",
                expanded_field: "open"
            },           
            jsonReader: {
                root:"contents",
                id:this.jqgridSetting.primaryKey,
                page:"pageIndex",
                records:"total",
                total:"totalPage"
            },  
            postData:this.postParams,
            serializeGridData: (postData)=>{
                //page转数字，如果转换失败默认为1
                postData.page = parseInt(postData.page,10);
                if (isNaN(postData.page)) postData.page = 1;
                
                let myPostData:any= {
                    nd:postData.nd,
                    _search:postData._search,
                    rows:postData.rows,
                    page:postData.page,
                    sidx:postData.sidx,
                    sord:postData.sord,
                    nodeid:postData.nodeid,
                    n_level:postData.n_level
                };
                delete postData.nd;
                delete postData._search;
                delete postData.rows;
                delete postData.page;
                delete postData.sidx;
                delete postData.sord;
                delete postData.nodeid;
                delete postData.n_level;
                for (var pd in postData){
                    if($.trim(postData[pd])=="")delete postData[pd];
                }
                
                if(this.jqgridSetting.mtype == "get"){
                    myPostData.cond = JSON.stringify(postData);
                    return myPostData
                }else{
                    myPostData.cond = postData;
                    return JSON.stringify(myPostData);
                }
            },        
            regional:'en',
            autowidth:true,
            shrinkToFit:true,
            height: 200,
            rowNum: 15,
            url: this.jqgridSetting.url,
            mtype: this.jqgridSetting.mtype,
            ajaxGridOptions: { contentType: 'application/json; charset=utf-8' },
            datatype: "json",

            multiselect: this.jqgridSetting.multiselect,//是否能够多选
            multiboxonly: true,//需要点击checkbox才能多选
            pager: "#jqGridPager",

            onSelectRow:(rowid,status,e)=>{
                this.callback.onSelectRow(rowid,status,e);
                // scope.onSelectRow({rowid: rowid, status: status, e:e});
            },
        });       
    }

    onAction(action:JqgridAction){
        if(action.key == "refresh"){
            this.refresh();
            return;
        }
        let rowId = this.getSingleSelectRowId();
        let rowData = this.getSingleSelectData();
        let rowDatas = this.getSelectDatas();
        let event:JqgridEvent = new JqgridEvent(this.jqgridSetting.gridId,action,rowId,rowData,rowDatas)  
        this.jqgridevent.emit(event);
    }

    /**
     * 刷新列表
     * param:表格查询传递的参数对象{xx:xx,xxx:xxx}
     */
    refresh(param?) {
        this.postParams = param;
        if(param != undefined){
            var pd = this.jqgridObject.jqGrid("getGridParam","postData");
            for(var p in pd){
                delete pd[p];
            }
            this.jqgridObject.jqGrid("setGridParam", {postData:param});
            this.jqgridObject.jqGrid("setGridParam", {page:1}).trigger("reloadGrid");
        }else{
            this.jqgridObject.jqGrid().trigger("reloadGrid");
        }
    }
    addParams = function(params,fresh){
        var pd = this.jqgridObject.jqGrid("getGridParam","postData");
        Array.forEach(params,function(value,key){
            pd[key]=value;
        });
        if(fresh == undefined)fresh=true;
        if(fresh)this.jqgridObject.jqGrid("setGridParam", {page:1}).trigger("reloadGrid");
    }
    removeParam = function(paramName,fresh){
        var pd = this.jqgridObject.jqGrid("getGridParam","postData");
        for(var p in pd){
            if(p==paramName)delete pd[p];;
        }
        if(fresh == undefined)fresh=true;
        if(fresh)this.jqgridObject.jqGrid("setGridParam", {page:1}).trigger("reloadGrid");
    }
    setParams = function(params,fresh){
        if(params != undefined){
            var pd = this.jqgridObject.jqGrid("getGridParam","postData");
            for(var p in pd){
                delete pd[p];;
            }
            this.jqgridObject.jqGrid("setGridParam", {postData:params});
        }
        if(fresh == undefined )fresh=true;
        if(fresh)this.jqgridObject.jqGrid("setGridParam", {page:1}).trigger("reloadGrid");
    }

    getDataIDs = function(){
        return this.jqgridObject.jqGrid("getDataIDs");
    }
    //获取指定列的数据 rowId:主列的值;如果rowId为空，则返回表格全部数据。
    getRowData = function (rowId) {
        return this.jqgridObject.jqGrid("getRowData", rowId);
    }
    //获取表格信息。param:"rowNum"-每页记录条数 "page"-当前第几页 “records”-总共有多少条
    getGridParam = function(param){
        return this.jqgridObject.jqGrid("getGridParam",param);
    }
    //获取单个选中的行的主列值，如果选中多个这返回最后选中的值
    getSingleSelectRowId():string{
        return this.jqgridObject.jqGrid("getGridParam", "selrow");
    }
    //获取所有选中的行的主列值，返回数组
    getSelectRowIds():string[] { 
        return this.jqgridObject.jqGrid("getGridParam", "selarrrow");
    }
    //返回单个选中的行数据
    getSingleSelectData = function () {
        var rowId = this.jqgridObject.jqGrid("getGridParam", "selrow");
        return this.jqgridObject.jqGrid("getRowData", rowId);
    }
    //返回所有选中行数据的数组
    getSelectDatas():Array<any>{
        var rowIds = this.jqgridObject.jqGrid("getGridParam", "selarrrow");
        var selectDatas = new Array();
        _.forEach(rowIds,(value, key)=>{
            var rowData = this.jqgridObject.jqGrid("getRowData", value);
            selectDatas.push(rowData);
        });
        return selectDatas;
    }

    formatTitle(cellValue, options, rowObject) {
        return cellValue.substring(0, 50) + "...";
    }
    formatLink(cellValue, options, rowObject) {
        return "<a href='" + cellValue + "'>" + cellValue.substring(0, 25) + "..." + "</a>";
    }

}