import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'echarts',
    template: `
    <div [id]="chartId" style="height:320px;"></div>
    `
})
export class EchartsComponent implements OnInit {

    _echarts: any

    myChart: any

    @Input() chartId: string = "chartId"
    @Input() options: any

    constructor() { }

    ngOnInit() {
        (require as any).ensure([], (require) => {
            // this.myChart.showLoading();
            // 引入 ECharts 主模块
            this._echarts = require('echarts/lib/echarts');
            // 引入柱状图
            require('echarts/lib/chart/bar');
            // 引入提示框和标题组件
            require('echarts/lib/component/tooltip');
            require('echarts/lib/component/title');
            //饼图
            require('echarts/lib/chart/pie');
            this.myChart = this._echarts.init(document.getElementById(this.chartId));
            // this.myChart.hideLoading();
            this.myChart.setOption(this.options)
        }, 'echarts');
    }

}