import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FileUploadField } from './file-upload.field'

@Component({
    selector: 'f-file-upload',
    styleUrls: ['file-upload.component.css'],
    template: `
    <div [ngSwitch]="simple">
        <div *ngSwitchCase="false" id="testid" [ngSwitch]="field.isObject" [formGroup]="form" [ngClass]="ngclasses()" style="height: 34px;">
        	<label [attr.for]="field.key" class="control-label" style="float: left;width:75px">{{field.label}}</label>
        	<div *ngSwitchCase="true"  class="" style="margin-left:85px">
        		<input [formControlName]="field.key" [id]="field.key" [(ngModel)]="model[key1][key2]" [id]="field.key"
        			[type]="field.type" class="form-control" data-toggle="tooltip" [title]="isValid?'':_tipmsg">
        	</div>
        	<div *ngSwitchCase="false" class="" style="margin-left:85px" [id]="getWrapperId()">

<span id="content">
<iframe name="upload_iframe_noticefileupload_1481453208243_1200083869" id="upload_iframe_noticefileupload_1481453208243_1200083869" style="display:none"></iframe>
<form [formGroup]="form" #uploadfileform action="iframefile/noticedir/upload" id="upload_form_noticefileupload_1481453208243_1200083869" 
    name="upload_form_noticefileupload_1481453208243_1200083869" enctype="multipart/form-data" method="post" target="upload_iframe_noticefileupload_1481453208243_1200083869">
    <label class="ace-file-input">
        <input name="file_noticefileupload_1481453208243_1200083869+" id="file_noticefileupload_1481453208243_1200083869+" type="file" 
            [id]="key" [formControlName]="field.key" [id]="field.key" [(ngModel)]="model[field.key]" [id]="field.key" class="form-control">
        <span class="ace-file-container" data-title="浏览...">
        <span class="ace-file-name" data-title="未选中文件 ..."><i class=" ace-icon fa fa-upload"></i></span></span>
    </label>
    <input type="hidden" name="controlId" [value]="this.key">
    <input type="hidden" name="instanceId" [value]="instanceId">
    <input type="hidden" id="maxSize" name="maxSize" value="10485760">
</form></span>      
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

    instanceId: string

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
        this.instanceId = this.key + new Date().getTime()
    }
    ngAfterViewInit() {
        let fileinput = $("#" + this.key)
        fileinput.change(e => {
            debugger
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
        window[this.instanceId + "_successCallback"] = this.successCallback.bind(this)
        window[this.instanceId + "_errorCallback"] = this.errorCallback.bind(this)
        // debugger
    }

    uploading: boolean = false;
    @Input() successEvent
    @Input() errorEvent
    @Input() onSuccess: Function
    @Input() onError: Function

    successCallback(data) {

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
        // debugger
        this.uploading = false;

        $("#testid").find(".message-loading-overlay").remove();

        if (this.errorEvent) {
            this.errorEvent(data.data);
        }

        if (this.onError) {
            this.onError(data);
        }
    }

    upload(scEvent?, erEvent?) {
        // debugger
        if (this.uploading) {
            toastr.warning('正在上传,请耐心等待!')
            return;
        }

        //提交前验证
        // if ($("#testid").val() == undefined || $("#testid").val() == "") {
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

        $("#testid").append("<div  style=\"filter: alpha(opacity=50); opacity: 0.5; background-color: #000;\" class=\"message-loading-overlay\"><i class=\"fa-spin ace-icon fa fa-spinner orange2 bigger-160\"></i></div>");

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