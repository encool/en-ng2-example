import { Component, OnInit, Input, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

import {  
  FormBuilder,  
  FormGroup,  
  Validators,  
  AbstractControl,
  FormControl
} from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'dicttype',
    template: `
<form class="form-horizontal" role="form" [formGroup]="myForm">
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">字典类型名称</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" [(ngModel)]="$model.dicttype.dicttypeName" 
        name="dicttypeName" formControlName="dicttypeName" >
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">字典类型描述</label>
    <div class="col-sm-10">
      <input type="textarea" [ngModelOptions]="{standalone: true}" class="form-control" [(ngModel)]="$model.dicttype.dicttypeDesc" name="dicttypeDesc" id="dicttypeDesc">
    </div>
  </div>
</form>  
    `
})
export class DicttypeEditComponent implements OnInit {

    myForm:FormGroup

    @Input() $model:any = {
        dicttype:{}
    }

    constructor(private http:Http) {
        let dicttypeNameControl = new FormControl('', Validators.required,(control)=>{
            return new Promise(resolve => {
                let urlSearchParams = new URLSearchParams();
                urlSearchParams.set("elementId", "dicttypeName");
                urlSearchParams.set("elementValue", control.value);
                urlSearchParams.set("formType", this.$model.params.type);
                urlSearchParams.set("dictTypeId", this.$model.dicttype.dicttypeId);
                let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                let options = new RequestOptions({
                    headers: headers,
                    search: urlSearchParams
                });
                this.http.get("dicttype/validate", options)
                    .map(res => res.json())
                    .subscribe(
                    data => {
                        if (data.validate === "success") {
                            resolve(null);
                        } else {
                            resolve({ userName: false });
                        }
                    },
                    err => {
                        resolve({ userName: false });
                    }
                    )
            });        
        });
        this.myForm = new FormGroup({
            dicttypeName: dicttypeNameControl
        });        
    }

    ngOnInit() {
        if(this.$model.dicttype == undefined){
            this.$model.dicttype = {}
        }
        
        if(this.$model.params.type == "edit"){
            this.http.get("dicttype/"+this.$model.params.dicttypeId)
                .map(data=>{
                    return data.json()
                })
                .subscribe(data=>{
                    this.$model.dicttype = data
                })
        }
    }

    onModalAction(){
        console.log("save model",this.$model.model)
        if(this.$model.params.type == "edit"){
            let body = JSON.stringify(this.$model.dicttype);
            let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
            let options = new RequestOptions({ headers: headers });
            return this.http.put('dicttype', body, options)
                .toPromise()
                .then((data)=>{debugger
                    return data
                });   
        }else if(this.$model.params.type == "add"){
            if(this.myForm.valid){
                let body = JSON.stringify(this.$model.dicttype);
                let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                let options = new RequestOptions({ headers: headers });
                return this.http.post('dicttype', body, options)
                    .toPromise()
                    .then((data) => { return data.json()}); 
            }else{
                return new Promise((resolve,reject)=>{
                    reject("no valid");
                    toastr.warning('验证不通过！')
                })
            }
  
        }
        
    }    
}