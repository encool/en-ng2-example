export abstract class BaseAction {
    key: string
    name: string
    order: number
    cancel: boolean
    close: boolean
    style: string
    constructor(options:
        {
            key?: string,
            name?: string,
            order?: number
            cancel?: boolean
            close?: boolean
            style?: string
        } = {}) {
        this.key = options.key;
        this.name = options.name;
        this.order = options.order === undefined ? 999 : options.order
        this.cancel = options.cancel
        this.close = options.close
        this.style = options.style === undefined ? "primary" : options.style
    }
}