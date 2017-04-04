import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'my-div',
    template: `
        <div [ngStyle]="setStyles()" [ngClass]="setClass()">
            <ng-content></ng-content>
        <div>
    `
})
export class MydivComponent implements OnInit {
    @Input() span: number
    @Input() offset: number
    @Input() padding: any = true
    @Input() hidden: boolean = false
    @Input() styles: string
    setClass() {
        var colClassName = "col-sm-" + (this.span == undefined ? 12 : this.span);
        var classOb = {};
        classOb[colClassName] = true
        // classOb['form-horizontal'] = true
        classOb["col-md-offset-" + this.offset] = this.offset == undefined ? false : true;
        return classOb;
    }

    setStyles() {
        if (this.padding === false || this.padding == "false") {
            this.padding = false
        }
        let styles = {
            'padding': this.padding ? '10px' : '0px',  // italic
            'display': this.hidden ? 'none' : 'block',
        };
        if (this.styles) {
            let styes = this.styles.split(";")
            for (let i in styes) {
                let kvs = styes[i].split(":")
                styles[kvs[0]] = kvs[1]
            }
        }
        return styles;
    }

    constructor() { }

    ngOnInit() {
        // debugger
        this
    }

}