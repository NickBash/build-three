import { KEYS } from '../constants/keys';
export const TREE_ACTIONS = {
    TOGGLE_ACTIVE: (tree, node, $event) => node && node.toggleActivated(),
    TOGGLE_ACTIVE_MULTI: (tree, node, $event) => node && node.toggleActivated(true),
    TOGGLE_SELECTED: (tree, node, $event) => node && node.toggleSelected(),
    ACTIVATE: (tree, node, $event) => node.setIsActive(true),
    DEACTIVATE: (tree, node, $event) => node.setIsActive(false),
    SELECT: (tree, node, $event) => node.setIsSelected(true),
    DESELECT: (tree, node, $event) => node.setIsSelected(false),
    FOCUS: (tree, node, $event) => node.focus(),
    TOGGLE_EXPANDED: (tree, node, $event) => node.hasChildren && node.toggleExpanded(),
    EXPAND: (tree, node, $event) => node.expand(),
    COLLAPSE: (tree, node, $event) => node.collapse(),
    DRILL_DOWN: (tree, node, $event) => tree.focusDrillDown(),
    DRILL_UP: (tree, node, $event) => tree.focusDrillUp(),
    NEXT_NODE: (tree, node, $event) => tree.focusNextNode(),
    PREVIOUS_NODE: (tree, node, $event) => tree.focusPreviousNode(),
    MOVE_NODE: (tree, node, $event, { from, to }) => {
        // default action assumes from = node, to = {parent, index}
        if ($event.ctrlKey) {
            tree.copyNode(from, to);
        }
        else {
            tree.moveNode(from, to);
        }
    }
};
const defaultActionMapping = {
    mouse: {
        click: TREE_ACTIONS.TOGGLE_ACTIVE,
        dblClick: null,
        contextMenu: null,
        expanderClick: TREE_ACTIONS.TOGGLE_EXPANDED,
        checkboxClick: TREE_ACTIONS.TOGGLE_SELECTED,
        drop: TREE_ACTIONS.MOVE_NODE
    },
    keys: {
        [KEYS.RIGHT]: TREE_ACTIONS.DRILL_DOWN,
        [KEYS.LEFT]: TREE_ACTIONS.DRILL_UP,
        [KEYS.DOWN]: TREE_ACTIONS.NEXT_NODE,
        [KEYS.UP]: TREE_ACTIONS.PREVIOUS_NODE,
        [KEYS.SPACE]: TREE_ACTIONS.TOGGLE_ACTIVE,
        [KEYS.ENTER]: TREE_ACTIONS.TOGGLE_ACTIVE
    }
};
export class TreeOptions {
    constructor(options = {}) {
        this.options = options;
        this.actionMapping = {
            mouse: {
                click: this.options?.actionMapping?.mouse?.click ?? defaultActionMapping.mouse.click,
                dblClick: this.options?.actionMapping?.mouse?.dblClick ?? defaultActionMapping.mouse.dblClick,
                contextMenu: this.options?.actionMapping?.mouse?.contextMenu ?? defaultActionMapping.mouse.contextMenu,
                expanderClick: this.options?.actionMapping?.mouse?.expanderClick ?? defaultActionMapping.mouse.expanderClick,
                checkboxClick: this.options?.actionMapping?.mouse?.checkboxClick ?? defaultActionMapping.mouse.checkboxClick,
                drop: this.options?.actionMapping?.mouse?.drop ?? defaultActionMapping.mouse.drop,
                dragStart: this.options?.actionMapping?.mouse?.dragStart ?? undefined,
                drag: this.options?.actionMapping?.mouse?.drag ?? undefined,
                dragEnd: this.options?.actionMapping?.mouse?.dragEnd ?? undefined,
                dragOver: this.options?.actionMapping?.mouse?.dragOver ?? undefined,
                dragLeave: this.options?.actionMapping?.mouse?.dragLeave ?? undefined,
                dragEnter: this.options?.actionMapping?.mouse?.dragEnter ?? undefined,
                mouseOver: this.options?.actionMapping?.mouse?.mouseOver ?? undefined,
                mouseOut: this.options?.actionMapping?.mouse?.mouseOut ?? undefined,
            },
            keys: {
                [KEYS.RIGHT]: TREE_ACTIONS.DRILL_DOWN,
                [KEYS.LEFT]: TREE_ACTIONS.DRILL_UP,
                [KEYS.DOWN]: TREE_ACTIONS.NEXT_NODE,
                [KEYS.UP]: TREE_ACTIONS.PREVIOUS_NODE,
                [KEYS.SPACE]: TREE_ACTIONS.TOGGLE_ACTIVE,
                [KEYS.ENTER]: TREE_ACTIONS.TOGGLE_ACTIVE
            }
        };
        if (this.options?.actionMapping?.keys) {
            this.actionMapping.keys = {
                ...this.actionMapping.keys,
                ...this.options.actionMapping.keys
            };
        }
        if (options.rtl) {
            this.actionMapping.keys[KEYS.RIGHT] = options.actionMapping?.keys[KEYS.RIGHT] || TREE_ACTIONS.DRILL_UP;
            this.actionMapping.keys[KEYS.LEFT] = options.actionMapping?.keys[KEYS.LEFT] || TREE_ACTIONS.DRILL_DOWN;
        }
    }
    get hasChildrenField() { return this.options.hasChildrenField || 'hasChildren'; }
    get childrenField() { return this.options.childrenField || 'children'; }
    get displayField() { return this.options.displayField || 'name'; }
    get idField() { return this.options.idField || 'id'; }
    get isExpandedField() { return this.options.isExpandedField || 'isExpanded'; }
    get getChildren() { return this.options.getChildren; }
    get levelPadding() { return this.options.levelPadding || 0; }
    get useVirtualScroll() { return this.options.useVirtualScroll; }
    get animateExpand() { return this.options.animateExpand; }
    get animateSpeed() { return this.options.animateSpeed || 1; }
    get animateAcceleration() { return this.options.animateAcceleration || 1.2; }
    get scrollOnActivate() { return this.options.scrollOnActivate === undefined ? true : this.options.scrollOnActivate; }
    get rtl() { return !!this.options.rtl; }
    get rootId() { return this.options.rootId; }
    get useCheckbox() { return this.options.useCheckbox; }
    get useTriState() { return this.options.useTriState === undefined ? true : this.options.useTriState; }
    get scrollContainer() { return this.options.scrollContainer; }
    get allowDragoverStyling() { return this.options.allowDragoverStyling === undefined ? true : this.options.allowDragoverStyling; }
    getNodeClone(node) {
        if (this.options.getNodeClone) {
            return this.options.getNodeClone(node);
        }
        // remove id from clone
        // keeping ie11 compatibility
        const nodeClone = Object.assign({}, node.data);
        if (nodeClone.id) {
            delete nodeClone.id;
        }
        return nodeClone;
    }
    allowDrop(element, to, $event) {
        if (this.options.allowDrop instanceof Function) {
            return this.options.allowDrop(element, to, $event);
        }
        else {
            return this.options.allowDrop === undefined ? true : this.options.allowDrop;
        }
    }
    allowDrag(node) {
        if (this.options.allowDrag instanceof Function) {
            return this.options.allowDrag(node);
        }
        else {
            return this.options.allowDrag;
        }
    }
    nodeClass(node) {
        return this.options.nodeClass ? this.options.nodeClass(node) : '';
    }
    nodeHeight(node) {
        if (node.data.virtual) {
            return 0;
        }
        let nodeHeight = this.options.nodeHeight || 22;
        if (typeof nodeHeight === 'function') {
            nodeHeight = nodeHeight(node);
        }
        // account for drop slots:
        return nodeHeight + (node.index === 0 ? 2 : 1) * this.dropSlotHeight;
    }
    get dropSlotHeight() {
        return typeof this.options.dropSlotHeight === 'number' ? this.options.dropSlotHeight : 2;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1vcHRpb25zLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci10cmVlLWNvbXBvbmVudC9zcmMvbGliL21vZGVscy90cmVlLW9wdGlvbnMubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBT3pDLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRztJQUMxQixhQUFhLEVBQUUsQ0FBQyxJQUFlLEVBQUUsSUFBYyxFQUFFLE1BQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7SUFDL0YsbUJBQW1CLEVBQUUsQ0FBQyxJQUFlLEVBQUUsSUFBYyxFQUFFLE1BQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO0lBQ3pHLGVBQWUsRUFBRSxDQUFDLElBQWUsRUFBRSxJQUFjLEVBQUUsTUFBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtJQUNoRyxRQUFRLEVBQUUsQ0FBQyxJQUFlLEVBQUUsSUFBYyxFQUFFLE1BQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDbEYsVUFBVSxFQUFFLENBQUMsSUFBZSxFQUFFLElBQWMsRUFBRSxNQUFXLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO0lBQ3JGLE1BQU0sRUFBRSxDQUFDLElBQWUsRUFBRSxJQUFjLEVBQUUsTUFBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztJQUNsRixRQUFRLEVBQUUsQ0FBQyxJQUFlLEVBQUUsSUFBYyxFQUFFLE1BQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENB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U0FDL0I7UUFFRCwwQkFBMEI7UUFDMUIsT0FBTyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4vdHJlZS1ub2RlLm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi90cmVlLm1vZGVsJztcclxuaW1wb3J0IHsgS0VZUyB9IGZyb20gJy4uL2NvbnN0YW50cy9rZXlzJztcclxuaW1wb3J0IHsgSVRyZWVPcHRpb25zIH0gZnJvbSAnLi4vZGVmcy9hcGknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uSGFuZGxlciB7XHJcbiAgKHRyZWU6IFRyZWVNb2RlbCwgbm9kZTogVHJlZU5vZGUsICRldmVudDogYW55LCAuLi5yZXN0KTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFRSRUVfQUNUSU9OUyA9IHtcclxuICBUT0dHTEVfQUNUSVZFOiAodHJlZTogVHJlZU1vZGVsLCBub2RlOiBUcmVlTm9kZSwgJGV2ZW50OiBhbnkpID0+IG5vZGUgJiYgbm9kZS50b2dnbGVBY3RpdmF0ZWQoKSxcclxuICBUT0dHTEVfQUNUSVZFX01VTFRJOiAodHJlZTogVHJlZU1vZGVsLCBub2RlOiBUcmVlTm9kZSwgJGV2ZW50OiBhbnkpID0+IG5vZGUgJiYgbm9kZS50b2dnbGVBY3RpdmF0ZWQodHJ1ZSksXHJcbiAgVE9HR0xFX1NFTEVDVEVEOiAodHJlZTogVHJlZU1vZGVsLCBub2RlOiBUcmVlTm9kZSwgJGV2ZW50OiBhbnkpID0+IG5vZGUgJiYgbm9kZS50b2dnbGVTZWxlY3RlZCgpLFxyXG4gIEFDVElWQVRFOiAodHJlZTogVHJlZU1vZGVsLCBub2RlOiBUcmVlTm9kZSwgJGV2ZW50OiBhbnkpID0+IG5vZGUuc2V0SXNBY3RpdmUodHJ1ZSksXHJcbiAgREVBQ1RJVkFURTogKHRyZWU6IFRyZWVNb2RlbCwgbm9kZTogVHJlZU5vZGUsICRldmVudDogYW55KSA9PiBub2RlLnNldElzQWN0aXZlKGZhbHNlKSxcclxuICBTRUxFQ1Q6ICh0cmVlOiBUcmVlTW9kZWwsIG5vZGU6IFRyZWVOb2RlLCAkZXZlbnQ6IGFueSkgPT4gbm9kZS5zZXRJc1NlbGVjdGVkKHRydWUpLFxyXG4gIERFU0VMRUNUOiAodHJlZTogVHJlZU1vZGVsLCBub2RlOiBUcmVlTm9kZSwgJGV2ZW50OiBhbnkpID0+IG5vZGUuc2V0SXNTZWxlY3RlZChmYWxzZSksXHJcbiAgRk9DVVM6ICh0cmVlOiBUcmVlTW9kZWwsIG5vZGU6IFRyZWVOb2RlLCAkZXZlbnQ6IGFueSkgPT4gbm9kZS5mb2N1cygpLFxyXG4gIFRPR0dMRV9FWFBBTkRFRDogKHRyZWU6IFRyZWVNb2RlbCwgbm9kZTogVHJlZU5vZGUsICRldmVudDogYW55KSA9PiBub2RlLmhhc0NoaWxkcmVuICYmIG5vZGUudG9nZ2xlRXhwYW5kZWQoKSxcclxuICBFWFBBTkQ6ICh0cmVlOiBUcmVlTW9kZWwsIG5vZGU6IFRyZWVOb2RlLCAkZXZlbnQ6IGFueSkgPT4gbm9kZS5leHBhbmQoKSxcclxuICBDT0xMQVBTRTogKHRyZWU6IFRyZWVNb2RlbCwgbm9kZTogVHJlZU5vZGUsICRldmVudDogYW55KSA9PiBub2RlLmNvbGxhcHNlKCksXHJcbiAgRFJJTExfRE9XTjogKHRyZWU6IFRyZWVNb2RlbCwgbm9kZTogVHJlZU5vZGUsICRldmVudDogYW55KSA9PiB0cmVlLmZvY3VzRHJpbGxEb3duKCksXHJcbiAgRFJJTExfVVA6ICh0cmVlOiBUcmVlTW9kZWwsIG5vZGU6IFRyZWVOb2RlLCAkZXZlbnQ6IGFueSkgPT4gdHJlZS5mb2N1c0RyaWxsVXAoKSxcclxuICBORVhUX05PREU6ICh0cmVlOiBUcmVlTW9kZWwsIG5vZGU6IFRyZWVOb2RlLCAkZXZlbnQ6IGFueSkgPT4gIHRyZWUuZm9jdXNOZXh0Tm9kZSgpLFxyXG4gIFBSRVZJT1VTX05PREU6ICh0cmVlOiBUcmVlTW9kZWwsIG5vZGU6IFRyZWVOb2RlLCAkZXZlbnQ6IGFueSkgPT4gIHRyZWUuZm9jdXNQcmV2aW91c05vZGUoKSxcclxuICBNT1ZFX05PREU6ICh0cmVlOiBUcmVlTW9kZWwsIG5vZGU6IFRyZWVOb2RlLCAkZXZlbnQ6IGFueSwge2Zyb20gLCB0b306IHtmcm9tOiBhbnksIHRvOiBhbnl9KSA9PiB7XHJcbiAgICAvLyBkZWZhdWx0IGFjdGlvbiBhc3N1bWVzIGZyb20gPSBub2RlLCB0byA9IHtwYXJlbnQsIGluZGV4fVxyXG4gICAgaWYgKCRldmVudC5jdHJsS2V5KSB7XHJcbiAgICAgIHRyZWUuY29weU5vZGUoZnJvbSwgdG8pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdHJlZS5tb3ZlTm9kZShmcm9tLCB0byk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgZGVmYXVsdEFjdGlvbk1hcHBpbmc6IElBY3Rpb25NYXBwaW5nID0ge1xyXG4gIG1vdXNlOiB7XHJcbiAgICBjbGljazogVFJFRV9BQ1RJT05TLlRPR0dMRV9BQ1RJVkUsXHJcbiAgICBkYmxDbGljazogbnVsbCxcclxuICAgIGNvbnRleHRNZW51OiBudWxsLFxyXG4gICAgZXhwYW5kZXJDbGljazogVFJFRV9BQ1RJT05TLlRPR0dMRV9FWFBBTkRFRCxcclxuICAgIGNoZWNrYm94Q2xpY2s6IFRSRUVfQUNUSU9OUy5UT0dHTEVfU0VMRUNURUQsXHJcbiAgICBkcm9wOiBUUkVFX0FDVElPTlMuTU9WRV9OT0RFXHJcbiAgfSxcclxuICBrZXlzOiB7XHJcbiAgICBbS0VZUy5SSUdIVF06IFRSRUVfQUNUSU9OUy5EUklMTF9ET1dOLFxyXG4gICAgW0tFWVMuTEVGVF06IFRSRUVfQUNUSU9OUy5EUklMTF9VUCxcclxuICAgIFtLRVlTLkRPV05dOiBUUkVFX0FDVElPTlMuTkVYVF9OT0RFLFxyXG4gICAgW0tFWVMuVVBdOiBUUkVFX0FDVElPTlMuUFJFVklPVVNfTk9ERSxcclxuICAgIFtLRVlTLlNQQUNFXTogVFJFRV9BQ1RJT05TLlRPR0dMRV9BQ1RJVkUsXHJcbiAgICBbS0VZUy5FTlRFUl06IFRSRUVfQUNUSU9OUy5UT0dHTEVfQUNUSVZFXHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uTWFwcGluZyB7XHJcbiAgbW91c2U/OiB7XHJcbiAgICBjbGljaz86IElBY3Rpb25IYW5kbGVyLFxyXG4gICAgZGJsQ2xpY2s/OiBJQWN0aW9uSGFuZGxlcixcclxuICAgIGNvbnRleHRNZW51PzogSUFjdGlvbkhhbmRsZXIsXHJcbiAgICBleHBhbmRlckNsaWNrPzogSUFjdGlvbkhhbmRsZXIsXHJcbiAgICBjaGVja2JveENsaWNrPzogSUFjdGlvbkhhbmRsZXIsXHJcbiAgICBkcmFnU3RhcnQ/OiBJQWN0aW9uSGFuZGxlcixcclxuICAgIGRyYWc/OiBJQWN0aW9uSGFuZGxlcixcclxuICAgIGRyYWdFbmQ/OiBJQWN0aW9uSGFuZGxlcixcclxuICAgIGRyYWdPdmVyPzogSUFjdGlvbkhhbmRsZXIsXHJcbiAgICBkcmFnTGVhdmU/OiBJQWN0aW9uSGFuZGxlcixcclxuICAgIGRyYWdFbnRlcj86IElBY3Rpb25IYW5kbGVyLFxyXG4gICAgZHJvcD86IElBY3Rpb25IYW5kbGVyLFxyXG4gICAgbW91c2VPdmVyPzogSUFjdGlvbkhhbmRsZXIsXHJcbiAgICBtb3VzZU91dD86IElBY3Rpb25IYW5kbGVyXHJcbiAgfTtcclxuICBrZXlzPzoge1xyXG4gICAgW2tleTogbnVtYmVyXTogSUFjdGlvbkhhbmRsZXJcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZU9wdGlvbnMge1xyXG4gIGdldCBoYXNDaGlsZHJlbkZpZWxkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm9wdGlvbnMuaGFzQ2hpbGRyZW5GaWVsZCB8fCAnaGFzQ2hpbGRyZW4nOyB9XHJcbiAgZ2V0IGNoaWxkcmVuRmllbGQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5jaGlsZHJlbkZpZWxkIHx8ICdjaGlsZHJlbic7IH1cclxuICBnZXQgZGlzcGxheUZpZWxkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm9wdGlvbnMuZGlzcGxheUZpZWxkIHx8ICduYW1lJzsgfVxyXG4gIGdldCBpZEZpZWxkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm9wdGlvbnMuaWRGaWVsZCB8fCAnaWQnOyB9XHJcbiAgZ2V0IGlzRXhwYW5kZWRGaWVsZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5vcHRpb25zLmlzRXhwYW5kZWRGaWVsZCB8fCAnaXNFeHBhbmRlZCc7IH1cclxuICBnZXQgZ2V0Q2hpbGRyZW4oKTogYW55IHsgcmV0dXJuIHRoaXMub3B0aW9ucy5nZXRDaGlsZHJlbjsgfVxyXG4gIGdldCBsZXZlbFBhZGRpbmcoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5sZXZlbFBhZGRpbmcgfHwgMDsgfVxyXG4gIGdldCB1c2VWaXJ0dWFsU2Nyb2xsKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5vcHRpb25zLnVzZVZpcnR1YWxTY3JvbGw7IH1cclxuICBnZXQgYW5pbWF0ZUV4cGFuZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5hbmltYXRlRXhwYW5kOyB9XHJcbiAgZ2V0IGFuaW1hdGVTcGVlZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5vcHRpb25zLmFuaW1hdGVTcGVlZCB8fCAxOyB9XHJcbiAgZ2V0IGFuaW1hdGVBY2NlbGVyYXRpb24oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5hbmltYXRlQWNjZWxlcmF0aW9uIHx8IDEuMjsgfVxyXG4gIGdldCBzY3JvbGxPbkFjdGl2YXRlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5vcHRpb25zLnNjcm9sbE9uQWN0aXZhdGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiB0aGlzLm9wdGlvbnMuc2Nyb2xsT25BY3RpdmF0ZTsgfVxyXG4gIGdldCBydGwoKTogYm9vbGVhbiB7IHJldHVybiAhIXRoaXMub3B0aW9ucy5ydGw7IH1cclxuICBnZXQgcm9vdElkKCk6IGFueSB7cmV0dXJuIHRoaXMub3B0aW9ucy5yb290SWQ7IH1cclxuICBnZXQgdXNlQ2hlY2tib3goKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm9wdGlvbnMudXNlQ2hlY2tib3g7IH1cclxuICBnZXQgdXNlVHJpU3RhdGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm9wdGlvbnMudXNlVHJpU3RhdGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiB0aGlzLm9wdGlvbnMudXNlVHJpU3RhdGU7IH1cclxuICBnZXQgc2Nyb2xsQ29udGFpbmVyKCk6IEhUTUxFbGVtZW50IHsgcmV0dXJuIHRoaXMub3B0aW9ucy5zY3JvbGxDb250YWluZXI7IH1cclxuICBnZXQgYWxsb3dEcmFnb3ZlclN0eWxpbmcoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm9wdGlvbnMuYWxsb3dEcmFnb3ZlclN0eWxpbmcgPT09IHVuZGVmaW5lZCA/IHRydWUgOiB0aGlzLm9wdGlvbnMuYWxsb3dEcmFnb3ZlclN0eWxpbmc7IH1cclxuICBhY3Rpb25NYXBwaW5nOiBJQWN0aW9uTWFwcGluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvcHRpb25zOiBJVHJlZU9wdGlvbnMgPSB7fSkge1xyXG4gICAgdGhpcy5hY3Rpb25NYXBwaW5nID0ge1xyXG4gICAgICBtb3VzZToge1xyXG4gICAgICAgIGNsaWNrOiB0aGlzLm9wdGlvbnM/LmFjdGlvbk1hcHBpbmc/Lm1vdXNlPy5jbGljayA/PyBkZWZhdWx0QWN0aW9uTWFwcGluZy5tb3VzZS5jbGljayxcclxuICAgICAgICBkYmxDbGljazogdGhpcy5vcHRpb25zPy5hY3Rpb25NYXBwaW5nPy5tb3VzZT8uZGJsQ2xpY2sgPz8gZGVmYXVsdEFjdGlvbk1hcHBpbmcubW91c2UuZGJsQ2xpY2ssXHJcbiAgICAgICAgY29udGV4dE1lbnU6IHRoaXMub3B0aW9ucz8uYWN0aW9uTWFwcGluZz8ubW91c2U/LmNvbnRleHRNZW51ID8/IGRlZmF1bHRBY3Rpb25NYXBwaW5nLm1vdXNlLmNvbnRleHRNZW51LFxyXG4gICAgICAgIGV4cGFuZGVyQ2xpY2s6IHRoaXMub3B0aW9ucz8uYWN0aW9uTWFwcGluZz8ubW91c2U/LmV4cGFuZGVyQ2xpY2sgPz8gZGVmYXVsdEFjdGlvbk1hcHBpbmcubW91c2UuZXhwYW5kZXJDbGljayxcclxuICAgICAgICBjaGVja2JveENsaWNrOiB0aGlzLm9wdGlvbnM/LmFjdGlvbk1hcHBpbmc/Lm1vdXNlPy5jaGVja2JveENsaWNrID8/IGRlZmF1bHRBY3Rpb25NYXBwaW5nLm1vdXNlLmNoZWNrYm94Q2xpY2ssXHJcbiAgICAgICAgZHJvcDogdGhpcy5vcHRpb25zPy5hY3Rpb25NYXBwaW5nPy5tb3VzZT8uZHJvcCA/PyBkZWZhdWx0QWN0aW9uTWFwcGluZy5tb3VzZS5kcm9wLFxyXG4gICAgICAgIGRyYWdTdGFydDogdGhpcy5vcHRpb25zPy5hY3Rpb25NYXBwaW5nPy5tb3VzZT8uZHJhZ1N0YXJ0ID8/IHVuZGVmaW5lZCxcclxuICAgICAgICBkcmFnOiB0aGlzLm9wdGlvbnM/LmFjdGlvbk1hcHBpbmc/Lm1vdXNlPy5kcmFnID8/IHVuZGVmaW5lZCxcclxuICAgICAgICBkcmFnRW5kOiB0aGlzLm9wdGlvbnM/LmFjdGlvbk1hcHBpbmc/Lm1vdXNlPy5kcmFnRW5kID8/IHVuZGVmaW5lZCxcclxuICAgICAgICBkcmFnT3ZlcjogdGhpcy5vcHRpb25zPy5hY3Rpb25NYXBwaW5nPy5tb3VzZT8uZHJhZ092ZXIgPz8gdW5kZWZpbmVkLFxyXG4gICAgICAgIGRyYWdMZWF2ZTogdGhpcy5vcHRpb25zPy5hY3Rpb25NYXBwaW5nPy5tb3VzZT8uZHJhZ0xlYXZlID8/IHVuZGVmaW5lZCxcclxuICAgICAgICBkcmFnRW50ZXI6IHRoaXMub3B0aW9ucz8uYWN0aW9uTWFwcGluZz8ubW91c2U/LmRyYWdFbnRlciA/PyB1bmRlZmluZWQsXHJcbiAgICAgICAgbW91c2VPdmVyOiB0aGlzLm9wdGlvbnM/LmFjdGlvbk1hcHBpbmc/Lm1vdXNlPy5tb3VzZU92ZXIgPz8gdW5kZWZpbmVkLFxyXG4gICAgICAgIG1vdXNlT3V0OiB0aGlzLm9wdGlvbnM/LmFjdGlvbk1hcHBpbmc/Lm1vdXNlPy5tb3VzZU91dCA/PyB1bmRlZmluZWQsXHJcbiAgICAgIH0sXHJcbiAgICAgIGtleXM6IHtcclxuICAgICAgICBbS0VZUy5SSUdIVF06IFRSRUVfQUNUSU9OUy5EUklMTF9ET1dOLFxyXG4gICAgICAgIFtLRVlTLkxFRlRdOiBUUkVFX0FDVElPTlMuRFJJTExfVVAsXHJcbiAgICAgICAgW0tFWVMuRE9XTl06IFRSRUVfQUNUSU9OUy5ORVhUX05PREUsXHJcbiAgICAgICAgW0tFWVMuVVBdOiBUUkVFX0FDVElPTlMuUFJFVklPVVNfTk9ERSxcclxuICAgICAgICBbS0VZUy5TUEFDRV06IFRSRUVfQUNUSU9OUy5UT0dHTEVfQUNUSVZFLFxyXG4gICAgICAgIFtLRVlTLkVOVEVSXTogVFJFRV9BQ1RJT05TLlRPR0dMRV9BQ1RJVkVcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnM/LmFjdGlvbk1hcHBpbmc/LmtleXMpIHtcclxuICAgICAgdGhpcy5hY3Rpb25NYXBwaW5nLmtleXMgPSB7XHJcbiAgICAgICAgLi4udGhpcy5hY3Rpb25NYXBwaW5nLmtleXMsXHJcbiAgICAgICAgLi4udGhpcy5vcHRpb25zLmFjdGlvbk1hcHBpbmcua2V5c1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnMucnRsKSB7XHJcbiAgICAgIHRoaXMuYWN0aW9uTWFwcGluZy5rZXlzW0tFWVMuUklHSFRdID0gPElBY3Rpb25IYW5kbGVyPm9wdGlvbnMuYWN0aW9uTWFwcGluZz8ua2V5c1tLRVlTLlJJR0hUXSB8fCBUUkVFX0FDVElPTlMuRFJJTExfVVA7XHJcbiAgICAgIHRoaXMuYWN0aW9uTWFwcGluZy5rZXlzW0tFWVMuTEVGVF0gPSA8SUFjdGlvbkhhbmRsZXI+b3B0aW9ucy5hY3Rpb25NYXBwaW5nPy5rZXlzW0tFWVMuTEVGVF0gfHwgVFJFRV9BQ1RJT05TLkRSSUxMX0RPV047XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXROb2RlQ2xvbmUobm9kZTogVHJlZU5vZGUpOiBhbnkge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5nZXROb2RlQ2xvbmUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5nZXROb2RlQ2xvbmUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVtb3ZlIGlkIGZyb20gY2xvbmVcclxuICAgIC8vIGtlZXBpbmcgaWUxMSBjb21wYXRpYmlsaXR5XHJcbiAgICBjb25zdCBub2RlQ2xvbmUgPSBPYmplY3QuYXNzaWduKHt9LCBub2RlLmRhdGEpO1xyXG4gICAgaWYgKG5vZGVDbG9uZS5pZCkge1xyXG4gICAgICBkZWxldGUgbm9kZUNsb25lLmlkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5vZGVDbG9uZTtcclxuICB9XHJcblxyXG4gIGFsbG93RHJvcChlbGVtZW50LCB0bywgJGV2ZW50Pyk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbGxvd0Ryb3AgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFsbG93RHJvcChlbGVtZW50LCB0bywgJGV2ZW50KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFsbG93RHJvcCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHRoaXMub3B0aW9ucy5hbGxvd0Ryb3A7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhbGxvd0RyYWcobm9kZTogVHJlZU5vZGUpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuYWxsb3dEcmFnIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hbGxvd0RyYWcobm9kZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFsbG93RHJhZztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5vZGVDbGFzcyhub2RlOiBUcmVlTm9kZSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm5vZGVDbGFzcyA/IHRoaXMub3B0aW9ucy5ub2RlQ2xhc3Mobm9kZSkgOiAnJztcclxuICB9XHJcblxyXG4gIG5vZGVIZWlnaHQobm9kZTogVHJlZU5vZGUpOiBudW1iZXIge1xyXG4gICAgaWYgKG5vZGUuZGF0YS52aXJ0dWFsKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBub2RlSGVpZ2h0ID0gdGhpcy5vcHRpb25zLm5vZGVIZWlnaHQgfHwgMjI7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBub2RlSGVpZ2h0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIG5vZGVIZWlnaHQgPSBub2RlSGVpZ2h0KG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFjY291bnQgZm9yIGRyb3Agc2xvdHM6XHJcbiAgICByZXR1cm4gbm9kZUhlaWdodCArIChub2RlLmluZGV4ID09PSAwID8gIDIgOiAxKSAqIHRoaXMuZHJvcFNsb3RIZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBnZXQgZHJvcFNsb3RIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0eXBlb2YgdGhpcy5vcHRpb25zLmRyb3BTbG90SGVpZ2h0ID09PSAnbnVtYmVyJyA/IHRoaXMub3B0aW9ucy5kcm9wU2xvdEhlaWdodCA6IDI7XHJcbiAgfVxyXG59XHJcbiJdfQ==