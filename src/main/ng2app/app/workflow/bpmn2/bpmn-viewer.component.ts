import { Component, Input, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin'

import { FormConfigComponent } from '../config/form-config.component'
import { ActivityConfigComponent } from '../config/activity-config.component'

import { ModalAction } from '../../shared/object/modal-action'
import { ModalService } from '../../service/modal.service'

@Component({
    selector: 'bpmn-viewer',
    styles: ['.highlight:not(.djs-connection) .djs-visual > :nth-child(1) {fill: green !important; /* color elements as green */}'],
    template: `
        <style>
            .highlight{
              fill: green !important; /* color elements as green */
            }
        </style>    
        <div class="modeler" style="height:480px">
          <div id="js-canvas-view" style="height:100%"></div>
          <div id="js-properties-panel"></div>
        </div>
    `
})
export class BpmnViewerComponent implements OnInit {

    @Input() $model: {
        params?: {
            key?: string,
            name?: string,
            description?: string
            type?: string
            processDefId?: string
            moduleId?: string
            processInsId?: string
        }
        model?: any
    } = {
        params: {}
    }

    _bpmnModeler: any
    _curElement: any    //config 当前选中的节点
    _overlays: any
    _dataUrl: string

    _modalContext: {
        vcRef: ViewContainerRef,
        componentFactoryResolver: ComponentFactoryResolver
    }

    constructor(private http: Http, private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver,
        private modalService: ModalService) {
        this._modalContext = {
            vcRef: vcRef,
            componentFactoryResolver: componentFactoryResolver
        }
    }

    ngOnInit() {
        if (this.$model.params.processDefId != undefined
            && this.$model.params.processInsId != undefined) {
            this._dataUrl = "/workflow/monitor/wfmonitor?processInstanceId=" + this.$model.params.processInsId;
            (require as any).ensure([], require => {
                let BpmnModeler = require('bpmn-js/lib/Modeler')
                let BpmnViewer = require('bpmn-js/lib/Viewer')
                let propertiesPanelModule = require('bpmn-js-properties-panel')
                let propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/camunda')
                this.initBpmn(BpmnModeler, BpmnViewer, propertiesPanelModule, propertiesProviderModule)
            });
            // this.initBpmn()
        }
    }

    initBpmn(BpmnModeler, BpmnViewer, propertiesPanelModule, propertiesProviderModule) {
        if ((this.$model.params.processDefId == undefined && this.$model.params.processInsId == undefined)) {
            toastr.warning('没有流程信息')
            return
        }
        // var windowl: any = window
        // var propertiesPanelModule = windowl.PropertiesPanelModule;
        // var propertiesProviderModule = windowl.PropertiesProviderModule;
        var camundaModdleDescriptor = require("./camunda")
        // var BpmnModeler = windowl.BpmnJS;
        // var BpmnViewer = windowl.BpmnViewer;
        var canvas = $('#js-canvas-view');
        if (this.$model.params.type == "view") {
            if (this._bpmnModeler == undefined) {
                // create modeler
                this._bpmnModeler = new BpmnViewer({
                    container: canvas,
                    // additionalModules: [{
                    //     __init__: [
                    //         'colorRenderer'
                    //     ],
                    //     colorRenderer: ['type', require('./bpmn-marker')],
                    // }]
                });
            }

            // let eventBus = this._bpmnModeler.get('eventBus')
            // this._bpmnModeler.on('canvas.init', 1000, function () {
            //     debugger
            //     $('path').each(function (e) {
            //         var path = $(this);
            //         var style = path.attr('style');
            //         if (style) {
            //             path.attr('style', style.replace(/url\("#/g, 'url("' + location.href + '#'));
            //         }
            //     });
            // });
            let forkTask = [
                this.getHighLights(this.$model.params.processInsId),
                this.getProcessDefDiagram(this.$model.params.processDefId)
            ]
            Observable.forkJoin(forkTask).subscribe(
                data => {
                    // var defs = document.getElementsByTagName('defs')[0];
                    // let makerHtml = $.parseHTML('<marker viewBox="0 0 20 20" markerWidth="10" markerHeight="10" orient="auto" refX="11" refY="10" id="markerSiuwuemg141"><path d="M 1 5 L 11 10 L 1 15 Z" fill="#000000" style="stroke-width: 1; stroke-linecap: round; stroke-dasharray: 10000, 1;"></path></marker>')
                    // defs.appendChild(makerHtml[0]);
                    let highlights = data[0]
                    let xml = data[1]
                    setTimeout(() => {
                        this._bpmnModeler.importXML(xml, (err) => {
                            if (err) {
                                return console.error('could not import BPMN 2.0 diagram', err);
                            }

                            var canvas = this._bpmnModeler.get('canvas')
                            let svg = canvas._svg
                            // 绿色三角的箭头
                            this.addGreenEndMarker(svg)

                            // $('path').each(function (e) {
                            //     var path = $(this);
                            //     var style = path.attr('style');
                            //     if (style) {
                            //         // debugger
                            //         if (path) {
                            //             path.attr('style', style.replace(/url\("#/g, 'url("' + location.href + '#'));
                            //         }
                            //         // path.attr('style', style.replace(/url\("#/g, 'url("' + 'workflow/usertaskdo' + '#'));
                            //         // path.attr('style', style.replace(/url\("#\w*/g, 'url("' + location.href + '#greenendmark'));
                            //     }
                            // });

                            let activitiesExecuted = highlights.activitiesExecuted;
                            let activities = highlights.activities;
                            let flows: string[] = highlights.flows;
                            let r = $("g.djs-connection").each(function (e) {
                                var g = $(this)
                                var path = g.find('path')
                                var style = path.attr('style')
                                var flow_id = g.attr('data-element-id')
                                if (flows.includes(flow_id)) {
                                    path.attr('style', style.replace(/url\("#\w*/g, 'url("' + location.href + '#greenendmark'))
                                } else {
                                    path.attr('style', style.replace(/url\("#/g, 'url("' + location.href + '#'));
                                }
                            })
                            _.each(activitiesExecuted, (v, i) => {
                                canvas.addMarker(v, 'highlightgreen');
                            })
                            _.each(activities, (v, i) => {
                                canvas.addMarker(v, 'highlightred');
                            })
                            _.each(flows, (v, i) => {
                                canvas.addMarker(v, 'highlightflowgreen');
                            })
                            // zoom to fit full viewport
                            canvas.zoom('fit-viewport');
                        });
                    }, 800)
                }
            )
        }
    }

    makeSVG(tag, attrs) {
        var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (var k in attrs)
            el.setAttribute(k, attrs[k]);
        return el;
    }
    /**
     * 绿色的箭头，可以在path的style中用url链过来
     * @param svg 
     */
    addGreenEndMarker(svg) {
        function createMarker(id, options) {
            var attrs = _.assign({
                fill: '#00ff00',
                strokeWidth: 1,
                strokeLinecap: 'round',
                strokeDasharray: 'none'
            }, options.attrs);

            var ref = options.ref || { x: 0, y: 0 };

            var scale = options.scale || 1;

            // fix for safari / chrome / firefox bug not correctly
            // resetting stroke dash array
            if (attrs.strokeDasharray === 'none') {
                attrs.strokeDasharray = [10000, 1];
            }

            var marker = options.element
                .attr(attrs)
                .marker(0, 0, 20, 20, ref.x, ref.y)
                .attr({
                    markerWidth: 20 * scale,
                    markerHeight: 20 * scale,
                    id: "greenendmark"
                });

            // return addMarker(id, marker);
        }


        createMarker('sequenceflow-end', {
            element: svg.path('M 1 5 L 11 10 L 1 15 Z'),
            ref: { x: 11, y: 10 },
            scale: 0.5
        });
    }

    private getHighLights(processInstanceId) {
        let url = "workflow/service/process-instance/" + processInstanceId + "/highlights"
        let urlSearchParams = new URLSearchParams();
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });
        return this.http.get(url, options)
            .toPromise()
            .then((data) => {
                return data.json()
            })
    }

    private getProcessDefDiagram(processDefinitionId: string): Promise<any> {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.set('processDefinitionId', processDefinitionId);

        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });
        // private _getprocessdefdiagramUrl = "/process-definition/{processDefinitionId}/diagram-layout"
        return this.http.get('workflow/service/process-definition/' + processDefinitionId + '/diagram-layout', options)
            .toPromise()
            .then((data) => {
                return data.text()
            })
    }

    private getBpmnModelerOrViewer() {

    }


    onModalAction(action: ModalAction) {
        if (action.key == "close") {
            // return new Promise((resolve, reject) => {
            //     resolve("true");
            // });
        } else if (action.key == "dismiss") {

        }
    }

    CamundaArray = {
        activiti: ["activiti:collection", "activiti:candidateUsers", "activiti:elementVariable"],
        camunda: ["camunda:collection", "camunda:candidateUsers", "camunda:elementVariable"]
    }


    activitiToCamundaAdapt(activitiXml: string): string {
        this.CamundaArray.activiti.forEach((str, index) => {
            var reg = "/" + str + "/ig";
            activitiXml = activitiXml.replace(eval(reg), this.CamundaArray.camunda[index]);
        })
        return activitiXml
    }

    camundaToActivitiAdapt(camundaXml: string): string {
        this.CamundaArray.camunda.forEach((str, index) => {
            var reg = "/" + str + "/ig";
            camundaXml = camundaXml.replace(eval(reg), this.CamundaArray.activiti[index]);
        })
        return camundaXml
    }
}