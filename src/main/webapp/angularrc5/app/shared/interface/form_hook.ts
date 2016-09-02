import { JqgridEvent } from '../object/jqgrid-event'
import { TreeEvent } from '../object/treeevent'
import { ModalEvent } from '../object/modal-event'

export declare abstract class onGridAction {
    abstract onGridAction(event:JqgridEvent);
}
export declare abstract class onZtreeAction {
    abstract onZtreeAction(event:TreeEvent);
}
export declare abstract class onModalAction {
    abstract onModalAction(event:ModalEvent);
}
export declare abstract class afterDateLoad {
    abstract afterDateLoad();
}