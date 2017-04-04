
import { Type } from '@angular/core';

let uilist = new Array()
let uimap = new Map<string, Type<any>>()

export function UIComponent(options: {
    selector: string,
    component: any
}) {
    // debugger
    uilist.push(options)
    uimap.set(options.selector, options.component)
    console.log("uicomponent(): evaluated");
    return function ({ constructor: Function }) {

        console.log("uicomponent(): called");
    }
}
export { uimap, uilist }