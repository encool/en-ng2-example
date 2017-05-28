import { BaseAction } from './base-action'
export class JqgridAction extends BaseAction {
    //是否查询操作
    isQuery: boolean
    constructor(options: {
        key?: string,
        name?: string,
        order?: number
        cancel?: boolean
        close?: boolean
        style?: string
        isQuery?: boolean
    } = {}) {
        super(options);
        this.isQuery = options.isQuery || false
        this.name = options.name || "查询"
        this.key = options.key || "query"
    }
}