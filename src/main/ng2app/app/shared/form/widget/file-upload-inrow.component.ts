import { Component, OnInit, Input, ViewContainerRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http'

import { FileUploadField } from './file-upload.field'
import { UIComponent } from '../../../commonshared/decorators/ui-component.decorator'

@UIComponent({
    selector: 'f-file-upload-inrow',
    component: FileUploadInrowComponent
})
@Component({
    selector: 'f-file-upload-inrow',
    styleUrls: ['file-upload.component.css'],
    template: `
    <div [ngSwitch]="simple">
        <div *ngSwitchCase="false" [id]="_instanceId" [formGroup]="form" [ngClass]="ngclasses()" style="height: 34px;">
        	<label [attr.for]="field.key" class="control-label" style="float: left;width:75px">{{field.label}}</label>
        	<div class="" style="margin-left:85px" [id]="getWrapperId()">
                <span [id]="_contentId" style="display:none">
                    <form [formGroup]="form" #uploadfileform [action]="_url" [id]="_formId" [name]="_formId" acceptcharset="UTF-8" 
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
                <a *ngIf="field.params.writePermission" style="cursor: pointer;" class="" (click)="addfile($event)">添加附件</a> 
                <div *ngFor="let a of _filelist" class="ng-scope">
				    <a style="color: black" (click)="viewfile(a)" class="ng-binding">{{a.displayName}}</a>
				    <a class="att_del ng-scope" *ngIf="can_download(file)" (click)="download(a.filePath)">下载</a>
				    <a class="att_del ng-scope" *ngIf="can_del(file)" (click)="deletefile(a)">删除</a>
			    </div>
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
export class FileUploadInrowComponent implements OnInit {

    @Input() simple: boolean = true
    @Input() key: string = ''
    @Input() label: string = ''
    @Input() span: number = 4
    @Input() offset: number = 0
    @Input() hidden: boolean = false
    @Input() disabled: boolean = false
    @Input() autosubmit: boolean = true
    @Input() params: {
        businessType: string
        businessKey: string
        businessKey1: string
        businessKey2: string
        businessKey3: string
        writePermission?: string
        myDir?: string
    }

    @Input() field: FileUploadField;
    @Input() form: FormGroup;
    @Input() model: any;

    @Input() process: string = "qybdirprocess"

    uploading: boolean = false;
    @Input() successEvent
    @Input() errorEvent
    @Input() onSuccess: Function
    @Input() onError: Function


    _url: string
    _instanceId: string
    _iframeId: string
    _formId: string
    _fileinputId: string
    _contentId: string
    _overlayId: string

    _filelist: Object[]

    @ViewChild('uploadfileform', { read: ViewContainerRef }) fromref: ViewContainerRef;

    key1: string
    key2: string

    constructor(private http: Http, private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        if (!this.simple) {
            this.params = this.field.params

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

        this.getFiles()

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
            // let value = this.getInputEventTargetValue(e)
            // let filename = this.getFileNameFromPath(value)
            // this.setDisplayFileName(filename)
            if (this.autosubmit) {
                this.upload()
            }
        })
        // fileinput.on('change', function () {
        //     alert('Works!!');
        // });
        // var iframe = document.getElementById('iframe1').contentWindow;
        window[this._instanceId + "_successCallback"] = this.successCallback.bind(this)
        window[this._instanceId + "_errorCallback"] = this.errorCallback.bind(this);

        (require as any).ensure([], (require) => {
            // debugger
            require('../../../../js/ace.min.js')
            let opts = { allowExt: ['dox'] }
            $("#" + this._fileinputId).ace_file_input(opts).on('file.error.ace', function () {
                toastr.warning('不支持上传该类型的文件，只支持:')
            });
        }, 'ace.min.js');


        let iframe = document.createElement('iframe');
        iframe.setAttribute("style", "display:none")
        iframe.name = this._iframeId
        iframe.id = this._iframeId
        document.getElementById(this._contentId).appendChild(iframe);

    }

    getFiles() {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.set('businessType', this.params.businessType);
        urlSearchParams.set('businessKey', this.params.businessKey);
        urlSearchParams.set('businessKey1', this.params.businessKey1);
        urlSearchParams.set('businessKey2', this.params.businessKey2);
        urlSearchParams.set('businessKey3', this.params.businessKey3);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });
        this.http.get('s/getuploadfiles', options)
            .subscribe((data) => {
                this._filelist = data.json()
                this.changeDetectorRef.detectChanges()
            })
    }

    can_download(file) {
        return true
    }

    can_del(file) {
        return this.params.writePermission
    }

    viewfile(file) {

    }

    download(filepath) {
        let newa = this.handlePath(filepath)
        let urlSearchParams = new URLSearchParams();
        for (var p in this.params) {
            urlSearchParams.set(p, this.params[p])
        }

        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });
        this.http.get('iframefile/qybdirprocess/exist/' + newa, options)
            .toPromise()
            .then((data) => {
                if (data.ok) {
                    var downloadpath = "iframefile/qybdirprocess/download/" + newa + "?myDir=" + this.params.myDir;
                    let downloadIframe: any = document.getElementById("downloadIframe");
                    if (!downloadIframe) {
                        downloadIframe = document.createElement("iframe");
                        downloadIframe.id = "downloadIframe";
                        downloadIframe.name = "downloadIframe";
                        downloadIframe.style.display = "none";
                        document.body.appendChild(downloadIframe);
                    }
                    downloadIframe.src = downloadpath
                }
            })
    }

    deletefile(file) {
        var newa = this.handlePath(file.filePath)
        let urlSearchParams = new URLSearchParams();
        for (var p in this.params) {
            urlSearchParams.set(p, this.params[p])
        }
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });
        this.http.delete('iframefile/qybdirprocess/' + newa, options)
            .toPromise()
            .then((data) => {
                if (data.ok) {
                    // $model.uploadfiles.$reload().then(function (data1) {
                    //     if ($params.onDelete) {
                    //         $params.onDelete(data, $model.uploadfiles.result)
                    //     }
                    //     // $scope.$emit("fstatus", { params: $params, num: $model.uploadfiles.result.length, data: data, files: $model.uploadfiles.result })
                    // })
                    this.getFiles()
                    toastr.success('删除成功')
                } else {
                    toastr.warning('删除失败了')
                }
            })
    }

    handlePath(path) {
        var paths = path.split("/")
        if (paths.length == 1) { //并没有分成功试试反斜杠
            paths = path.split("\\")
        }
        var name = paths[paths.length - 1]
        var newname = encodeURIComponent(name)
        var pathspre = paths.slice(0, paths.length - 1)
        var pathstrpre = pathspre.join("/")
        var newa = pathstrpre + "/" + newname
        return newa
    }

    successCallback(data) {
        $("#" + this._overlayId).css("display", "none")
        toastr.success('上传成功')
        this.uploading = false
        this.getFiles()
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
        toastr.warning(data.data.errorMsg)
        if (this.errorEvent) {
            this.errorEvent(data.data);
        }
        if (this.onError) {
            this.onError(data);
        }
    }

    addfile(e) {
        var div = $("#" + this._formId + " input[type='file']")
        div.click()
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
        // debugger
        //准备动态参数
        if (this.params instanceof Object) {
            for (let name in this.params) {
                if (this.params.hasOwnProperty(name)) {
                    // let form = this.fromref.element.nativeElement
                    let form = $("#" + this._formId)
                    let input = form.find("#" + name)
                    if (input.length > 0) {
                        input.val(this.params[name]);
                    } else {
                        form.append("<input type=\"hidden\" id=\"" + name + "\" name=\"" + name
                            + "\" value=\"" + this.params[name] + "\">");
                    }
                }
            }
        }

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
        // debugger
        // $("#" + this._formId).submit()
        // this.fromref.element.nativeElement.submit()
        // let formele = this.fromref.element.nativeElement;
        let formele: any = $("#" + this._formId)
        let formData = new FormData(formele[0])
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("progress", this.updateProgress, false);

        xhr.onload = (e) => {
            // debugger
            // var arraybuffer = xhr.response; // not responseText
            this.successCallback(e)
        }

        xhr.open('POST', this._url, true);
        xhr.send(formData)
        // 
    }

    updateProgress(evt) {
        // debugger
        if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
        } else {
            // Unable to compute progress information since the total size is unknown
        }
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