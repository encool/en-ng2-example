import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FileUploadField } from './file-upload.field'
import { UIComponent } from '../../../decorators/ui-component.decorator'

@UIComponent({
    selector: 'f-file-upload',
    component: FileUploadComponent
})
@Component({
    selector: 'f-file-upload',
    styleUrls: ['file-upload.component.css'],
    template: `
    <div [ngSwitch]="simple">
        <div *ngSwitchCase="false" [id]="_instanceId" [formGroup]="form" [ngClass]="ngclasses()" style="height: 34px;">
        	<label [attr.for]="field.key" class="control-label" style="float: left;width:75px">{{field.label}}</label>
        	<div class="" style="margin-left:85px" [id]="getWrapperId()">
                <span [id]="_contentId">
                    <form [formGroup]="form" #uploadfileform [action]="_url" [id]="_formId" [name]="_formId" 
                        enctype="multipart/form-data" method="post" [target]="_iframeId">
                        <label class="ace-file-input">
                            <input [name]="_fileinputId" [id]="_fileinputId" type="file" 
                                [id]="key" [formControlName]="field.key" [id]="field.key" class="form-control">
                            <span class="ace-file-container" data-title="浏览...">
                                <span class="ace-file-name" data-title="未选中文件 ..."><i class=" ace-icon fa fa-upload"></i></span>
                            </span>
                            <div [id]="_overlayId" style="filter: alpha(opacity=50); opacity: 0.5; background-color: #000;height: 30px;display: none" class="message-loading-overlay">
                                <i class="fa-spin ace-icon fa fa-spinner orange2 bigger-160" style="font-size: 28px;"></i>
                            </div>
                        </label>
                        <input type="hidden" name="controlId" [value]="this.key">
                        <input type="hidden" name="instanceId" [value]="_instanceId">
                        <input type="hidden" id="maxSize" name="maxSize" value="10485760">
                    </form>
                </span>      
            </div>            
        </div> 
        <div *ngSwitchCase="true"  [style.display]="hidden ? 'none':'inline'" [ngClass]="ngclasses()">
        	<label [attr.for]="key" class="control-label" style="float: left;width:75px">{{label}}</label>
        	<div class="" style="margin-left:85px">
        		<input [id]="key" [(ngModel)]="model[key]" [id]="key" [disabled]="disabled"
        			type="text" class="form-control">
        	</div>         
        </div>         
    </div>           
    `
})
export class FileUploadComponent implements OnInit {

    @Input() simple: boolean = true
    @Input() key: string = ''
    @Input() label: string = ''
    @Input() span: number = 4
    @Input() offset: number = 0
    @Input() hidden: boolean = false
    @Input() disabled: boolean = false
    @Input() autosubmit: boolean = true

    @Input() field: FileUploadField;
    @Input() form: FormGroup;
    @Input() model: any;

    @Input() process: string = "qybdirprocess"

    _url: string
    _instanceId: string
    _iframeId: string
    _formId: string
    _fileinputId: string
    _contentId: string
    _overlayId: string

    @ViewChild('uploadfileform', { read: ViewContainerRef }) fromref: ViewContainerRef;

    key1: string
    key2: string

    constructor() { }

    ngOnInit() {
        if (!this.simple) {
            let key = this.field.key
            this.key = this.field.key
            if (this.field.isObject && key.indexOf(".") != -1) {
                let keys = key.split(".")
                this.key1 = keys[0]
                if (this.model[this.key1] == undefined) {
                    this.model[this.key1] = {}
                }
                this.key2 = keys[1]
            }
        }
        // debugger
        this._url = "iframefile/" + this.process + "/upload"
        this._instanceId = this.key + "_" + new Date().getTime()
        this._iframeId = "upload_iframe_" + this._instanceId
        this._formId = "upload_form_" + this._instanceId
        this._fileinputId = "file_" + this._instanceId
        this._contentId = "content_" + this._instanceId
        this._overlayId = "overlay_" + this._instanceId
    }
    ngAfterViewInit() {
        let fileinput = $("#" + this.key)
        fileinput.change(e => {
            // debugger
            let value = this.getInputEventTargetValue(e)
            let filename = this.getFileNameFromPath(value)
            this.setDisplayFileName(filename)
            if (this.autosubmit) {
                this.upload()
            }
        })
        // fileinput.on('change', function () {
        //     alert('Works!!');
        // });
        // var iframe = document.getElementById('iframe1').contentWindow;
        window[this._instanceId + "_successCallback"] = this.successCallback.bind(this)
        window[this._instanceId + "_errorCallback"] = this.errorCallback.bind(this)

        let iframe = document.createElement('iframe');
        iframe.setAttribute("style", "display:none")
        iframe.name = this._iframeId
        iframe.id = this._iframeId
        document.getElementById(this._contentId).appendChild(iframe);

    }

    uploading: boolean = false;
    @Input() successEvent
    @Input() errorEvent
    @Input() onSuccess: Function
    @Input() onError: Function

    successCallback(data) {
        $("#" + this._overlayId).css("display", "none")

        this.uploading = false

        // $("#formGroup-" + directiveId).find(".message-loading-overlay").remove();

        if (this.successEvent) {
            this.successEvent(data.data);
        }

        if (this.onSuccess) {
            this.onSuccess(data);
        }
    }

    errorCallback(data) {
        this.uploading = false;
        $("#" + this._overlayId).css("display", "none")
        if (this.errorEvent) {
            this.errorEvent(data.data);
        }

        if (this.onError) {
            this.onError(data);
        }
        toastr.warning(data.data.errorMsg)
    }

    upload(scEvent?, erEvent?) {
        // debugger
        if (this.uploading) {
            toastr.warning('正在上传,请耐心等待!')
            return;
        }

        //提交前验证
        // if ($("#" + _instanceId).val() == undefined || $("#" + _instanceId).val() == "") {
        //     // Messenger.post({ type: 'error', message: '附件不能为空！' });
        //     return;
        // }

        //js动态注册事件
        if (scEvent != undefined && $.isFunction(scEvent)) {
            this.successEvent = scEvent;
        }
        if (erEvent != undefined && $.isFunction(erEvent)) {
            this.errorEvent = erEvent;
        }

        this.uploading = true;
        // debugger
        $("#" + this._overlayId).css("display", "block");


        this.submitForm();

    }

    submitForm() {
        this.fromref.element.nativeElement.submit()
    }

    getInputEventTargetValue(event: Event) {

        let target = event.target
        let value = (target as any).value
        return value
    }

    getFileNameFromPath(path: string) {
        let arrays = path.split("\\")
        return arrays[arrays.length - 1]
    }

    setDisplayFileName(filename: string) {
        let filenamediv = $("div#" + this.getWrapperId() + " .ace-file-name")
        filenamediv.attr('data-title', filename)
        // filenamediv[data-title]
    }

    ngclasses() {
        let classExpression = {
            'form-group': true,
            // 'row': true
            // 'has-error':!this.isValid,
        }
        if (this.simple) {
            classExpression["col-sm-" + (this.span ? this.span : 4)] = true;
            classExpression["col-md-offset-" + this.offset] = this.offset == 0 ? false : true;
        } else {
            classExpression["col-sm-" + (this.field.span ? this.field.span : 4)] = true;
        }
        return classExpression
    }

    getWrapperId() {
        return this.key + "wrapper"
    }

    getInstanceId() {
        return this.key + new Date().getTime()
    }
}