import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'wf-text-input',
    template: `
    <div class="form-group">
        <label for="inputPassword" class="col-sm-2 control-label">text</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="inputPassword" placeholder="Password">
        </div>
    </div>    
    `
})
export class TextinputComponent implements OnInit {
    @Input() field:any
    constructor() { }

    ngOnInit() { }
}