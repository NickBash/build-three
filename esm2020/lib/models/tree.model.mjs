var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { observable, computed, action, autorun } from 'mobx';
import { TreeNode } from './tree-node.model';
import { TreeOptions } from './tree-options.model';
import { TREE_EVENTS } from '../constants/events';
import * as i0 from "@angular/core";
export class TreeModel {
    constructor() {
        this.options = new TreeOptions();
        this.eventNames = Object.keys(TREE_EVENTS);
        this.expandedNodeIds = {};
        this.selectedLeafNodeIds = {};
        this.activeNodeIds = {};
        this.hiddenNodeIds = {};
        this.focusedNodeId = null;
        this.firstUpdate = true;
        this.subscriptions = [];
    }
    // events
    fireEvent(event) {
        event.treeModel = this;
        this.events[event.eventName].emit(event);
        this.events.event.emit(event);
    }
    subscribe(eventName, fn) {
        const subscription = this.events[eventName].subscribe(fn);
        this.subscriptions.push(subscription);
    }
    // getters
    getFocusedNode() {
        return this.focusedNode;
    }
    getActiveNode() {
        return this.activeNodes[0];
    }
    getActiveNodes() {
        return this.activeNodes;
    }
    getVisibleRoots() {
        return this.virtualRoot.visibleChildren;
    }
    getFirstRoot(skipHidden = false) {
        const root = skipHidden ? this.getVisibleRoots() : this.roots;
        return root != null && root.length ? root[0] : null;
    }
    getLastRoot(skipHidden = false) {
        const root = skipHidden ? this.getVisibleRoots() : this.roots;
        return root != null && root.length ? root[root.length - 1] : null;
    }
    get isFocused() {
        return TreeModel.focusedTree === this;
    }
    isNodeFocused(node) {
        return this.focusedNode === node;
    }
    isEmptyTree() {
        return this.roots && this.roots.length === 0;
    }
    get focusedNode() {
        return this.focusedNodeId ? this.getNodeById(this.focusedNodeId) : null;
    }
    get expandedNodes() {
        const nodes = Object.keys(this.expandedNodeIds)
            .filter((id) => this.expandedNodeIds[id])
            .map((id) => this.getNodeById(id));
        return nodes.filter(Boolean);
    }
    get activeNodes() {
        const nodes = Object.keys(this.activeNodeIds)
            .filter((id) => this.activeNodeIds[id])
            .map((id) => this.getNodeById(id));
        return nodes.filter(Boolean);
    }
    get hiddenNodes() {
        const nodes = Object.keys(this.hiddenNodeIds)
            .filter((id) => this.hiddenNodeIds[id])
            .map((id) => this.getNodeById(id));
        return nodes.filter(Boolean);
    }
    get selectedLeafNodes() {
        const nodes = Object.keys(this.selectedLeafNodeIds)
            .filter((id) => this.selectedLeafNodeIds[id])
            .map((id) => this.getNodeById(id));
        return nodes.filter(Boolean);
    }
    // locating nodes
    getNodeByPath(path, startNode = null) {
        if (!path)
            return null;
        startNode = startNode || this.virtualRoot;
        if (path.length === 0)
            return startNode;
        if (!startNode.children)
            return null;
        const childId = path.shift();
        const childNode = startNode.children.find(c => c.id === childId);
        if (!childNode)
            return null;
        return this.getNodeByPath(path, childNode);
    }
    getNodeById(id) {
        const idStr = id.toString();
        return this.getNodeBy((node) => node.id.toString() === idStr);
    }
    getNodeBy(predicate, startNode = null) {
        startNode = startNode || this.virtualRoot;
        if (!startNode.children)
            return null;
        const found = startNode.children.find(predicate);
        if (found) { // found in children
            return found;
        }
        else { // look in children's children
            for (let child of startNode.children) {
                const foundInChildren = this.getNodeBy(predicate, child);
                if (foundInChildren)
                    return foundInChildren;
            }
        }
    }
    isExpanded(node) {
        return this.expandedNodeIds[node.id];
    }
    isHidden(node) {
        return this.hiddenNodeIds[node.id];
    }
    isActive(node) {
        return this.activeNodeIds[node.id];
    }
    isSelected(node) {
        return this.selectedLeafNodeIds[node.id];
    }
    ngOnDestroy() {
        this.dispose();
        this.unsubscribeAll();
    }
    dispose() {
        // Dispose reactions of the replaced nodes
        if (this.virtualRoot) {
            this.virtualRoot.dispose();
        }
    }
    unsubscribeAll() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
    }
    // actions
    setData({ nodes, options = null, events = null }) {
        if (options) {
            this.options = new TreeOptions(options);
        }
        if (events) {
            this.events = events;
        }
        if (nodes) {
            this.nodes = nodes;
        }
        this.update();
    }
    update() {
        // Rebuild tree:
        let virtualRootConfig = {
            id: this.options.rootId,
            virtual: true,
            [this.options.childrenField]: this.nodes
        };
        this.dispose();
        this.virtualRoot = new TreeNode(virtualRootConfig, null, this, 0);
        this.roots = this.virtualRoot.children;
        // Fire event:
        if (this.firstUpdate) {
            if (this.roots) {
                this.firstUpdate = false;
                this._calculateExpandedNodes();
            }
        }
        else {
            this.fireEvent({ eventName: TREE_EVENTS.updateData });
        }
    }
    setFocusedNode(node) {
        this.focusedNodeId = node ? node.id : null;
    }
    setFocus(value) {
        TreeModel.focusedTree = value ? this : null;
    }
    doForAll(fn) {
        this.roots.forEach((root) => root.doForAll(fn));
    }
    focusNextNode() {
        let previousNode = this.getFocusedNode();
        let nextNode = previousNode ? previousNode.findNextNode(true, true) : this.getFirstRoot(true);
        if (nextNode)
            nextNode.focus();
    }
    focusPreviousNode() {
        let previousNode = this.getFocusedNode();
        let nextNode = previousNode ? previousNode.findPreviousNode(true) : this.getLastRoot(true);
        if (nextNode)
            nextNode.focus();
    }
    focusDrillDown() {
        let previousNode = this.getFocusedNode();
        if (previousNode && previousNode.isCollapsed && previousNode.hasChildren) {
            previousNode.toggleExpanded();
        }
        else {
            let nextNode = previousNode ? previousNode.getFirstChild(true) : this.getFirstRoot(true);
            if (nextNode)
                nextNode.focus();
        }
    }
    focusDrillUp() {
        let previousNode = this.getFocusedNode();
        if (!previousNode)
            return;
        if (previousNode.isExpanded) {
            previousNode.toggleExpanded();
        }
        else {
            let nextNode = previousNode.realParent;
            if (nextNode)
                nextNode.focus();
        }
    }
    setActiveNode(node, value, multi = false) {
        if (multi) {
            this._setActiveNodeMulti(node, value);
        }
        else {
            this._setActiveNodeSingle(node, value);
        }
        if (value) {
            node.focus(this.options.scrollOnActivate);
            this.fireEvent({ eventName: TREE_EVENTS.activate, node });
            this.fireEvent({ eventName: TREE_EVENTS.nodeActivate, node }); // For IE11
        }
        else {
            this.fireEvent({ eventName: TREE_EVENTS.deactivate, node });
            this.fireEvent({ eventName: TREE_EVENTS.nodeDeactivate, node }); // For IE11
        }
    }
    setSelectedNode(node, value) {
        this.selectedLeafNodeIds = Object.assign({}, this.selectedLeafNodeIds, { [node.id]: value });
        if (value) {
            node.focus();
            this.fireEvent({ eventName: TREE_EVENTS.select, node });
        }
        else {
            this.fireEvent({ eventName: TREE_EVENTS.deselect, node });
        }
    }
    setExpandedNode(node, value) {
        this.expandedNodeIds = Object.assign({}, this.expandedNodeIds, { [node.id]: value });
        this.fireEvent({ eventName: TREE_EVENTS.toggleExpanded, node, isExpanded: value });
    }
    expandAll() {
        this.roots.forEach((root) => root.expandAll());
    }
    collapseAll() {
        this.roots.forEach((root) => root.collapseAll());
    }
    setIsHidden(node, value) {
        this.hiddenNodeIds = Object.assign({}, this.hiddenNodeIds, { [node.id]: value });
    }
    setHiddenNodeIds(nodeIds) {
        this.hiddenNodeIds = nodeIds.reduce((hiddenNodeIds, id) => Object.assign(hiddenNodeIds, {
            [id]: true
        }), {});
    }
    performKeyAction(node, $event) {
        const keyAction = this.options.actionMapping.keys[$event.keyCode];
        if (keyAction) {
            $event.preventDefault();
            keyAction(this, node, $event);
            return true;
        }
        else {
            return false;
        }
    }
    filterNodes(filter, autoShow = true) {
        let filterFn;
        if (!filter) {
            return this.clearFilter();
        }
        // support function and string filter
        if (filter && typeof filter.valueOf() === 'string') {
            filterFn = (node) => node.displayField.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        }
        else if (filter && typeof filter === 'function') {
            filterFn = filter;
        }
        else {
            console.error('Don\'t know what to do with filter', filter);
            console.error('Should be either a string or function');
            return;
        }
        const ids = {};
        this.roots.forEach((node) => this._filterNode(ids, node, filterFn, autoShow));
        this.hiddenNodeIds = ids;
        this.fireEvent({ eventName: TREE_EVENTS.changeFilter });
    }
    clearFilter() {
        this.hiddenNodeIds = {};
        this.fireEvent({ eventName: TREE_EVENTS.changeFilter });
    }
    moveNode(node, to) {
        const fromIndex = node.getIndexInParent();
        const fromParent = node.parent;
        if (!this.canMoveNode(node, to, fromIndex))
            return;
        const fromChildren = fromParent.getField('children');
        // If node doesn't have children - create children array
        if (!to.parent.getField('children')) {
            to.parent.setField('children', []);
        }
        const toChildren = to.parent.getField('children');
        const originalNode = fromChildren.splice(fromIndex, 1)[0];
        // Compensate for index if already removed from parent:
        let toIndex = (fromParent === to.parent && to.index > fromIndex) ? to.index - 1 : to.index;
        toChildren.splice(toIndex, 0, originalNode);
        fromParent.treeModel.update();
        if (to.parent.treeModel !== fromParent.treeModel) {
            to.parent.treeModel.update();
        }
        this.fireEvent({
            eventName: TREE_EVENTS.moveNode,
            node: originalNode,
            to: { parent: to.parent.data, index: toIndex },
            from: { parent: fromParent.data, index: fromIndex }
        });
    }
    copyNode(node, to) {
        const fromIndex = node.getIndexInParent();
        if (!this.canMoveNode(node, to, fromIndex))
            return;
        // If node doesn't have children - create children array
        if (!to.parent.getField('children')) {
            to.parent.setField('children', []);
        }
        const toChildren = to.parent.getField('children');
        const nodeCopy = this.options.getNodeClone(node);
        toChildren.splice(to.index, 0, nodeCopy);
        node.treeModel.update();
        if (to.parent.treeModel !== node.treeModel) {
            to.parent.treeModel.update();
        }
        this.fireEvent({ eventName: TREE_EVENTS.copyNode, node: nodeCopy, to: { parent: to.parent.data, index: to.index } });
    }
    getState() {
        return {
            expandedNodeIds: this.expandedNodeIds,
            selectedLeafNodeIds: this.selectedLeafNodeIds,
            activeNodeIds: this.activeNodeIds,
            hiddenNodeIds: this.hiddenNodeIds,
            focusedNodeId: this.focusedNodeId
        };
    }
    setState(state) {
        if (!state)
            return;
        Object.assign(this, {
            expandedNodeIds: state.expandedNodeIds || {},
            selectedLeafNodeIds: state.selectedLeafNodeIds || {},
            activeNodeIds: state.activeNodeIds || {},
            hiddenNodeIds: state.hiddenNodeIds || {},
            focusedNodeId: state.focusedNodeId
        });
    }
    subscribeToState(fn) {
        autorun(() => fn(this.getState()));
    }
    canMoveNode(node, to, fromIndex = undefined) {
        const fromNodeIndex = fromIndex || node.getIndexInParent();
        // same node:
        if (node.parent === to.parent && fromIndex === to.index) {
            return false;
        }
        return !to.parent.isDescendantOf(node);
    }
    calculateExpandedNodes() {
        this._calculateExpandedNodes();
    }
    // private methods
    _filterNode(ids, node, filterFn, autoShow) {
        // if node passes function then it's visible
        let isVisible = filterFn(node);
        if (node.children) {
            // if one of node's children passes filter then this node is also visible
            node.children.forEach((child) => {
                if (this._filterNode(ids, child, filterFn, autoShow)) {
                    isVisible = true;
                }
            });
        }
        // mark node as hidden
        if (!isVisible) {
            ids[node.id] = true;
        }
        // auto expand parents to make sure the filtered nodes are visible
        if (autoShow && isVisible) {
            node.ensureVisible();
        }
        return isVisible;
    }
    _calculateExpandedNodes(startNode = null) {
        startNode = startNode || this.virtualRoot;
        if (startNode.data[this.options.isExpandedField]) {
            this.expandedNodeIds = Object.assign({}, this.expandedNodeIds, { [startNode.id]: true });
        }
        if (startNode.children) {
            startNode.children.forEach((child) => this._calculateExpandedNodes(child));
        }
    }
    _setActiveNodeSingle(node, value) {
        // Deactivate all other nodes:
        this.activeNodes
            .filter((activeNode) => activeNode !== node)
            .forEach((activeNode) => {
            this.fireEvent({ eventName: TREE_EVENTS.deactivate, node: activeNode });
            this.fireEvent({ eventName: TREE_EVENTS.nodeDeactivate, node: activeNode }); // For IE11
        });
        if (value) {
            this.activeNodeIds = { [node.id]: true };
        }
        else {
            this.activeNodeIds = {};
        }
    }
    _setActiveNodeMulti(node, value) {
        this.activeNodeIds = Object.assign({}, this.activeNodeIds, { [node.id]: value });
    }
}
TreeModel.focusedTree = null;
/** @nocollapse */ TreeModel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeModel, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ TreeModel.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeModel });
__decorate([
    observable
], TreeModel.prototype, "roots", void 0);
__decorate([
    observable
], TreeModel.prototype, "expandedNodeIds", void 0);
__decorate([
    observable
], TreeModel.prototype, "selectedLeafNodeIds", void 0);
__decorate([
    observable
], TreeModel.prototype, "activeNodeIds", void 0);
__decorate([
    observable
], TreeModel.prototype, "hiddenNodeIds", void 0);
__decorate([
    observable
], TreeModel.prototype, "focusedNodeId", void 0);
__decorate([
    observable
], TreeModel.prototype, "virtualRoot", void 0);
__decorate([
    computed
], TreeModel.prototype, "focusedNode", null);
__decorate([
    computed
], TreeModel.prototype, "expandedNodes", null);
__decorate([
    computed
], TreeModel.prototype, "activeNodes", null);
__decorate([
    computed
], TreeModel.prototype, "hiddenNodes", null);
__decorate([
    computed
], TreeModel.prototype, "selectedLeafNodes", null);
__decorate([
    action
], TreeModel.prototype, "setData", null);
__decorate([
    action
], TreeModel.prototype, "update", null);
__decorate([
    action
], TreeModel.prototype, "setFocusedNode", null);
__decorate([
    action
], TreeModel.prototype, "setFocus", null);
__decorate([
    action
], TreeModel.prototype, "doForAll", null);
__decorate([
    action
], TreeModel.prototype, "focusNextNode", null);
__decorate([
    action
], TreeModel.prototype, "focusPreviousNode", null);
__decorate([
    action
], TreeModel.prototype, "focusDrillDown", null);
__decorate([
    action
], TreeModel.prototype, "focusDrillUp", null);
__decorate([
    action
], TreeModel.prototype, "setActiveNode", null);
__decorate([
    action
], TreeModel.prototype, "setSelectedNode", null);
__decorate([
    action
], TreeModel.prototype, "setExpandedNode", null);
__decorate([
    action
], TreeModel.prototype, "expandAll", null);
__decorate([
    action
], TreeModel.prototype, "collapseAll", null);
__decorate([
    action
], TreeModel.prototype, "setIsHidden", null);
__decorate([
    action
], TreeModel.prototype, "setHiddenNodeIds", null);
__decorate([
    action
], TreeModel.prototype, "filterNodes", null);
__decorate([
    action
], TreeModel.prototype, "clearFilter", null);
__decorate([
    action
], TreeModel.prototype, "moveNode", null);
__decorate([
    action
], TreeModel.prototype, "copyNode", null);
__decorate([
    action
], TreeModel.prototype, "setState", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeModel, decorators: [{
            type: Injectable
        }], propDecorators: { roots: [], expandedNodeIds: [], selectedLeafNodeIds: [], activeNodeIds: [], hiddenNodeIds: [], focusedNodeId: [], virtualRoot: [], focusedNode: [], expandedNodes: [], activeNodes: [], hiddenNodes: [], selectedLeafNodes: [], setData: [], update: [], setFocusedNode: [], setFocus: [], doForAll: [], focusNextNode: [], focusPreviousNode: [], focusDrillDown: [], focusDrillUp: [], setActiveNode: [], setSelectedNode: [], setExpandedNode: [], expandAll: [], collapseAll: [], setIsHidden: [], setHiddenNodeIds: [], filterNodes: [], clearFilter: [], moveNode: [], copyNode: [], setState: [] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItdHJlZS1jb21wb25lbnQvc3JjL2xpYi9tb2RlbHMvdHJlZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUduRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBR2xELE1BQU0sT0FBTyxTQUFTO0lBRHRCO1FBSUUsWUFBTyxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRXpDLGVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBSTFCLG9CQUFlLEdBQXFCLEVBQUUsQ0FBQztRQUN2Qyx3QkFBbUIsR0FBcUIsRUFBRSxDQUFDO1FBQzNDLGtCQUFhLEdBQXFCLEVBQUUsQ0FBQztRQUNyQyxrQkFBYSxHQUFxQixFQUFFLENBQUM7UUFDckMsa0JBQWEsR0FBVyxJQUFJLENBQUM7UUFHakMsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFFbkIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO0tBcWY1QztJQW5mQyxTQUFTO0lBQ1QsU0FBUyxDQUFDLEtBQUs7UUFDYixLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFL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TixjQUFjLE1BSWQsUUFBUSxNQUlSLFFBQVEsTUFJUixhQUFhLE1BTWIsaUJBQWlCLE1BTWpCLGNBQWMsTUFXZCxZQUFZLE1BWVosYUFBYSxNQWtCYixlQUFlLE1BV2YsZUFBZSxNQUtmLFNBQVMsTUFJVCxXQUFXLE1BSVgsV0FBVyxNQUlYLGdCQUFnQixNQWlCaEIsV0FBVyxNQTBCWCxXQUFXLE1BS1gsUUFBUSxNQWtDUixRQUFRLE1BaUNSLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgb2JzZXJ2YWJsZSwgY29tcHV0ZWQsIGFjdGlvbiwgYXV0b3J1biB9IGZyb20gJ21vYngnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuL3RyZWUtbm9kZS5tb2RlbCc7XHJcbmltcG9ydCB7IFRyZWVPcHRpb25zIH0gZnJvbSAnLi90cmVlLW9wdGlvbnMubW9kZWwnO1xyXG5pbXBvcnQgeyBUcmVlVmlydHVhbFNjcm9sbCB9IGZyb20gJy4vdHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbCc7XHJcbmltcG9ydCB7IElUcmVlTW9kZWwsIElEVHlwZSwgSURUeXBlRGljdGlvbmFyeSB9IGZyb20gJy4uL2RlZnMvYXBpJztcclxuaW1wb3J0IHsgVFJFRV9FVkVOVFMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRyZWVNb2RlbCBpbXBsZW1lbnRzIElUcmVlTW9kZWwsIE9uRGVzdHJveSB7XHJcbiAgc3RhdGljIGZvY3VzZWRUcmVlID0gbnVsbDtcclxuXHJcbiAgb3B0aW9uczogVHJlZU9wdGlvbnMgPSBuZXcgVHJlZU9wdGlvbnMoKTtcclxuICBub2RlczogYW55W107XHJcbiAgZXZlbnROYW1lcyA9IE9iamVjdC5rZXlzKFRSRUVfRVZFTlRTKTtcclxuICB2aXJ0dWFsU2Nyb2xsOiBUcmVlVmlydHVhbFNjcm9sbDtcclxuXHJcbiAgQG9ic2VydmFibGUgcm9vdHM6IFRyZWVOb2RlW107XHJcbiAgQG9ic2VydmFibGUgZXhwYW5kZWROb2RlSWRzOiBJRFR5cGVEaWN0aW9uYXJ5ID0ge307XHJcbiAgQG9ic2VydmFibGUgc2VsZWN0ZWRMZWFmTm9kZUlkczogSURUeXBlRGljdGlvbmFyeSA9IHt9O1xyXG4gIEBvYnNlcnZhYmxlIGFjdGl2ZU5vZGVJZHM6IElEVHlwZURpY3Rpb25hcnkgPSB7fTtcclxuICBAb2JzZXJ2YWJsZSBoaWRkZW5Ob2RlSWRzOiBJRFR5cGVEaWN0aW9uYXJ5ID0ge307XHJcbiAgQG9ic2VydmFibGUgZm9jdXNlZE5vZGVJZDogSURUeXBlID0gbnVsbDtcclxuICBAb2JzZXJ2YWJsZSB2aXJ0dWFsUm9vdDogVHJlZU5vZGU7XHJcblxyXG4gIHByaXZhdGUgZmlyc3RVcGRhdGUgPSB0cnVlO1xyXG4gIHByaXZhdGUgZXZlbnRzOiBhbnk7XHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICAvLyBldmVudHNcclxuICBmaXJlRXZlbnQoZXZlbnQpIHtcclxuICAgIGV2ZW50LnRyZWVNb2RlbCA9IHRoaXM7XHJcbiAgICB0aGlzLmV2ZW50c1tldmVudC5ldmVudE5hbWVdLmVtaXQoZXZlbnQpO1xyXG4gICAgdGhpcy5ldmVudHMuZXZlbnQuZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICBzdWJzY3JpYmUoZXZlbnROYW1lLCBmbikge1xyXG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXS5zdWJzY3JpYmUoZm4pO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcclxuICB9XHJcblxyXG5cclxuICAvLyBnZXR0ZXJzXHJcbiAgZ2V0Rm9jdXNlZE5vZGUoKTogVHJlZU5vZGUge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9jdXNlZE5vZGU7XHJcbiAgfVxyXG5cclxuXHJcbiAgZ2V0QWN0aXZlTm9kZSgpOiBUcmVlTm9kZSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVOb2Rlc1swXTtcclxuICB9XHJcblxyXG4gIGdldEFjdGl2ZU5vZGVzKCk6IFRyZWVOb2RlW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlTm9kZXM7XHJcbiAgfVxyXG5cclxuICBnZXRWaXNpYmxlUm9vdHMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy52aXJ0dWFsUm9vdC52aXNpYmxlQ2hpbGRyZW47XHJcbiAgfVxyXG5cclxuICBnZXRGaXJzdFJvb3Qoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCByb290ID0gc2tpcEhpZGRlbiA/IHRoaXMuZ2V0VmlzaWJsZVJvb3RzKCkgOiB0aGlzLnJvb3RzO1xyXG4gICAgcmV0dXJuIHJvb3QgIT0gbnVsbCAmJiByb290Lmxlbmd0aCA/IHJvb3RbMF0gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGFzdFJvb3Qoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCByb290ID0gc2tpcEhpZGRlbiA/IHRoaXMuZ2V0VmlzaWJsZVJvb3RzKCkgOiB0aGlzLnJvb3RzO1xyXG4gICAgcmV0dXJuIHJvb3QgIT0gbnVsbCAmJiByb290Lmxlbmd0aCA/IHJvb3Rbcm9vdC5sZW5ndGggLSAxXSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNGb2N1c2VkKCkge1xyXG4gICAgcmV0dXJuIFRyZWVNb2RlbC5mb2N1c2VkVHJlZSA9PT0gdGhpcztcclxuICB9XHJcblxyXG4gIGlzTm9kZUZvY3VzZWQobm9kZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9jdXNlZE5vZGUgPT09IG5vZGU7XHJcbiAgfVxyXG5cclxuICBpc0VtcHR5VHJlZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnJvb3RzICYmIHRoaXMucm9vdHMubGVuZ3RoID09PSAwO1xyXG4gIH1cclxuXHJcbiAgQGNvbXB1dGVkIGdldCBmb2N1c2VkTm9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmZvY3VzZWROb2RlSWQgPyB0aGlzLmdldE5vZGVCeUlkKHRoaXMuZm9jdXNlZE5vZGVJZCkgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgQGNvbXB1dGVkIGdldCBleHBhbmRlZE5vZGVzKCkge1xyXG4gICAgY29uc3Qgbm9kZXMgPSBPYmplY3Qua2V5cyh0aGlzLmV4cGFuZGVkTm9kZUlkcylcclxuICAgICAgLmZpbHRlcigoaWQpID0+IHRoaXMuZXhwYW5kZWROb2RlSWRzW2lkXSlcclxuICAgICAgLm1hcCgoaWQpID0+IHRoaXMuZ2V0Tm9kZUJ5SWQoaWQpKTtcclxuXHJcbiAgICByZXR1cm4gbm9kZXMuZmlsdGVyKEJvb2xlYW4pO1xyXG4gIH1cclxuXHJcbiAgQGNvbXB1dGVkIGdldCBhY3RpdmVOb2RlcygpIHtcclxuICAgIGNvbnN0IG5vZGVzID0gT2JqZWN0LmtleXModGhpcy5hY3RpdmVOb2RlSWRzKVxyXG4gICAgICAuZmlsdGVyKChpZCkgPT4gdGhpcy5hY3RpdmVOb2RlSWRzW2lkXSlcclxuICAgICAgLm1hcCgoaWQpID0+IHRoaXMuZ2V0Tm9kZUJ5SWQoaWQpKTtcclxuXHJcbiAgICByZXR1cm4gbm9kZXMuZmlsdGVyKEJvb2xlYW4pO1xyXG4gIH1cclxuXHJcbiAgQGNvbXB1dGVkIGdldCBoaWRkZW5Ob2RlcygpIHtcclxuICAgIGNvbnN0IG5vZGVzID0gT2JqZWN0LmtleXModGhpcy5oaWRkZW5Ob2RlSWRzKVxyXG4gICAgICAgIC5maWx0ZXIoKGlkKSA9PiB0aGlzLmhpZGRlbk5vZGVJZHNbaWRdKVxyXG4gICAgICAgIC5tYXAoKGlkKSA9PiB0aGlzLmdldE5vZGVCeUlkKGlkKSk7XHJcblxyXG4gICAgcmV0dXJuIG5vZGVzLmZpbHRlcihCb29sZWFuKTtcclxuICB9XHJcblxyXG4gIEBjb21wdXRlZCBnZXQgc2VsZWN0ZWRMZWFmTm9kZXMoKSB7XHJcbiAgICBjb25zdCBub2RlcyA9IE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0ZWRMZWFmTm9kZUlkcylcclxuICAgICAgICAuZmlsdGVyKChpZCkgPT4gdGhpcy5zZWxlY3RlZExlYWZOb2RlSWRzW2lkXSlcclxuICAgICAgICAubWFwKChpZCkgPT4gdGhpcy5nZXROb2RlQnlJZChpZCkpO1xyXG5cclxuICAgIHJldHVybiBub2Rlcy5maWx0ZXIoQm9vbGVhbik7XHJcbiAgfVxyXG5cclxuICAvLyBsb2NhdGluZyBub2Rlc1xyXG4gIGdldE5vZGVCeVBhdGgocGF0aDogYW55W10sIHN0YXJ0Tm9kZT0gbnVsbCk6IFRyZWVOb2RlIHtcclxuICAgIGlmICghcGF0aCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgc3RhcnROb2RlID0gc3RhcnROb2RlIHx8IHRoaXMudmlydHVhbFJvb3Q7XHJcbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHJldHVybiBzdGFydE5vZGU7XHJcblxyXG4gICAgaWYgKCFzdGFydE5vZGUuY2hpbGRyZW4pIHJldHVybiBudWxsO1xyXG5cclxuICAgIGNvbnN0IGNoaWxkSWQgPSBwYXRoLnNoaWZ0KCk7XHJcbiAgICBjb25zdCBjaGlsZE5vZGUgPSBzdGFydE5vZGUuY2hpbGRyZW4uZmluZChjID0+IGMuaWQgPT09IGNoaWxkSWQpO1xyXG5cclxuICAgIGlmICghY2hpbGROb2RlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5nZXROb2RlQnlQYXRoKHBhdGgsIGNoaWxkTm9kZSk7XHJcbiAgfVxyXG5cclxuICBnZXROb2RlQnlJZChpZCkge1xyXG4gICAgY29uc3QgaWRTdHIgPSBpZC50b1N0cmluZygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmdldE5vZGVCeSgobm9kZSkgPT4gbm9kZS5pZC50b1N0cmluZygpID09PSBpZFN0cik7XHJcbiAgfVxyXG5cclxuICBnZXROb2RlQnkocHJlZGljYXRlLCBzdGFydE5vZGUgPSBudWxsKSB7XHJcbiAgICBzdGFydE5vZGUgPSBzdGFydE5vZGUgfHwgdGhpcy52aXJ0dWFsUm9vdDtcclxuXHJcbiAgICBpZiAoIXN0YXJ0Tm9kZS5jaGlsZHJlbikgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgY29uc3QgZm91bmQgPSBzdGFydE5vZGUuY2hpbGRyZW4uZmluZChwcmVkaWNhdGUpO1xyXG5cclxuICAgIGlmIChmb3VuZCkgeyAvLyBmb3VuZCBpbiBjaGlsZHJlblxyXG4gICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICB9IGVsc2UgeyAvLyBsb29rIGluIGNoaWxkcmVuJ3MgY2hpbGRyZW5cclxuICAgICAgZm9yIChsZXQgY2hpbGQgb2Ygc3RhcnROb2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgY29uc3QgZm91bmRJbkNoaWxkcmVuID0gdGhpcy5nZXROb2RlQnkocHJlZGljYXRlLCBjaGlsZCk7XHJcbiAgICAgICAgaWYgKGZvdW5kSW5DaGlsZHJlbikgcmV0dXJuIGZvdW5kSW5DaGlsZHJlbjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNFeHBhbmRlZChub2RlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5leHBhbmRlZE5vZGVJZHNbbm9kZS5pZF07XHJcbiAgfVxyXG5cclxuICBpc0hpZGRlbihub2RlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oaWRkZW5Ob2RlSWRzW25vZGUuaWRdO1xyXG4gIH1cclxuXHJcbiAgaXNBY3RpdmUobm9kZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlTm9kZUlkc1tub2RlLmlkXTtcclxuICB9XHJcblxyXG4gIGlzU2VsZWN0ZWQobm9kZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRMZWFmTm9kZUlkc1tub2RlLmlkXTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlQWxsKCk7XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKCkge1xyXG4gICAgLy8gRGlzcG9zZSByZWFjdGlvbnMgb2YgdGhlIHJlcGxhY2VkIG5vZGVzXHJcbiAgICBpZiAodGhpcy52aXJ0dWFsUm9vdCkge1xyXG4gICAgICB0aGlzLnZpcnR1YWxSb290LmRpc3Bvc2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVuc3Vic2NyaWJlQWxsKCkge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3Vic2NyaXB0aW9uID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgLy8gYWN0aW9uc1xyXG4gIEBhY3Rpb24gc2V0RGF0YSh7IG5vZGVzLCBvcHRpb25zID0gbnVsbCwgZXZlbnRzID0gbnVsbCB9OiB7bm9kZXM6IGFueSwgb3B0aW9uczogYW55LCBldmVudHM6IGFueX0pIHtcclxuICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucyA9IG5ldyBUcmVlT3B0aW9ucyhvcHRpb25zKTtcclxuICAgIH1cclxuICAgIGlmIChldmVudHMpIHtcclxuICAgICAgdGhpcy5ldmVudHMgPSBldmVudHM7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZXMpIHtcclxuICAgICAgdGhpcy5ub2RlcyA9IG5vZGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHVwZGF0ZSgpIHtcclxuICAgIC8vIFJlYnVpbGQgdHJlZTpcclxuICAgIGxldCB2aXJ0dWFsUm9vdENvbmZpZyA9IHtcclxuICAgICAgaWQ6IHRoaXMub3B0aW9ucy5yb290SWQsXHJcbiAgICAgIHZpcnR1YWw6IHRydWUsXHJcbiAgICAgIFt0aGlzLm9wdGlvbnMuY2hpbGRyZW5GaWVsZF06IHRoaXMubm9kZXNcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5kaXNwb3NlKCk7XHJcblxyXG4gICAgdGhpcy52aXJ0dWFsUm9vdCA9IG5ldyBUcmVlTm9kZSh2aXJ0dWFsUm9vdENvbmZpZywgbnVsbCwgdGhpcywgMCk7XHJcblxyXG4gICAgdGhpcy5yb290cyA9IHRoaXMudmlydHVhbFJvb3QuY2hpbGRyZW47XHJcblxyXG4gICAgLy8gRmlyZSBldmVudDpcclxuICAgIGlmICh0aGlzLmZpcnN0VXBkYXRlKSB7XHJcbiAgICAgIGlmICh0aGlzLnJvb3RzKSB7XHJcbiAgICAgICAgdGhpcy5maXJzdFVwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZUV4cGFuZGVkTm9kZXMoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLnVwZGF0ZURhdGEgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgQGFjdGlvbiBzZXRGb2N1c2VkTm9kZShub2RlKSB7XHJcbiAgICB0aGlzLmZvY3VzZWROb2RlSWQgPSBub2RlID8gbm9kZS5pZCA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHNldEZvY3VzKHZhbHVlKSB7XHJcbiAgICBUcmVlTW9kZWwuZm9jdXNlZFRyZWUgPSB2YWx1ZSA/IHRoaXMgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgQGFjdGlvbiBkb0ZvckFsbChmbikge1xyXG4gICAgdGhpcy5yb290cy5mb3JFYWNoKChyb290KSA9PiByb290LmRvRm9yQWxsKGZuKSk7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIGZvY3VzTmV4dE5vZGUoKSB7XHJcbiAgICBsZXQgcHJldmlvdXNOb2RlID0gdGhpcy5nZXRGb2N1c2VkTm9kZSgpO1xyXG4gICAgbGV0IG5leHROb2RlID0gcHJldmlvdXNOb2RlID8gcHJldmlvdXNOb2RlLmZpbmROZXh0Tm9kZSh0cnVlLCB0cnVlKSA6IHRoaXMuZ2V0Rmlyc3RSb290KHRydWUpO1xyXG4gICAgaWYgKG5leHROb2RlKSBuZXh0Tm9kZS5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgQGFjdGlvbiBmb2N1c1ByZXZpb3VzTm9kZSgpIHtcclxuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLmdldEZvY3VzZWROb2RlKCk7XHJcbiAgICBsZXQgbmV4dE5vZGUgPSBwcmV2aW91c05vZGUgPyBwcmV2aW91c05vZGUuZmluZFByZXZpb3VzTm9kZSh0cnVlKSA6IHRoaXMuZ2V0TGFzdFJvb3QodHJ1ZSk7XHJcbiAgICBpZiAobmV4dE5vZGUpIG5leHROb2RlLmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIGZvY3VzRHJpbGxEb3duKCkge1xyXG4gICAgbGV0IHByZXZpb3VzTm9kZSA9IHRoaXMuZ2V0Rm9jdXNlZE5vZGUoKTtcclxuICAgIGlmIChwcmV2aW91c05vZGUgJiYgcHJldmlvdXNOb2RlLmlzQ29sbGFwc2VkICYmIHByZXZpb3VzTm9kZS5oYXNDaGlsZHJlbikge1xyXG4gICAgICBwcmV2aW91c05vZGUudG9nZ2xlRXhwYW5kZWQoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBsZXQgbmV4dE5vZGUgPSBwcmV2aW91c05vZGUgPyBwcmV2aW91c05vZGUuZ2V0Rmlyc3RDaGlsZCh0cnVlKSA6IHRoaXMuZ2V0Rmlyc3RSb290KHRydWUpO1xyXG4gICAgICBpZiAobmV4dE5vZGUpIG5leHROb2RlLmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIGZvY3VzRHJpbGxVcCgpIHtcclxuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLmdldEZvY3VzZWROb2RlKCk7XHJcbiAgICBpZiAoIXByZXZpb3VzTm9kZSkgcmV0dXJuO1xyXG4gICAgaWYgKHByZXZpb3VzTm9kZS5pc0V4cGFuZGVkKSB7XHJcbiAgICAgIHByZXZpb3VzTm9kZS50b2dnbGVFeHBhbmRlZCgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGxldCBuZXh0Tm9kZSA9IHByZXZpb3VzTm9kZS5yZWFsUGFyZW50O1xyXG4gICAgICBpZiAobmV4dE5vZGUpIG5leHROb2RlLmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHNldEFjdGl2ZU5vZGUobm9kZSwgdmFsdWUsIG11bHRpID0gZmFsc2UpIHtcclxuICAgIGlmIChtdWx0aSkge1xyXG4gICAgICB0aGlzLl9zZXRBY3RpdmVOb2RlTXVsdGkobm9kZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuX3NldEFjdGl2ZU5vZGVTaW5nbGUobm9kZSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICBub2RlLmZvY3VzKHRoaXMub3B0aW9ucy5zY3JvbGxPbkFjdGl2YXRlKTtcclxuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLmFjdGl2YXRlLCBub2RlIH0pO1xyXG4gICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMubm9kZUFjdGl2YXRlLCBub2RlIH0pOyAvLyBGb3IgSUUxMVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLmRlYWN0aXZhdGUsIG5vZGUgfSk7XHJcbiAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5ub2RlRGVhY3RpdmF0ZSwgbm9kZSB9KTsgLy8gRm9yIElFMTFcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBhY3Rpb24gc2V0U2VsZWN0ZWROb2RlKG5vZGUsIHZhbHVlKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkTGVhZk5vZGVJZHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnNlbGVjdGVkTGVhZk5vZGVJZHMsIHtbbm9kZS5pZF06IHZhbHVlfSk7XHJcblxyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIG5vZGUuZm9jdXMoKTtcclxuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLnNlbGVjdCwgbm9kZSB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5kZXNlbGVjdCwgbm9kZSB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBhY3Rpb24gc2V0RXhwYW5kZWROb2RlKG5vZGUsIHZhbHVlKSB7XHJcbiAgICB0aGlzLmV4cGFuZGVkTm9kZUlkcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZXhwYW5kZWROb2RlSWRzLCB7W25vZGUuaWRdOiB2YWx1ZX0pO1xyXG4gICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLnRvZ2dsZUV4cGFuZGVkLCBub2RlLCBpc0V4cGFuZGVkOiB2YWx1ZSB9KTtcclxuICB9XHJcblxyXG4gIEBhY3Rpb24gZXhwYW5kQWxsKCkge1xyXG4gICAgdGhpcy5yb290cy5mb3JFYWNoKChyb290KSA9PiByb290LmV4cGFuZEFsbCgpKTtcclxuICB9XHJcblxyXG4gIEBhY3Rpb24gY29sbGFwc2VBbGwoKSB7XHJcbiAgICB0aGlzLnJvb3RzLmZvckVhY2goKHJvb3QpID0+IHJvb3QuY29sbGFwc2VBbGwoKSk7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHNldElzSGlkZGVuKG5vZGUsIHZhbHVlKSB7XHJcbiAgICB0aGlzLmhpZGRlbk5vZGVJZHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmhpZGRlbk5vZGVJZHMsIHtbbm9kZS5pZF06IHZhbHVlfSk7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHNldEhpZGRlbk5vZGVJZHMobm9kZUlkcykge1xyXG4gICAgdGhpcy5oaWRkZW5Ob2RlSWRzID0gbm9kZUlkcy5yZWR1Y2UoKGhpZGRlbk5vZGVJZHMsIGlkKSA9PiBPYmplY3QuYXNzaWduKGhpZGRlbk5vZGVJZHMsIHtcclxuICAgICAgW2lkXTogdHJ1ZVxyXG4gICAgfSksIHt9KTtcclxuICB9XHJcblxyXG4gIHBlcmZvcm1LZXlBY3Rpb24obm9kZSwgJGV2ZW50KSB7XHJcbiAgICBjb25zdCBrZXlBY3Rpb24gPSB0aGlzLm9wdGlvbnMuYWN0aW9uTWFwcGluZy5rZXlzWyRldmVudC5rZXlDb2RlXTtcclxuICAgIGlmIChrZXlBY3Rpb24pIHtcclxuICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGtleUFjdGlvbih0aGlzLCBub2RlLCAkZXZlbnQpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBhY3Rpb24gZmlsdGVyTm9kZXMoZmlsdGVyLCBhdXRvU2hvdyA9IHRydWUpIHtcclxuICAgIGxldCBmaWx0ZXJGbjtcclxuXHJcbiAgICBpZiAoIWZpbHRlcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5jbGVhckZpbHRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN1cHBvcnQgZnVuY3Rpb24gYW5kIHN0cmluZyBmaWx0ZXJcclxuICAgIGlmIChmaWx0ZXIgJiYgdHlwZW9mIGZpbHRlci52YWx1ZU9mKCkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGZpbHRlckZuID0gKG5vZGUpID0+IG5vZGUuZGlzcGxheUZpZWxkLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIudG9Mb3dlckNhc2UoKSkgIT09IC0xO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZmlsdGVyICYmIHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgIGZpbHRlckZuID0gZmlsdGVyO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0RvblxcJ3Qga25vdyB3aGF0IHRvIGRvIHdpdGggZmlsdGVyJywgZmlsdGVyKTtcclxuICAgICAgY29uc29sZS5lcnJvcignU2hvdWxkIGJlIGVpdGhlciBhIHN0cmluZyBvciBmdW5jdGlvbicpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWRzID0ge307XHJcbiAgICB0aGlzLnJvb3RzLmZvckVhY2goKG5vZGUpID0+IHRoaXMuX2ZpbHRlck5vZGUoaWRzLCBub2RlLCBmaWx0ZXJGbiwgYXV0b1Nob3cpKTtcclxuICAgIHRoaXMuaGlkZGVuTm9kZUlkcyA9IGlkcztcclxuICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5jaGFuZ2VGaWx0ZXIgfSk7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIGNsZWFyRmlsdGVyKCkge1xyXG4gICAgdGhpcy5oaWRkZW5Ob2RlSWRzID0ge307XHJcbiAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMuY2hhbmdlRmlsdGVyIH0pO1xyXG4gIH1cclxuXHJcbiAgQGFjdGlvbiBtb3ZlTm9kZShub2RlLCB0bykge1xyXG4gICAgY29uc3QgZnJvbUluZGV4ID0gbm9kZS5nZXRJbmRleEluUGFyZW50KCk7XHJcbiAgICBjb25zdCBmcm9tUGFyZW50ID0gbm9kZS5wYXJlbnQ7XHJcblxyXG4gICAgaWYgKCF0aGlzLmNhbk1vdmVOb2RlKG5vZGUsIHRvLCBmcm9tSW5kZXgpKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgZnJvbUNoaWxkcmVuID0gZnJvbVBhcmVudC5nZXRGaWVsZCgnY2hpbGRyZW4nKTtcclxuXHJcbiAgICAvLyBJZiBub2RlIGRvZXNuJ3QgaGF2ZSBjaGlsZHJlbiAtIGNyZWF0ZSBjaGlsZHJlbiBhcnJheVxyXG4gICAgaWYgKCF0by5wYXJlbnQuZ2V0RmllbGQoJ2NoaWxkcmVuJykpIHtcclxuICAgICAgdG8ucGFyZW50LnNldEZpZWxkKCdjaGlsZHJlbicsIFtdKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRvQ2hpbGRyZW4gPSB0by5wYXJlbnQuZ2V0RmllbGQoJ2NoaWxkcmVuJyk7XHJcblxyXG4gICAgY29uc3Qgb3JpZ2luYWxOb2RlID0gZnJvbUNoaWxkcmVuLnNwbGljZShmcm9tSW5kZXgsIDEpWzBdO1xyXG5cclxuICAgIC8vIENvbXBlbnNhdGUgZm9yIGluZGV4IGlmIGFscmVhZHkgcmVtb3ZlZCBmcm9tIHBhcmVudDpcclxuICAgIGxldCB0b0luZGV4ID0gKGZyb21QYXJlbnQgPT09IHRvLnBhcmVudCAmJiB0by5pbmRleCA+IGZyb21JbmRleCkgPyB0by5pbmRleCAtIDEgOiB0by5pbmRleDtcclxuXHJcbiAgICB0b0NoaWxkcmVuLnNwbGljZSh0b0luZGV4LCAwLCBvcmlnaW5hbE5vZGUpO1xyXG5cclxuICAgIGZyb21QYXJlbnQudHJlZU1vZGVsLnVwZGF0ZSgpO1xyXG4gICAgaWYgKHRvLnBhcmVudC50cmVlTW9kZWwgIT09IGZyb21QYXJlbnQudHJlZU1vZGVsKSB7XHJcbiAgICAgIHRvLnBhcmVudC50cmVlTW9kZWwudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5maXJlRXZlbnQoe1xyXG4gICAgICBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm1vdmVOb2RlLFxyXG4gICAgICBub2RlOiBvcmlnaW5hbE5vZGUsXHJcbiAgICAgIHRvOiB7IHBhcmVudDogdG8ucGFyZW50LmRhdGEsIGluZGV4OiB0b0luZGV4IH0sXHJcbiAgICAgIGZyb206IHsgcGFyZW50OiBmcm9tUGFyZW50LmRhdGEsIGluZGV4OiBmcm9tSW5kZXh9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBhY3Rpb24gY29weU5vZGUobm9kZSwgdG8pIHtcclxuICAgIGNvbnN0IGZyb21JbmRleCA9IG5vZGUuZ2V0SW5kZXhJblBhcmVudCgpO1xyXG5cclxuICAgIGlmICghdGhpcy5jYW5Nb3ZlTm9kZShub2RlLCB0bywgZnJvbUluZGV4KSkgcmV0dXJuO1xyXG5cclxuICAgIC8vIElmIG5vZGUgZG9lc24ndCBoYXZlIGNoaWxkcmVuIC0gY3JlYXRlIGNoaWxkcmVuIGFycmF5XHJcbiAgICBpZiAoIXRvLnBhcmVudC5nZXRGaWVsZCgnY2hpbGRyZW4nKSkge1xyXG4gICAgICB0by5wYXJlbnQuc2V0RmllbGQoJ2NoaWxkcmVuJywgW10pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdG9DaGlsZHJlbiA9IHRvLnBhcmVudC5nZXRGaWVsZCgnY2hpbGRyZW4nKTtcclxuXHJcbiAgICBjb25zdCBub2RlQ29weSA9IHRoaXMub3B0aW9ucy5nZXROb2RlQ2xvbmUobm9kZSk7XHJcblxyXG4gICAgdG9DaGlsZHJlbi5zcGxpY2UodG8uaW5kZXgsIDAsIG5vZGVDb3B5KTtcclxuXHJcbiAgICBub2RlLnRyZWVNb2RlbC51cGRhdGUoKTtcclxuICAgIGlmICh0by5wYXJlbnQudHJlZU1vZGVsICE9PSBub2RlLnRyZWVNb2RlbCkge1xyXG4gICAgICB0by5wYXJlbnQudHJlZU1vZGVsLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5jb3B5Tm9kZSwgbm9kZTogbm9kZUNvcHksIHRvOiB7IHBhcmVudDogdG8ucGFyZW50LmRhdGEsIGluZGV4OiB0by5pbmRleCB9IH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBleHBhbmRlZE5vZGVJZHM6IHRoaXMuZXhwYW5kZWROb2RlSWRzLFxyXG4gICAgICBzZWxlY3RlZExlYWZOb2RlSWRzOiB0aGlzLnNlbGVjdGVkTGVhZk5vZGVJZHMsXHJcbiAgICAgIGFjdGl2ZU5vZGVJZHM6IHRoaXMuYWN0aXZlTm9kZUlkcyxcclxuICAgICAgaGlkZGVuTm9kZUlkczogdGhpcy5oaWRkZW5Ob2RlSWRzLFxyXG4gICAgICBmb2N1c2VkTm9kZUlkOiB0aGlzLmZvY3VzZWROb2RlSWRcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHNldFN0YXRlKHN0YXRlKSB7XHJcbiAgICBpZiAoIXN0YXRlKSByZXR1cm47XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XHJcbiAgICAgIGV4cGFuZGVkTm9kZUlkczogc3RhdGUuZXhwYW5kZWROb2RlSWRzIHx8IHt9LFxyXG4gICAgICBzZWxlY3RlZExlYWZOb2RlSWRzOiBzdGF0ZS5zZWxlY3RlZExlYWZOb2RlSWRzIHx8IHt9LFxyXG4gICAgICBhY3RpdmVOb2RlSWRzOiBzdGF0ZS5hY3RpdmVOb2RlSWRzIHx8IHt9LFxyXG4gICAgICBoaWRkZW5Ob2RlSWRzOiBzdGF0ZS5oaWRkZW5Ob2RlSWRzIHx8IHt9LFxyXG4gICAgICBmb2N1c2VkTm9kZUlkOiBzdGF0ZS5mb2N1c2VkTm9kZUlkXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN1YnNjcmliZVRvU3RhdGUoZm4pIHtcclxuICAgIGF1dG9ydW4oKCkgPT4gZm4odGhpcy5nZXRTdGF0ZSgpKSk7XHJcbiAgfVxyXG5cclxuICBjYW5Nb3ZlTm9kZShub2RlLCB0bywgZnJvbUluZGV4ID0gdW5kZWZpbmVkKSB7XHJcbiAgICBjb25zdCBmcm9tTm9kZUluZGV4ID0gZnJvbUluZGV4IHx8IG5vZGUuZ2V0SW5kZXhJblBhcmVudCgpO1xyXG5cclxuICAgIC8vIHNhbWUgbm9kZTpcclxuICAgIGlmIChub2RlLnBhcmVudCA9PT0gdG8ucGFyZW50ICYmIGZyb21JbmRleCA9PT0gdG8uaW5kZXgpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAhdG8ucGFyZW50LmlzRGVzY2VuZGFudE9mKG5vZGUpO1xyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlRXhwYW5kZWROb2RlcygpIHtcclxuICAgICAgdGhpcy5fY2FsY3VsYXRlRXhwYW5kZWROb2RlcygpO1xyXG4gIH1cclxuXHJcbiAgLy8gcHJpdmF0ZSBtZXRob2RzXHJcbiAgcHJpdmF0ZSBfZmlsdGVyTm9kZShpZHMsIG5vZGUsIGZpbHRlckZuLCBhdXRvU2hvdykge1xyXG4gICAgLy8gaWYgbm9kZSBwYXNzZXMgZnVuY3Rpb24gdGhlbiBpdCdzIHZpc2libGVcclxuICAgIGxldCBpc1Zpc2libGUgPSBmaWx0ZXJGbihub2RlKTtcclxuXHJcbiAgICBpZiAobm9kZS5jaGlsZHJlbikge1xyXG4gICAgICAvLyBpZiBvbmUgb2Ygbm9kZSdzIGNoaWxkcmVuIHBhc3NlcyBmaWx0ZXIgdGhlbiB0aGlzIG5vZGUgaXMgYWxzbyB2aXNpYmxlXHJcbiAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5fZmlsdGVyTm9kZShpZHMsIGNoaWxkLCBmaWx0ZXJGbiwgYXV0b1Nob3cpKSB7XHJcbiAgICAgICAgICBpc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWFyayBub2RlIGFzIGhpZGRlblxyXG4gICAgaWYgKCFpc1Zpc2libGUpIHtcclxuICAgICAgaWRzW25vZGUuaWRdID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8vIGF1dG8gZXhwYW5kIHBhcmVudHMgdG8gbWFrZSBzdXJlIHRoZSBmaWx0ZXJlZCBub2RlcyBhcmUgdmlzaWJsZVxyXG4gICAgaWYgKGF1dG9TaG93ICYmIGlzVmlzaWJsZSkge1xyXG4gICAgICBub2RlLmVuc3VyZVZpc2libGUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBpc1Zpc2libGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jYWxjdWxhdGVFeHBhbmRlZE5vZGVzKHN0YXJ0Tm9kZSA9IG51bGwpIHtcclxuICAgIHN0YXJ0Tm9kZSA9IHN0YXJ0Tm9kZSB8fCB0aGlzLnZpcnR1YWxSb290O1xyXG5cclxuICAgIGlmIChzdGFydE5vZGUuZGF0YVt0aGlzLm9wdGlvbnMuaXNFeHBhbmRlZEZpZWxkXSkge1xyXG4gICAgICB0aGlzLmV4cGFuZGVkTm9kZUlkcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZXhwYW5kZWROb2RlSWRzLCB7W3N0YXJ0Tm9kZS5pZF06IHRydWV9KTtcclxuICAgIH1cclxuICAgIGlmIChzdGFydE5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgc3RhcnROb2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB0aGlzLl9jYWxjdWxhdGVFeHBhbmRlZE5vZGVzKGNoaWxkKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZXRBY3RpdmVOb2RlU2luZ2xlKG5vZGUsIHZhbHVlKSB7XHJcbiAgICAvLyBEZWFjdGl2YXRlIGFsbCBvdGhlciBub2RlczpcclxuICAgIHRoaXMuYWN0aXZlTm9kZXNcclxuICAgICAgLmZpbHRlcigoYWN0aXZlTm9kZSkgPT4gYWN0aXZlTm9kZSAhPT0gbm9kZSlcclxuICAgICAgLmZvckVhY2goKGFjdGl2ZU5vZGUpID0+IHtcclxuICAgICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMuZGVhY3RpdmF0ZSwgbm9kZTogYWN0aXZlTm9kZSB9KTtcclxuICAgICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMubm9kZURlYWN0aXZhdGUsIG5vZGU6IGFjdGl2ZU5vZGUgfSk7IC8vIEZvciBJRTExXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLmFjdGl2ZU5vZGVJZHMgPSB7W25vZGUuaWRdOiB0cnVlfTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmFjdGl2ZU5vZGVJZHMgPSB7fTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NldEFjdGl2ZU5vZGVNdWx0aShub2RlLCB2YWx1ZSkge1xyXG4gICAgdGhpcy5hY3RpdmVOb2RlSWRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hY3RpdmVOb2RlSWRzLCB7W25vZGUuaWRdOiB2YWx1ZX0pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19