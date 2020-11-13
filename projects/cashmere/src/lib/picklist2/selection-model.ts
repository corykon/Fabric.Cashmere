import { HcPickOption } from './pick.types';

export type SelectionModelFactory = () => HcPickSelectionModel;

export function DefaultSelectionModelFactory() {
    return new DefaultSelectionModel();
}

export interface HcPickSelectionModel {
    value: HcPickOption[];
    select(item: HcPickOption);
    unselect(item: HcPickOption);
    clear(keepDisabled: boolean);
    selectAll(items: Array<HcPickOption>, canSelectGroup: boolean);
}

export class DefaultSelectionModel implements HcPickSelectionModel {
    private _selected: HcPickOption[] = [];

    get value(): HcPickOption[] { return this._selected; }

    select(item: HcPickOption) {
        item.selected = true;
        if (!item.isParent) {
            this._selected.push(item);
        }
        if (item.isChild) {
            item.parent.selected = item.parent.children.every(x => x.selected);
        } else if (item.isParent) {
            this._setChildrenSelectedState(item.children, true);
            this._removeChildren(item);
            this._selected = [...this._selected, ...item.children.filter(x => !x.disabled)];
        }
    }

    unselect(item: HcPickOption) {
        this._selected = this._selected.filter(x => x !== item);
        item.selected = false;
        if (item.isChild && item.parent.selected) {
            const children = item.parent.children;
            this._removeParent(item.parent);
            this._removeChildren(item.parent);
            this._selected.push(...children.filter(x => x !== item && !x.disabled));
            item.parent.selected = false;
        } else if (item.isParent) {
            this._setChildrenSelectedState(item.children, false);
            this._removeChildren(item);
        }
    }

    clear(keepDisabled: boolean) {
        this._selected = keepDisabled ? this._selected.filter(x => x.disabled) : [];
    }

    selectAll(items: Array<HcPickOption>, canSelectGroup: boolean) {
        this._selected = items.filter(i => !i.disabled && !i.children);
        items.filter(i => !i.disabled && (canSelectGroup || !i.children)).forEach(i => i.selected = true);
    }

    private _setChildrenSelectedState(children: HcPickOption[], selected: boolean) {
        for (const child of children) {
            if (child.disabled) {
                continue;
            }
            child.selected = selected;
        };
    }

    private _removeChildren(parent: HcPickOption) {
        this._selected = [
            ...this._selected.filter(x => x.parent !== parent),
            ...parent.children.filter(x => x.parent === parent && x.disabled && x.selected)
        ];
    }

    private _removeParent(parent: HcPickOption) {
        this._selected = this._selected.filter(x => x !== parent)
    }
}
