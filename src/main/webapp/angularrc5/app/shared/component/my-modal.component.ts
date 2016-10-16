import { Component, OnInit, Input, Output, EventEmitter, ContentChild } from '@angular/core';

import { ModalAction } from '../object/modal-action'
import { ModalEvent } from '../object/modal-event'

@Component({
    selector: 'my-modal',
    templateUrl: './my-modal.component.html'
})
export class MyModalComponent implements OnInit {
    private _id:string;
    private __id:string;
    @ContentChild('modalcontent_ref') containerChild;
    @Output() modalsave = new EventEmitter(); 
    @Output() modalcancel = new EventEmitter(); 
    @Output() modalevent = new EventEmitter();

    @Input() actions:Array<ModalAction> = [
        new ModalAction({ key: "cancel", name: "取消", order: 1, cancel: true }),
        new ModalAction({ key: "save", name: "保存", order: 2 })
    ]
    // @Input() set actions(actions:Array<BaseAction>){debugger
    //     // actions == undefined?[]:actions
    // }
    @Input() set modalId(modalId){
        this._id = "#"+modalId;
        this.__id = modalId;
    };
    constructor() { }

    onAction(action:ModalAction){
        let event:ModalEvent = new ModalEvent(this.__id,action,this.containerChild);
        this.modalevent.emit(event);
        this.hideModal()
    }

    ngOnInit() { }

    onsave(){
        this.containerChild.modalOnSave().then((date)=>{
                $(this._id).modal('hide')
                this.modalsave.emit({type:date});
            } 
        );
        // console.log("onsave")
        // this.modalsave.emit("save");    
    }

    oncancel(){
        this.modalcancel.emit({type:"cancel"});   
    }

    setDataDismiss(action:ModalAction){
        return action.cancel?"modal":""
    }

    ngAfterContentInit() {

        // contentChild is set
        // containerChild is set
    }    

    hideModal(){
        $(this._id).modal('hide')
    }

    showModal(){
        $(this._id).modal('show')
    }
}