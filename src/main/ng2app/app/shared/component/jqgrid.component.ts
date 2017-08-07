import { Component, OnInit, Input, Output, EventEmitter, ElementRef, Renderer, ViewChild, HostListener } from '@angular/core';

import { JqgridEvent } from '../object/jqgrid-event'
import { ColModel } from '../object/col-model'
import { JqgridAction } from '../object/jqgrid-action'
import { JqgridCallback } from '../interface/jqgrid.callback'
import { JqgridSetting } from '../object/jqgrid-setting'
import { DynamicFormHorizontalComponent } from '../form/dynamic-form-horizontal.component'

import { FieldBase } from '../../commonshared/form/field-base';
import { Rule } from '../object/query/rule'
import { Conditions } from '../object/query/conditions'

import { Resource } from '../../service/resource'

let $ = require('jquery')

@Component({
    selector: 'my-grid',
    templateUrl: "./jqgrid.component.html"
})
export class JqgridComponent implements OnInit {

    jqgridObject: any
    //表格的初始化参数
    @Input() originParams: any = {}
    //初始化的查询参数
    originQueryParams: any = {}

    @Input() colModel: ColModel[]
    @Input() jqgridSetting: JqgridSetting
    @Input() callback: JqgridCallback

    @Output() jqgridevent = new EventEmitter();

    //jqgrid 对象？
    eleJqGrid: any
    @ViewChild('gridContain') gridContainEle: ElementRef;
    @ViewChild("gridqueryform") gridqueryform: DynamicFormHorizontalComponent

    _gridContainerWidth: number
    //行内编辑？
    dataOprations: any
    resource: Resource

    constructor(public renderer: Renderer) {

    }

    ngOnInit() {
        //把原始参数保存起来 以后的查询自动加上
        this.originParams = this.jqgridSetting.postData

        this.resource = {
            sn: this.jqgridSetting.gridId,
            code: this.jqgridSetting.gridId,
            name: this.jqgridSetting.title,
            type: "3"
        }
        // this.gridContainEle.changes.subscribe(changes => console.log(changes));
    }

    ngAfterViewInit() {
        (require as any).ensure(['jquery'], (require) => {
            // if (process.env.ENV === 'production') {
            //     require('../../../js/jquery.tablednd.min.js')
            // }else{
            //     require('../../../js/jquery.tablednd.js')
            // }
            require('../../../js/jquery.jqGrid.min.js')
            require('../../../js/grid.locale-cn.js')
            require('../../../js/jquery.tablednd.js')
            this.initJqgrid()
            this._gridContainerWidth = this.gridContainEle.nativeElement.offsetWidth
            this.recomputeWidth(this._gridContainerWidth, this.jqgridSetting.shrinkToFit)
        }, 'jquery.tablednd.js');
        // this.initJqgrid()
        // this._gridContainerWidth = this.gridContainEle.nativeElement.offsetWidth
        // this.recomputeWidth(this._gridContainerWidth, this.jqgridSetting.shrinkToFit)

        //初始化参数出现在查询字段里面 则初始化查询表单值
        if (this.hasQueryAction()) {
            // debugger
            this.gridqueryform.form.patchValue(this.jqgridSetting.postData)
            _.assign(this.originQueryParams, this.gridqueryform.form.value)
        }

    }

    query($event) {
        let postData = this.gridqueryform.form.value
        let queryParams = {}
        _.assign(queryParams, this.originParams, postData)
        // debugger
        this.doQueryParams(queryParams, this.jqgridSetting.queryfields)
        this.refresh(queryParams)
    }

    reset($event) {
        // debugger
        this.gridqueryform.form.reset()
        this.gridqueryform.form.patchValue(this.originQueryParams)
        this.refresh(this.originParams)
    }

    private doQueryParams(queryParams: any, fields: FieldBase<any>[]) {
        let rules: Rule[] = []
        for (let p in queryParams) {
            fields.forEach((v) => {
                if (v.key == p && queryParams[p] && v.fuzzy == true) {
                    let filtersbefore = queryParams.filters
                    let rule = new Rule(v.key, "cn", queryParams[p])
                    rules.push(rule)

                    delete queryParams[p]
                    // queryParams.
                }
                // debugger
            })
        }
        if (rules.length > 0) {
            let con = new Conditions("AND", rules, [])
            queryParams.filters = con
        }
    }

    hasQueryAction() {
        let result: boolean = false
        if (this.jqgridSetting.actions) {
            this.jqgridSetting.actions.forEach((v) => {
                if (v.isQuery) {
                    result = true
                }
            })
        }
        return result
    }

    initJqgrid() {
        // dts文件不正确 为了ts编译不报错处理
        // let jqs: any = $;
        this.eleJqGrid = $("#" + this.jqgridSetting.gridId)
        $.jgrid.defaults.styleUI = 'Bootstrap';
        this.jqgridObject = this.eleJqGrid.jqGrid({
            colModel: this.colModel,
            treeReader: {
                level_field: "level",
                parent_id_field: "pid",
                leaf_field: "isLeaf",
                expanded_field: "open"
            },
            jsonReader: {
                root: "contents",
                id: this.jqgridSetting.primaryKey,
                page: "pageIndex",
                records: "total",
                total: "totalPage"
            },
            postData: this.jqgridSetting.postData,
            serializeGridData: (postData) => {
                //page转数字，如果转换失败默认为1
                postData.page = parseInt(postData.page, 10);
                if (isNaN(postData.page)) postData.page = 1;

                let myPostData: any = {
                    nd: postData.nd,
                    _search: postData._search,
                    rows: postData.rows,
                    page: postData.page,
                    sidx: postData.sidx,
                    sord: postData.sord,
                    nodeid: postData.nodeid,
                    n_level: postData.n_level
                };
                delete postData.nd;
                delete postData._search;
                delete postData.rows;
                delete postData.page;
                delete postData.sidx;
                delete postData.sord;
                delete postData.nodeid;
                delete postData.n_level;
                for (var pd in postData) {
                    if ($.trim(postData[pd]) == "") delete postData[pd];
                }

                if (this.jqgridSetting.mtype == "get") {
                    myPostData.cond = JSON.stringify(postData);
                    return myPostData
                } else {
                    myPostData.cond = postData;
                    return JSON.stringify(myPostData);
                }
            },
            regional: 'en',
            autowidth: true,
            height: 'auto',
            rowNum: this.jqgridSetting.rowNum,
            url: this.jqgridSetting.url,
            mtype: this.jqgridSetting.mtype,
            ajaxGridOptions: { contentType: 'application/json; charset=utf-8' },
            datatype: "json",


            editurl: this.jqgridSetting.editurl,
            //				colNames:colNames,//定义列头名称，已在colModel里面设置
            //				caption: attrs.caption,//标题，不使用jqGrid的标题显示，显示到表头工具栏左边
            sortable: false,//When set to true, this option allows reordering columns by dragging and dropping them with the mouse. Since this option uses the jQuery UI sortable widget, be sure to load this widget and its related files in the HTML head tag of the page. Also, be sure to select the jQuery UI Addons option under the jQuery UI Addon Methods section while downloading jqGrid if you want to use this facility.???没效果
            sortname: this.jqgridSetting.sortname,
            sortorder: this.jqgridSetting.sortorder,
            multiSort: this.jqgridSetting.multiSort,//多列排序
            width: this.jqgridSetting.width,
            // rownumbers:this.jqgridSetting.rownumbers&&!scope.treeGrid,//显示序号
            rownumbers: this.jqgridSetting.rownumbers,//显示序号  
            scroll: this.jqgridSetting.scroll,//滚动条代替翻页
            scrollrows: true,//当为true时让所选择的行可见？？
            scrollOffset: 18,//滚动条宽度
            rowList: [this.jqgridSetting.rowNum, this.jqgridSetting.rowNum * 2, 50, 100],
            //				pager : "#grid-pager-"+scope.id, //分页栏
            pagerpos: "center",//指定分页栏的位置
            pgbuttons: true,//是否显示翻页按钮
            pginput: true,//是否显示跳转页面的输入框
            viewrecords: true,//是否显示总记录数
            //				pgtext:"",//在表格底部显示当前页信息
            //toolbar: [true, "top"],//表格的工具栏。数组中有两个值，第一个为是否启用，第二个指定工具栏位置（相对于body layer），如：[true,”both”] 。工具栏位置可选值：“top”,”bottom”, “both”. 如果工具栏在上面，则工具栏id为“t_”+表格id；如果在下面则为 “tb_”+表格id；如果只有一个工具栏则为 “t_”+表格id
            toppager: false,//分页栏是否放在顶部
            //				footerrow:true,//是否在表格列最后添加一行，可以使用footerData("set",{})设置行数据
            altRows: true, //条纹
            altclass: "ui-priority-secondary",
            shrinkToFit: true,//此属性用来说明当初始化列宽度时候的计算类型，如果为ture，则按比例初始化列宽度。如果为false，则列宽度使用colModel指定的宽度
            forceFit: false,//调整列宽度不会改变表格的宽度,设为true时，分组调整列宽有问题
            hiddengrid: false,//当为ture时，表格不会被显示，只显示表格的标题。只有当点击显示表格的那个按钮时才会去初始化表格数据。
            hidegrid: true,//启用或者禁用控制表格显示、隐藏的按钮，只有当caption 属性不为空时起效
            //				gridstate:"visible",//定义当前表格的状态：'visible' or 'hidden'
            //				multikey: "ctrlKey",
            //		        prmNames:{page:"page",rows:"rows", sort:"sidx", order:"sord", search:"_search", nd:"nd", id:"id", oper:"oper", editoper:"edit", addoper:"add", deloper:"del", subgridid:"id", npage:null, totalrows:"totalrows"},
            cellEdit: false,
            cellsubmit: 'remote',
            cellurl: "",
            //				ajaxGridOptions:
            //				ajaxSelectOptions:
            autoencode: true,//防止代码注入
            gridview: false,//设为true后可以获得更快的表格加载速度，但是不能使用treeGrid, subGrid, or the afterInsertRow event.
            //				data:[],
            //				datastr
            //				subGrid:,
            //				subGridModel:,
            //				subGridType:,
            //				subGridUrl:,
            //				subGridWidth:20
            //树表配置
            // treeGrid: this.jqgridSetting.treeGrid,
            // treeGridModel:"adjacency",
            // ExpandColClick:this.jqgridSetting.expandColClick,
            // ExpandColumn:this.jqgridSetting.expandColumn,
            // treeIcons:{ 
            // 	plus: attrs.treeIconPlus, // 折合状体 
            // 	minus: attrs.treeIconMinus, // 展开状态 
            // 	leaf: attrs.treeIconLeaf // 叶子 
            // 	},
            // treeReader:{
            // 	   level_field: "level",
            // 	   parent_id_field: "pid",
            // 	   leaf_field: "isLeaf",
            // 	   expanded_field: "open"
            // 	},


            multiselect: this.jqgridSetting.multiselect,//是否能够多选
            multiboxonly: true,//需要点击checkbox才能多选
            pager: "#" + this.jqgridSetting.gridId + "pager",

            onSelectRow: (rowid, status, e) => {
                if (this.callback && this.callback.onSelectRow) {
                    this.callback.onSelectRow(rowid, status, e);
                }

                // scope.onSelectRow({rowid: rowid, status: status, e:e});
            },
            gridComplete: () => {
                this.onResize();
                if (this.callback && this.callback.gridComplete) {
                    this.callback.gridComplete()
                }
            },
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize(e?: any) {
        this._gridContainerWidth = this.gridContainEle.nativeElement.offsetWidth
        this.recomputeWidth(this._gridContainerWidth, this.jqgridSetting.shrinkToFit)
    }

    onAction(action: JqgridAction) {
        if (action.key == "refresh") {
            this.refresh();
            return;
        }
        let rowId = this.getSingleSelectRowId();
        let rowData = this.getSingleSelectData();
        let rowDatas = this.getSelectDatas();
        let event: JqgridEvent = new JqgridEvent(this.jqgridSetting.gridId, action, rowId, rowData, rowDatas)
        this.jqgridevent.emit(event);
    }

    /**
     * 刷新列表
     * param:表格查询传递的参数对象{xx:xx,xxx:xxx}
     */
    refresh(param?) {
        // this.postParams = param;
        if (param != undefined) {
            var pd = this.jqgridObject.jqGrid("getGridParam", "postData");
            for (var p in pd) {
                delete pd[p];
            }
            this.jqgridObject.jqGrid("setGridParam", { postData: param });
            this.jqgridObject.jqGrid("setGridParam", { page: 1 }).trigger("reloadGrid");
        } else {
            this.jqgridObject.jqGrid().trigger("reloadGrid");
        }
    }
    addParams = function (params, fresh) {
        var pd = this.jqgridObject.jqGrid("getGridParam", "postData");
        Array.forEach(params, function (value, key) {
            pd[key] = value;
        });
        if (fresh == undefined) fresh = true;
        if (fresh) this.jqgridObject.jqGrid("setGridParam", { page: 1 }).trigger("reloadGrid");
    }
    removeParam = function (paramName, fresh) {
        var pd = this.jqgridObject.jqGrid("getGridParam", "postData");
        for (var p in pd) {
            if (p == paramName) delete pd[p];;
        }
        if (fresh == undefined) fresh = true;
        if (fresh) this.jqgridObject.jqGrid("setGridParam", { page: 1 }).trigger("reloadGrid");
    }
    setParams = function (params, fresh) {
        if (params != undefined) {
            var pd = this.jqgridObject.jqGrid("getGridParam", "postData");
            for (var p in pd) {
                delete pd[p];;
            }
            this.jqgridObject.jqGrid("setGridParam", { postData: params });
        }
        if (fresh == undefined) fresh = true;
        if (fresh) this.jqgridObject.jqGrid("setGridParam", { page: 1 }).trigger("reloadGrid");
    }

    getDataIDs = function () {
        return this.jqgridObject.jqGrid("getDataIDs");
    }
    //获取指定列的数据 rowId:主列的值;如果rowId为空，则返回表格全部数据。
    getRowData = function (rowId) {
        return this.jqgridObject.jqGrid("getRowData", rowId);
    }
    //获取表格信息。param:"rowNum"-每页记录条数 "page"-当前第几页 “records”-总共有多少条
    getGridParam = function (param) {
        return this.jqgridObject.jqGrid("getGridParam", param);
    }
    //获取单个选中的行的主列值，如果选中多个这返回最后选中的值
    getSingleSelectRowId(): string {
        return this.jqgridObject.jqGrid("getGridParam", "selrow");
    }
    //获取所有选中的行的主列值，返回数组
    getSelectRowIds(): string[] {
        return this.jqgridObject.jqGrid("getGridParam", "selarrrow");
    }
    //返回单个选中的行数据
    getSingleSelectData = function () {
        let rowId = this.jqgridObject.jqGrid("getGridParam", "selrow");
        let rowData = this.jqgridObject.jqGrid("getRowData", rowId);
        //如果没有选择行 这里会返回空数组 处理下
        if (rowData.length == 0) {
            rowData = undefined
        }
        return rowData
    }
    //返回所有选中行数据的数组
    getSelectDatas(): Array<any> {
        var rowIds = this.jqgridObject.jqGrid("getGridParam", "selarrrow");
        var selectDatas = new Array();
        _.forEach(rowIds, (value, key) => {
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
    /**
    	     * 手动设置当前表格的主数据，当前表格必须是从表该API才有效
    	     */
    // setPrimaryData(pkValue) {
    //     if (_.isDefined($scope.bindData.$fkMap)) {
    //         //必须要是从表才有效
    //         var fk = $scope.bindData.$fkMap.fk;//从表外键的key
    //         //就算外键值还没有获取到，也要设置表格的参数，最好是一个无法查询出任何结果的值
    //         //不然表格中可能会短暂的显示不应该看到的数据
    //         var parentParamString = "{\"" + fk + "\":\"" + pkValue + "\"}";
    //         this.setForeignKey(angular.fromJson(parentParamString));
    //     }
    // }
    // removePrimaryData() {
    //     this.setPrimaryData("___");
    // }
    /**
     * 设置表格外键，{fkKey:fkValue}，内部接口，不推荐用户自己调用
     */
    setForeignKey = function (fk) {
        this.fk = fk;
        this.addParams(fk);
    }

    recomputeWidth(width, shrink) {
        this.jqgridObject.jqGrid('setGridWidth', width, shrink);
    }
    recomputeHeight(height) {
        this.jqgridObject.jqGrid('setGridHeight', height);
    }
    //设置第几页和每页显示行数
    setPageAndRowNum(page, rows) {
        this.jqgridObject.jqGrid("setGridParam", { page: page, rowNum: rows }).trigger("reloadGrid");
        this.initDataOprations();
    }
    // getDataIDs = function () {
    //     return this.jqgridObject.jqGrid("getDataIDs");
    // }
    // //获取指定列的数据 rowId:主列的值;如果rowId为空，则返回表格全部数据。
    // getRowData = function (rowId) {
    //     return this.jqgridObject.jqGrid("getRowData", rowId);
    // }
    // //获取表格信息。param:"rowNum"-每页记录条数 ",page"-当前第几页,"records"-总共有多少条,"postData"-请求参数...
    // getGridParam = function (param) {
    //     return this.jqgridObject.jqGrid("getGridParam", param);
    // }
    // //获取单个选中的行的主列值，如果选中多个这返回最后选中的值
    // getSingleSelectRowId = function () {
    //     return this.jqgridObject.jqGrid("getGridParam", "selrow");
    // }
    // //获取所有选中的行的主列值，返回数组
    // getSelectRowIds = function () {
    //     return this.jqgridObject.jqGrid("getGridParam", "selarrrow");
    // }
    // //返回单个选中的行数据
    // getSingleSelectData = function () {
    //     var rowId = this.jqgridObject.jqGrid("getGridParam", "selrow");
    //     return this.jqgridObject.jqGrid("getRowData", rowId);
    // }
    // //返回所有选中行数据的数组
    // getSelectDatas = function () {
    //     var rowIds = this.jqgridObject.jqGrid("getGridParam", "selarrrow");
    //     var selectDatas = new Array();
    //     angular.forEach(rowIds, function (value, key) {
    //         var rowData = this.jqgridObject.jqGrid("getRowData", value);
    //         selectDatas.push(rowData);
    //     });
    //     return selectDatas;
    // }
    //启用和禁用排序
    setSortRow(sortable, onDrop?, dragHandle?) {
        if (sortable) {
            //如果没定义事件，则使用表格配置的事件
            let tableDndOptions: {
                onDrop?: any
                onDragClass: any
                dragHandle: any
            } = { onDragClass: "drag-tr", dragHandle: dragHandle };
            if (typeof onDrop == "function") {
                tableDndOptions.onDrop = onDrop;
            }
            // else if (onDrop == "angularFun" && $attrs.onDrop) {
            //     tableDndOptions.onDrop = function (table, row) {
            //         eval("$scope.$parent." + $attrs.onDrop);
            //     }
            // }
            this.eleJqGrid.tableDnD(tableDndOptions);
        } else {
            jQuery(".jqgrow").css("cursor", "default");
            jQuery(document).unbind('mousemove');
            jQuery(document).unbind('mouseup');
        }
    }
    editRow(rowid, editparameters) {
        editparameters = editparameters || {};
        this.jqgridObject.jqGrid("editRow", rowid, editparameters);
    }
    saveRow(rowid, saveparameters) {
        this.jqgridObject.jqGrid("saveRow", rowid, saveparameters);
    }
    restoreRow(rowid, restoreparameters) {
        this.jqgridObject.jqGrid("restoreRow", rowid, restoreparameters);
    }
    addRow(parameters) {
        this.jqgridObject.jqGrid("addRow", parameters);
    }
    setSelection(rowid, onselectrowFlag) {
        this.jqgridObject.jqGrid("setSelection", rowid, onselectrowFlag);
    }
    addRowData(rowid, data, position, srcrowid) {
        return this.jqgridObject.jqGrid("addRowData", rowid, data, position, srcrowid);
    }
    delRowData(rowid) {
        var isSuccess = this.jqgridObject.jqGrid("delRowData", rowid);
        if (isSuccess) {//同步操作数据
            _.forEach(this.dataOprations.add, function (v, i) {
                if (v._tableAddRowId == rowid)
                    this.dataOprations.add.splice(i, 1);
            });
            _.forEach(this.dataOprations.update, function (v, i) {
                if (v[this.jqgridSetting.primaryKey] == rowid) this.dataOprations.update.splice(i, 1);
            });
            if (rowid.indexOf(this.tableNewRowIdPre) != 0) {
                var o = new Object();
                o[this.jqgridSetting.primaryKey] = rowid;
                this.dataOprations["delete"].push(o);
            }
        }
        return isSuccess;
    }
    //表格操作数据
    initDataOprations() {
        this.dataOprations = { update: [], add: [], "delete": [] };
    }
    getDataOprations() {
        return this.dataOprations;
    }
    //获取表格工具栏中的按钮
    getTableNavButtons = function () {
        return this.tableNavButtons;
    }
    getTableTopButtons = function () {
        return this.tableTopButtons;
    }
    getTableButtonActions = function () {
        return this.tableButtonActions;
    }
    tableNewRowIdNum: number
    tableNewRowIdPre: number
    getTableNewRowId() {
        var newId = this.tableNewRowIdPre + this.tableNewRowIdNum;
        this.tableNewRowIdNum++;
        return newId;
    }
    clearGridData(clearfooter) {
        this.jqgridObject.jqGrid('clearGridData', clearfooter);
    }
    getCell(rowid, iCol) {
        return this.jqgridObject.jqGrid('getCell', rowid, iCol);
    }
    getCol(colname, returntype, mathoperation) {
        return this.jqgridObject.jqGrid('getCol', colname, returntype, mathoperation);
    }
    getInd(rowid, rowcontent) {
        return this.jqgridObject.jqGrid("getInd", rowid, rowcontent);
    }
    hideCol(colname) {
        this.jqgridObject.jqGrid("hideCol", colname);
    }
    showCol(colname) {
        this.jqgridObject.jqGrid("showCol", colname);
    }
    setLabel(colname, data, className, properties) {
        this.jqgridObject.jqGrid("setLabel", colname, data, className, properties)
    }
    remapColumns(permutation, updateCells, keepHeader) {
        this.jqgridObject.jqGrid("remapColumns", permutation, updateCells, keepHeader);
    }
    resetSelection() {
        this.jqgridObject.jqGrid("resetSelection");
    }
    setCell(rowid, colname, data, className, properties, forceup) {
        this.jqgridObject.jqGrid("setCell", rowid, colname, data, className, properties, forceup);
    }
    setRowData(rowid, data, cssprop) {
        this.jqgridObject.jqGrid("setRowData", rowid, data, cssprop);
    }
}