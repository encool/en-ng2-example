import { Component, OnInit, Input, Output, EventEmitter, ElementRef, Renderer, ViewChild, HostListener} from '@angular/core';

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

    jqgridObject: any
    @Input() postParams: any = {}
    @Input() colModel: ColModel[]
    @Input() jqgridSetting: JqgridSetting
    @Input() callback: JqgridCallback

    @Output() jqgridevent = new EventEmitter();

    @ViewChild('gridContain') gridContainEle: ElementRef;
    _gridContainerWidth: number

    constructor(public renderer: Renderer) {

    }

    ngOnInit() {
        // this.gridContainEle.changes.subscribe(changes => console.log(changes));
    }

    ngAfterViewInit() {
        this.initJqgrid()      
        this._gridContainerWidth = this.gridContainEle.nativeElement.offsetWidth
        this.recomputeWidth(this._gridContainerWidth, this.jqgridSetting.shrinkToFit)
    }

    initJqgrid() {
        // dts文件不正确 为了ts编译不报错处理
        let jqs: any = $;
        let eleJqGrid: any = $("#"+this.jqgridSetting.gridId)

        jqs.jgrid.defaults.styleUI = 'Bootstrap';
        this.jqgridObject = eleJqGrid.jqGrid({
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
            pager: "#"+this.jqgridSetting.gridId+"pager",

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
    onResize(e?:any) {
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
        this.postParams = param;
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
        var rowId = this.jqgridObject.jqGrid("getGridParam", "selrow");
        return this.jqgridObject.jqGrid("getRowData", rowId);
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

    recomputeWidth(width, shrink) {
        this.jqgridObject.jqGrid('setGridWidth', width, shrink);
    }

    formatTitle(cellValue, options, rowObject) {
        return cellValue.substring(0, 50) + "...";
    }
    formatLink(cellValue, options, rowObject) {
        return "<a href='" + cellValue + "'>" + cellValue.substring(0, 25) + "..." + "</a>";
    }

}