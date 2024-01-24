var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { observable, computed, action, autorun, reaction } from 'mobx';
import { TREE_EVENTS } from '../constants/events';
import * as i0 from "@angular/core";
import * as i1 from "./tree.model";
const Y_OFFSET = 500; // Extra pixels outside the viewport, in each direction, to render nodes in
const Y_EPSILON = 150; // Minimum pixel change required to recalculate the rendered nodes
export class TreeVirtualScroll {
    constructor(treeModel) {
        this.treeModel = treeModel;
        this.yBlocks = 0;
        this.x = 0;
        this.viewportHeight = null;
        this.viewport = null;
        treeModel.virtualScroll = this;
        this._dispose = [autorun(() => this.fixScroll())];
    }
    get y() {
        return this.yBlocks * Y_EPSILON;
    }
    get totalHeight() {
        return this.treeModel.virtualRoot ? this.treeModel.virtualRoot.height : 0;
    }
    fireEvent(event) {
        this.treeModel.fireEvent(event);
    }
    init() {
        const fn = this.recalcPositions.bind(this);
        fn();
        this._dispose = [
            ...this._dispose,
            reaction(() => this.treeModel.roots, fn),
            reaction(() => this.treeModel.expandedNodeIds, fn),
            reaction(() => this.treeModel.hiddenNodeIds, fn)
        ];
        this.treeModel.subscribe(TREE_EVENTS.loadNodeChildren, fn);
    }
    isEnabled() {
        return this.treeModel.options.useVirtualScroll;
    }
    _setYBlocks(value) {
        this.yBlocks = value;
    }
    recalcPositions() {
        this.treeModel.virtualRoot.height = this._getPositionAfter(this.treeModel.getVisibleRoots(), 0);
    }
    _getPositionAfter(nodes, startPos) {
        let position = startPos;
        nodes.forEach((node) => {
            node.position = position;
            position = this._getPositionAfterNode(node, position);
        });
        return position;
    }
    _getPositionAfterNode(node, startPos) {
        let position = node.getSelfHeight() + startPos;
        if (node.children && node.isExpanded) { // TBD: consider loading component as well
            position = this._getPositionAfter(node.visibleChildren, position);
        }
        node.height = position - startPos;
        return position;
    }
    clear() {
        this._dispose.forEach((d) => d());
    }
    setViewport(viewport) {
        Object.assign(this, {
            viewport,
            x: viewport.scrollLeft,
            yBlocks: Math.round(viewport.scrollTop / Y_EPSILON),
            viewportHeight: viewport.getBoundingClientRect ? viewport.getBoundingClientRect().height : 0
        });
    }
    scrollIntoView(node, force, scrollToMiddle = true) {
        if (node.options.scrollContainer) {
            const scrollContainer = node.options.scrollContainer;
            const scrollContainerHeight = scrollContainer.getBoundingClientRect().height;
            const scrollContainerTop = scrollContainer.getBoundingClientRect().top;
            const nodeTop = this.viewport.getBoundingClientRect().top + node.position - scrollContainerTop;
            if (force || // force scroll to node
                nodeTop < scrollContainer.scrollTop || // node is above scroll container
                nodeTop + node.getSelfHeight() > scrollContainer.scrollTop + scrollContainerHeight) { // node is below container
                scrollContainer.scrollTop = scrollToMiddle ?
                    nodeTop - scrollContainerHeight / 2 : // scroll to middle
                    nodeTop; // scroll to start
            }
        }
        else {
            if (force || // force scroll to node
                node.position < this.y || // node is above viewport
                node.position + node.getSelfHeight() > this.y + this.viewportHeight) { // node is below viewport
                if (this.viewport) {
                    this.viewport.scrollTop = scrollToMiddle ?
                        node.position - this.viewportHeight / 2 : // scroll to middle
                        node.position; // scroll to start
                    this._setYBlocks(Math.floor(this.viewport.scrollTop / Y_EPSILON));
                }
            }
        }
    }
    getViewportNodes(nodes) {
        if (!nodes)
            return [];
        const visibleNodes = nodes.filter((node) => !node.isHidden);
        if (!this.isEnabled())
            return visibleNodes;
        if (!this.viewportHeight || !visibleNodes.length)
            return [];
        // When loading children async this method is called before their height and position is calculated.
        // In that case firstIndex === 0 and lastIndex === visibleNodes.length - 1 (e.g. 1000),
        // which means that it loops through every visibleNodes item and push them into viewportNodes array.
        // We can prevent nodes from being pushed to the array and wait for the appropriate calculations to take place
        const lastVisibleNode = visibleNodes.slice(-1)[0];
        if (!lastVisibleNode.height && lastVisibleNode.position === 0)
            return [];
        // Search for first node in the viewport using binary search
        // Look for first node that starts after the beginning of the viewport (with buffer)
        // Or that ends after the beginning of the viewport
        const firstIndex = binarySearch(visibleNodes, (node) => {
            return (node.position + Y_OFFSET > this.y) ||
                (node.position + node.height > this.y);
        });
        // Search for last node in the viewport using binary search
        // Look for first node that starts after the end of the viewport (with buffer)
        const lastIndex = binarySearch(visibleNodes, (node) => {
            return node.position - Y_OFFSET > this.y + this.viewportHeight;
        }, firstIndex);
        const viewportNodes = [];
        for (let i = firstIndex; i <= lastIndex; i++) {
            viewportNodes.push(visibleNodes[i]);
        }
        return viewportNodes;
    }
    fixScroll() {
        const maxY = Math.max(0, this.totalHeight - this.viewportHeight);
        if (this.y < 0)
            this._setYBlocks(0);
        if (this.y > maxY)
            this._setYBlocks(maxY / Y_EPSILON);
    }
}
/** @nocollapse */ TreeVirtualScroll.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeVirtualScroll, deps: [{ token: i1.TreeModel }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ TreeVirtualScroll.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeVirtualScroll });
__decorate([
    observable
], TreeVirtualScroll.prototype, "yBlocks", void 0);
__decorate([
    observable
], TreeVirtualScroll.prototype, "x", void 0);
__decorate([
    observable
], TreeVirtualScroll.prototype, "viewportHeight", void 0);
__decorate([
    computed
], TreeVirtualScroll.prototype, "y", null);
__decorate([
    computed
], TreeVirtualScroll.prototype, "totalHeight", null);
__decorate([
    action
], TreeVirtualScroll.prototype, "_setYBlocks", null);
__decorate([
    action
], TreeVirtualScroll.prototype, "recalcPositions", null);
__decorate([
    action
], TreeVirtualScroll.prototype, "setViewport", null);
__decorate([
    action
], TreeVirtualScroll.prototype, "scrollIntoView", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeVirtualScroll, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.TreeModel }]; }, propDecorators: { yBlocks: [], x: [], viewportHeight: [], y: [], totalHeight: [], _setYBlocks: [], recalcPositions: [], setViewport: [], scrollIntoView: [] } });
function binarySearch(nodes, condition, firstIndex = 0) {
    let index = firstIndex;
    let toIndex = nodes.length - 1;
    while (index !== toIndex) {
        let midIndex = Math.floor((index + toIndex) / 2);
        if (condition(nodes[midIndex])) {
            toIndex = midIndex;
        }
        else {
            if (index === midIndex)
                index = toIndex;
            else
                index = midIndex;
        }
    }
    return index;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItdHJlZS1jb21wb25lbnQvc3JjL2xpYi9tb2RlbHMvdHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBRWxELE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLDJFQUEyRTtBQUNqRyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxrRUFBa0U7QUFHekYsTUFBTSxPQUFPLGlCQUFpQjtJQWdCNUIsWUFBb0IsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQWI1QixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osTUFBQyxHQUFHLENBQUMsQ0FBQztRQUNOLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFXZCxTQUFTLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztRQVhhLENBQUM7UUFDYixPQUFPLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO0lBQ2xDLENBQUM7UUFFYSxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENB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QUFVO3lEQUF1Qjs7SUFHakMsUUFBUTswQ0FFUjs7SUFFQSxRQUFRO29EQUVSOztJQTRCQSxNQUFNO29EQUVOOztJQUVBLE1BQU07d0RBRU47O0lBMkJBLE1BQU07b0RBT047O0lBRUEsTUFBTTt1REEyQk47MkZBL0dVLGlCQUFpQjtrQkFEN0IsVUFBVTtnR0FJRyxPQUFPLE1BQ1AsQ0FBQyxNQUNELGNBQWMsTUFHWixDQUFDLE1BSUQsV0FBVyxNQThCVCxXQUFXLE1BSW5CLGVBQWUsTUE2QmYsV0FBVyxNQVNYLGNBQWM7QUE0RXhCLFNBQVMsWUFBWSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxHQUFHLENBQUM7SUFDcEQsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDO0lBQ3ZCLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBRS9CLE9BQU8sS0FBSyxLQUFLLE9BQU8sRUFBRTtRQUN4QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWpELElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFO1lBQzlCLE9BQU8sR0FBRyxRQUFRLENBQUM7U0FDcEI7YUFDSTtZQUNILElBQUksS0FBSyxLQUFLLFFBQVE7Z0JBQUUsS0FBSyxHQUFHLE9BQU8sQ0FBQzs7Z0JBQ25DLEtBQUssR0FBRyxRQUFRLENBQUM7U0FDdkI7S0FDRjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgb2JzZXJ2YWJsZSwgY29tcHV0ZWQsIGFjdGlvbiwgYXV0b3J1biwgcmVhY3Rpb24gfSBmcm9tICdtb2J4JztcclxuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi90cmVlLm1vZGVsJztcclxuaW1wb3J0IHsgVFJFRV9FVkVOVFMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzJztcclxuXHJcbmNvbnN0IFlfT0ZGU0VUID0gNTAwOyAvLyBFeHRyYSBwaXhlbHMgb3V0c2lkZSB0aGUgdmlld3BvcnQsIGluIGVhY2ggZGlyZWN0aW9uLCB0byByZW5kZXIgbm9kZXMgaW5cclxuY29uc3QgWV9FUFNJTE9OID0gMTUwOyAvLyBNaW5pbXVtIHBpeGVsIGNoYW5nZSByZXF1aXJlZCB0byByZWNhbGN1bGF0ZSB0aGUgcmVuZGVyZWQgbm9kZXNcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRyZWVWaXJ0dWFsU2Nyb2xsIHtcclxuICBwcml2YXRlIF9kaXNwb3NlOiBhbnk7XHJcblxyXG4gIEBvYnNlcnZhYmxlIHlCbG9ja3MgPSAwO1xyXG4gIEBvYnNlcnZhYmxlIHggPSAwO1xyXG4gIEBvYnNlcnZhYmxlIHZpZXdwb3J0SGVpZ2h0ID0gbnVsbDtcclxuICB2aWV3cG9ydCA9IG51bGw7XHJcblxyXG4gIEBjb21wdXRlZCBnZXQgeSgpIHtcclxuICAgIHJldHVybiB0aGlzLnlCbG9ja3MgKiBZX0VQU0lMT047XHJcbiAgfVxyXG5cclxuICBAY29tcHV0ZWQgZ2V0IHRvdGFsSGVpZ2h0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudHJlZU1vZGVsLnZpcnR1YWxSb290ID8gdGhpcy50cmVlTW9kZWwudmlydHVhbFJvb3QuaGVpZ2h0IDogMDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJlZU1vZGVsOiBUcmVlTW9kZWwpIHtcclxuICAgIHRyZWVNb2RlbC52aXJ0dWFsU2Nyb2xsID0gdGhpcztcclxuICAgIHRoaXMuX2Rpc3Bvc2UgPSBbYXV0b3J1bigoKSA9PiB0aGlzLmZpeFNjcm9sbCgpKV07XHJcbiAgfVxyXG5cclxuICBmaXJlRXZlbnQoZXZlbnQpIHtcclxuICAgIHRoaXMudHJlZU1vZGVsLmZpcmVFdmVudChldmVudCk7XHJcbiAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgY29uc3QgZm4gPSB0aGlzLnJlY2FsY1Bvc2l0aW9ucy5iaW5kKHRoaXMpO1xyXG5cclxuICAgIGZuKCk7XHJcbiAgICB0aGlzLl9kaXNwb3NlID0gW1xyXG4gICAgICAuLi50aGlzLl9kaXNwb3NlLFxyXG4gICAgICByZWFjdGlvbigoKSA9PiB0aGlzLnRyZWVNb2RlbC5yb290cywgZm4pLFxyXG4gICAgICByZWFjdGlvbigoKSA9PiB0aGlzLnRyZWVNb2RlbC5leHBhbmRlZE5vZGVJZHMsIGZuKSxcclxuICAgICAgcmVhY3Rpb24oKCkgPT4gdGhpcy50cmVlTW9kZWwuaGlkZGVuTm9kZUlkcywgZm4pXHJcbiAgICBdO1xyXG4gICAgdGhpcy50cmVlTW9kZWwuc3Vic2NyaWJlKFRSRUVfRVZFTlRTLmxvYWROb2RlQ2hpbGRyZW4sIGZuKTtcclxuICB9XHJcblxyXG4gIGlzRW5hYmxlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLnRyZWVNb2RlbC5vcHRpb25zLnVzZVZpcnR1YWxTY3JvbGw7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHByaXZhdGUgX3NldFlCbG9ja3ModmFsdWUpIHtcclxuICAgIHRoaXMueUJsb2NrcyA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgQGFjdGlvbiByZWNhbGNQb3NpdGlvbnMoKSB7XHJcbiAgICB0aGlzLnRyZWVNb2RlbC52aXJ0dWFsUm9vdC5oZWlnaHQgPSB0aGlzLl9nZXRQb3NpdGlvbkFmdGVyKHRoaXMudHJlZU1vZGVsLmdldFZpc2libGVSb290cygpLCAwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldFBvc2l0aW9uQWZ0ZXIobm9kZXMsIHN0YXJ0UG9zKSB7XHJcbiAgICBsZXQgcG9zaXRpb24gPSBzdGFydFBvcztcclxuXHJcbiAgICBub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgIG5vZGUucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgcG9zaXRpb24gPSB0aGlzLl9nZXRQb3NpdGlvbkFmdGVyTm9kZShub2RlLCBwb3NpdGlvbik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBwb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldFBvc2l0aW9uQWZ0ZXJOb2RlKG5vZGUsIHN0YXJ0UG9zKSB7XHJcbiAgICBsZXQgcG9zaXRpb24gPSBub2RlLmdldFNlbGZIZWlnaHQoKSArIHN0YXJ0UG9zO1xyXG5cclxuICAgIGlmIChub2RlLmNoaWxkcmVuICYmIG5vZGUuaXNFeHBhbmRlZCkgeyAvLyBUQkQ6IGNvbnNpZGVyIGxvYWRpbmcgY29tcG9uZW50IGFzIHdlbGxcclxuICAgICAgcG9zaXRpb24gPSB0aGlzLl9nZXRQb3NpdGlvbkFmdGVyKG5vZGUudmlzaWJsZUNoaWxkcmVuLCBwb3NpdGlvbik7XHJcbiAgICB9XHJcbiAgICBub2RlLmhlaWdodCA9IHBvc2l0aW9uIC0gc3RhcnRQb3M7XHJcbiAgICByZXR1cm4gcG9zaXRpb247XHJcbiAgfVxyXG5cclxuXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLl9kaXNwb3NlLmZvckVhY2goKGQpID0+IGQoKSk7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHNldFZpZXdwb3J0KHZpZXdwb3J0KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHtcclxuICAgICAgdmlld3BvcnQsXHJcbiAgICAgIHg6IHZpZXdwb3J0LnNjcm9sbExlZnQsXHJcbiAgICAgIHlCbG9ja3M6IE1hdGgucm91bmQodmlld3BvcnQuc2Nyb2xsVG9wIC8gWV9FUFNJTE9OKSxcclxuICAgICAgdmlld3BvcnRIZWlnaHQ6IHZpZXdwb3J0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCA/IHZpZXdwb3J0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCA6IDBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQGFjdGlvbiBzY3JvbGxJbnRvVmlldyhub2RlLCBmb3JjZSwgc2Nyb2xsVG9NaWRkbGUgPSB0cnVlKSB7XHJcbiAgICBpZiAobm9kZS5vcHRpb25zLnNjcm9sbENvbnRhaW5lcikge1xyXG4gICAgICBjb25zdCBzY3JvbGxDb250YWluZXIgPSBub2RlLm9wdGlvbnMuc2Nyb2xsQ29udGFpbmVyO1xyXG4gICAgICBjb25zdCBzY3JvbGxDb250YWluZXJIZWlnaHQgPSBzY3JvbGxDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG4gICAgICBjb25zdCBzY3JvbGxDb250YWluZXJUb3AgPSBzY3JvbGxDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG4gICAgICBjb25zdCBub2RlVG9wID0gdGhpcy52aWV3cG9ydC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBub2RlLnBvc2l0aW9uIC0gc2Nyb2xsQ29udGFpbmVyVG9wO1xyXG5cclxuICAgICAgaWYgKGZvcmNlIHx8IC8vIGZvcmNlIHNjcm9sbCB0byBub2RlXHJcbiAgICAgICAgbm9kZVRvcCA8IHNjcm9sbENvbnRhaW5lci5zY3JvbGxUb3AgfHwgLy8gbm9kZSBpcyBhYm92ZSBzY3JvbGwgY29udGFpbmVyXHJcbiAgICAgICAgbm9kZVRvcCArIG5vZGUuZ2V0U2VsZkhlaWdodCgpID4gc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcCArIHNjcm9sbENvbnRhaW5lckhlaWdodCkgeyAvLyBub2RlIGlzIGJlbG93IGNvbnRhaW5lclxyXG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zY3JvbGxUb3AgPSBzY3JvbGxUb01pZGRsZSA/XHJcbiAgICAgICAgICBub2RlVG9wIC0gc2Nyb2xsQ29udGFpbmVySGVpZ2h0IC8gMiA6IC8vIHNjcm9sbCB0byBtaWRkbGVcclxuICAgICAgICAgIG5vZGVUb3A7IC8vIHNjcm9sbCB0byBzdGFydFxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoZm9yY2UgfHwgLy8gZm9yY2Ugc2Nyb2xsIHRvIG5vZGVcclxuICAgICAgICBub2RlLnBvc2l0aW9uIDwgdGhpcy55IHx8IC8vIG5vZGUgaXMgYWJvdmUgdmlld3BvcnRcclxuICAgICAgICBub2RlLnBvc2l0aW9uICsgbm9kZS5nZXRTZWxmSGVpZ2h0KCkgPiB0aGlzLnkgKyB0aGlzLnZpZXdwb3J0SGVpZ2h0KSB7IC8vIG5vZGUgaXMgYmVsb3cgdmlld3BvcnRcclxuICAgICAgICBpZiAodGhpcy52aWV3cG9ydCkge1xyXG4gICAgICAgICAgdGhpcy52aWV3cG9ydC5zY3JvbGxUb3AgPSBzY3JvbGxUb01pZGRsZSA/XHJcbiAgICAgICAgICBub2RlLnBvc2l0aW9uIC0gdGhpcy52aWV3cG9ydEhlaWdodCAvIDIgOiAvLyBzY3JvbGwgdG8gbWlkZGxlXHJcbiAgICAgICAgICBub2RlLnBvc2l0aW9uOyAvLyBzY3JvbGwgdG8gc3RhcnRcclxuXHJcbiAgICAgICAgICB0aGlzLl9zZXRZQmxvY2tzKE1hdGguZmxvb3IodGhpcy52aWV3cG9ydC5zY3JvbGxUb3AgLyBZX0VQU0lMT04pKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFZpZXdwb3J0Tm9kZXMobm9kZXMpIHtcclxuICAgIGlmICghbm9kZXMpIHJldHVybiBbXTtcclxuXHJcbiAgICBjb25zdCB2aXNpYmxlTm9kZXMgPSBub2Rlcy5maWx0ZXIoKG5vZGUpID0+ICFub2RlLmlzSGlkZGVuKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuaXNFbmFibGVkKCkpIHJldHVybiB2aXNpYmxlTm9kZXM7XHJcblxyXG4gICAgaWYgKCF0aGlzLnZpZXdwb3J0SGVpZ2h0IHx8ICF2aXNpYmxlTm9kZXMubGVuZ3RoKSByZXR1cm4gW107XHJcblxyXG4gICAgLy8gV2hlbiBsb2FkaW5nIGNoaWxkcmVuIGFzeW5jIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCBiZWZvcmUgdGhlaXIgaGVpZ2h0IGFuZCBwb3NpdGlvbiBpcyBjYWxjdWxhdGVkLlxyXG4gICAgLy8gSW4gdGhhdCBjYXNlIGZpcnN0SW5kZXggPT09IDAgYW5kIGxhc3RJbmRleCA9PT0gdmlzaWJsZU5vZGVzLmxlbmd0aCAtIDEgKGUuZy4gMTAwMCksXHJcbiAgICAvLyB3aGljaCBtZWFucyB0aGF0IGl0IGxvb3BzIHRocm91Z2ggZXZlcnkgdmlzaWJsZU5vZGVzIGl0ZW0gYW5kIHB1c2ggdGhlbSBpbnRvIHZpZXdwb3J0Tm9kZXMgYXJyYXkuXHJcbiAgICAvLyBXZSBjYW4gcHJldmVudCBub2RlcyBmcm9tIGJlaW5nIHB1c2hlZCB0byB0aGUgYXJyYXkgYW5kIHdhaXQgZm9yIHRoZSBhcHByb3ByaWF0ZSBjYWxjdWxhdGlvbnMgdG8gdGFrZSBwbGFjZVxyXG4gICAgY29uc3QgbGFzdFZpc2libGVOb2RlID0gdmlzaWJsZU5vZGVzLnNsaWNlKC0xKVswXVxyXG4gICAgaWYgKCFsYXN0VmlzaWJsZU5vZGUuaGVpZ2h0ICYmIGxhc3RWaXNpYmxlTm9kZS5wb3NpdGlvbiA9PT0gMCkgcmV0dXJuIFtdO1xyXG5cclxuICAgIC8vIFNlYXJjaCBmb3IgZmlyc3Qgbm9kZSBpbiB0aGUgdmlld3BvcnQgdXNpbmcgYmluYXJ5IHNlYXJjaFxyXG4gICAgLy8gTG9vayBmb3IgZmlyc3Qgbm9kZSB0aGF0IHN0YXJ0cyBhZnRlciB0aGUgYmVnaW5uaW5nIG9mIHRoZSB2aWV3cG9ydCAod2l0aCBidWZmZXIpXHJcbiAgICAvLyBPciB0aGF0IGVuZHMgYWZ0ZXIgdGhlIGJlZ2lubmluZyBvZiB0aGUgdmlld3BvcnRcclxuICAgIGNvbnN0IGZpcnN0SW5kZXggPSBiaW5hcnlTZWFyY2godmlzaWJsZU5vZGVzLCAobm9kZSkgPT4ge1xyXG4gICAgICByZXR1cm4gKG5vZGUucG9zaXRpb24gKyBZX09GRlNFVCA+IHRoaXMueSkgfHxcclxuICAgICAgICAgICAgIChub2RlLnBvc2l0aW9uICsgbm9kZS5oZWlnaHQgPiB0aGlzLnkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU2VhcmNoIGZvciBsYXN0IG5vZGUgaW4gdGhlIHZpZXdwb3J0IHVzaW5nIGJpbmFyeSBzZWFyY2hcclxuICAgIC8vIExvb2sgZm9yIGZpcnN0IG5vZGUgdGhhdCBzdGFydHMgYWZ0ZXIgdGhlIGVuZCBvZiB0aGUgdmlld3BvcnQgKHdpdGggYnVmZmVyKVxyXG4gICAgY29uc3QgbGFzdEluZGV4ID0gYmluYXJ5U2VhcmNoKHZpc2libGVOb2RlcywgKG5vZGUpID0+IHtcclxuICAgICAgcmV0dXJuIG5vZGUucG9zaXRpb24gLSBZX09GRlNFVCA+IHRoaXMueSArIHRoaXMudmlld3BvcnRIZWlnaHQ7XHJcbiAgICB9LCBmaXJzdEluZGV4KTtcclxuXHJcbiAgICBjb25zdCB2aWV3cG9ydE5vZGVzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IGZpcnN0SW5kZXg7IGkgPD0gbGFzdEluZGV4OyBpKyspIHtcclxuICAgICAgdmlld3BvcnROb2Rlcy5wdXNoKHZpc2libGVOb2Rlc1tpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZpZXdwb3J0Tm9kZXM7XHJcbiAgfVxyXG5cclxuICBmaXhTY3JvbGwoKSB7XHJcbiAgICBjb25zdCBtYXhZID0gTWF0aC5tYXgoMCwgdGhpcy50b3RhbEhlaWdodCAtIHRoaXMudmlld3BvcnRIZWlnaHQpO1xyXG5cclxuICAgIGlmICh0aGlzLnkgPCAwKSB0aGlzLl9zZXRZQmxvY2tzKDApO1xyXG4gICAgaWYgKHRoaXMueSA+IG1heFkpIHRoaXMuX3NldFlCbG9ja3MobWF4WSAvIFlfRVBTSUxPTik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBiaW5hcnlTZWFyY2gobm9kZXMsIGNvbmRpdGlvbiwgZmlyc3RJbmRleCA9IDApIHtcclxuICBsZXQgaW5kZXggPSBmaXJzdEluZGV4O1xyXG4gIGxldCB0b0luZGV4ID0gbm9kZXMubGVuZ3RoIC0gMTtcclxuXHJcbiAgd2hpbGUgKGluZGV4ICE9PSB0b0luZGV4KSB7XHJcbiAgICBsZXQgbWlkSW5kZXggPSBNYXRoLmZsb29yKChpbmRleCArIHRvSW5kZXgpIC8gMik7XHJcblxyXG4gICAgaWYgKGNvbmRpdGlvbihub2Rlc1ttaWRJbmRleF0pKSB7XHJcbiAgICAgIHRvSW5kZXggPSBtaWRJbmRleDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAoaW5kZXggPT09IG1pZEluZGV4KSBpbmRleCA9IHRvSW5kZXg7XHJcbiAgICAgIGVsc2UgaW5kZXggPSBtaWRJbmRleDtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGluZGV4O1xyXG59XHJcbiJdfQ==