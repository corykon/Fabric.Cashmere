import { Injectable } from '@angular/core';
import { ItemsList } from './items-list';
import { HcPickPaneComponent } from './pick-pane.component';
import { HcPickOption } from './pick.types';

@Injectable()
/** Contains logic for dragging and dropping items between picklist panes. */
export class HcPickPaneDragService {
    private pane: HcPickPaneComponent;

    public reset(pane: HcPickPaneComponent) {
        this.pane = pane;
    }

    public drag(event: DragEvent, list: ItemsList, item: HcPickOption) {
        event.stopPropagation();
        if (!item.selected) { list.clearSelected(true); }
        list.select(item);
        this.pane._isDragging = true;
    }

    public allowDrop(event: DragEvent) {
        if (!this.pane._isDragging) {
            event.preventDefault();
            this.pane._willAcceptDrop = true;
        }
    }

    public drop(event: DragEvent) {
        if (this.pane._willAcceptDrop) {
            event.preventDefault();
            this.pane._companionPane.triggerMove.emit();
        }

        this.dragLeave();
        this.dragEnd();
    }

    public dragEnd() {
        this.pane._isDragging = false;
        this.pane._companionPane._isDragging = false;
    }

    public dragLeave() {
        this.pane._willAcceptDrop = false;
        this.pane._companionPane._willAcceptDrop = false;
        this.pane.detectChanges();
        this.pane._companionPane.detectChanges();
    }
}
