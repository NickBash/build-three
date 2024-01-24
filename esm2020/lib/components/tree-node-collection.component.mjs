var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { reaction } from 'mobx';
import { observable, computed, action } from '../mobx-angular/mobx-proxy';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./loading.component";
import * as i3 from "../directives/tree-animate-open.directive";
import * as i4 from "../mobx-angular/tree-mobx-autorun.directive";
import * as i5 from "./tree-node-drop-slot.component";
import * as i6 from "./tree-node-wrapper.component";
export class TreeNodeChildrenComponent {
}
/** @nocollapse */ TreeNodeChildrenComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeNodeChildrenComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ TreeNodeChildrenComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: TreeNodeChildrenComponent, selector: "tree-node-children", inputs: { node: "node", templates: "templates" }, ngImport: i0, template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div
        [class.tree-children]="true"
        [class.tree-children-no-padding]="node.options.levelPadding"
        *treeAnimateOpen="
          node.isExpanded;
          speed: node.options.animateSpeed;
          acceleration: node.options.animateAcceleration;
          enabled: node.options.animateExpand
        "
      >
        <tree-node-collection
          *ngIf="node.children"
          [nodes]="node.children"
          [templates]="templates"
          [treeModel]="node.treeModel"
        >
        </tree-node-collection>
        <tree-loading-component
          [style.padding-left]="node.getNodePadding()"
          class="tree-node-loading"
          *ngIf="!node.children"
          [template]="templates.loadingTemplate"
          [node]="node"
        ></tree-loading-component>
      </div>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i1.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i0.forwardRef(function () { return i2.LoadingComponent; }), selector: "tree-loading-component", inputs: ["template", "node"] }, { kind: "component", type: i0.forwardRef(function () { return TreeNodeCollectionComponent; }), selector: "tree-node-collection", inputs: ["nodes", "treeModel", "templates"] }, { kind: "directive", type: i0.forwardRef(function () { return i3.TreeAnimateOpenDirective; }), selector: "[treeAnimateOpen]", inputs: ["treeAnimateOpenSpeed", "treeAnimateOpenAcceleration", "treeAnimateOpenEnabled", "treeAnimateOpen"] }, { kind: "directive", type: i0.forwardRef(function () { return i4.TreeMobxAutorunDirective; }), selector: "[treeMobxAutorun]", inputs: ["treeMobxAutorun"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeNodeChildrenComponent, decorators: [{
            type: Component,
            args: [{ selector: 'tree-node-children', encapsulation: ViewEncapsulation.None, template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div
        [class.tree-children]="true"
        [class.tree-children-no-padding]="node.options.levelPadding"
        *treeAnimateOpen="
          node.isExpanded;
          speed: node.options.animateSpeed;
          acceleration: node.options.animateAcceleration;
          enabled: node.options.animateExpand
        "
      >
        <tree-node-collection
          *ngIf="node.children"
          [nodes]="node.children"
          [templates]="templates"
          [treeModel]="node.treeModel"
        >
        </tree-node-collection>
        <tree-loading-component
          [style.padding-left]="node.getNodePadding()"
          class="tree-node-loading"
          *ngIf="!node.children"
          [template]="templates.loadingTemplate"
          [node]="node"
        ></tree-loading-component>
      </div>
    </ng-container>
  ` }]
        }], propDecorators: { node: [{
                type: Input
            }], templates: [{
                type: Input
            }] } });
export class TreeNodeCollectionComponent {
    constructor() {
        this._dispose = [];
    }
    get nodes() {
        return this._nodes;
    }
    set nodes(nodes) {
        this.setNodes(nodes);
    }
    get marginTop() {
        const firstNode = this.viewportNodes && this.viewportNodes.length && this.viewportNodes[0];
        const relativePosition = firstNode && firstNode.parent
            ? firstNode.position -
                firstNode.parent.position -
                firstNode.parent.getSelfHeight()
            : 0;
        return `${relativePosition}px`;
    }
    setNodes(nodes) {
        this._nodes = nodes;
    }
    ngOnInit() {
        this.virtualScroll = this.treeModel.virtualScroll;
        this._dispose = [
            // return node indexes so we can compare structurally,
            reaction(() => {
                return this.virtualScroll
                    .getViewportNodes(this.nodes)
                    .map(n => n.index);
            }, nodeIndexes => {
                this.viewportNodes = nodeIndexes.map(i => this.nodes[i]);
            }, { compareStructural: true, fireImmediately: true }),
            reaction(() => this.nodes, nodes => {
                this.viewportNodes = this.virtualScroll.getViewportNodes(nodes);
            })
        ];
    }
    ngOnDestroy() {
        this._dispose.forEach(d => d());
    }
    trackNode(index, node) {
        return node.id;
    }
}
/** @nocollapse */ TreeNodeCollectionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeNodeCollectionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ TreeNodeCollectionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: TreeNodeCollectionComponent, selector: "tree-node-collection", inputs: { nodes: "nodes", treeModel: "treeModel", templates: "templates" }, ngImport: i0, template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div [style.margin-top]="marginTop">
        <tree-node
          *ngFor="let node of viewportNodes; let i = index; trackBy: trackNode"
          [node]="node"
          [index]="i"
          [templates]="templates"
        >
        </tree-node>
      </div>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i1.NgForOf; }), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i0.forwardRef(function () { return TreeNodeComponent; }), selector: "TreeNode, tree-node", inputs: ["node", "index", "templates"] }, { kind: "directive", type: i0.forwardRef(function () { return i4.TreeMobxAutorunDirective; }), selector: "[treeMobxAutorun]", inputs: ["treeMobxAutorun"] }], encapsulation: i0.ViewEncapsulation.None });
__decorate([
    observable
], TreeNodeCollectionComponent.prototype, "_nodes", void 0);
__decorate([
    observable
], TreeNodeCollectionComponent.prototype, "viewportNodes", void 0);
__decorate([
    computed
], TreeNodeCollectionComponent.prototype, "marginTop", null);
__decorate([
    action
], TreeNodeCollectionComponent.prototype, "setNodes", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeNodeCollectionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'tree-node-collection',
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div [style.margin-top]="marginTop">
        <tree-node
          *ngFor="let node of viewportNodes; let i = index; trackBy: trackNode"
          [node]="node"
          [index]="i"
          [templates]="templates"
        >
        </tree-node>
      </div>
    </ng-container>
  `
                }]
        }], propDecorators: { nodes: [{
                type: Input
            }], treeModel: [{
                type: Input
            }], _nodes: [], templates: [{
                type: Input
            }], viewportNodes: [], marginTop: [], setNodes: [] } });
export class TreeNodeComponent {
}
/** @nocollapse */ TreeNodeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeNodeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ TreeNodeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: TreeNodeComponent, selector: "TreeNode, tree-node", inputs: { node: "node", index: "index", templates: "templates" }, ngImport: i0, template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div
        *ngIf="!templates.treeNodeFullTemplate"
        [class]="node.getClass()"
        [class.tree-node]="true"
        [class.tree-node-expanded]="node.isExpanded && node.hasChildren"
        [class.tree-node-collapsed]="node.isCollapsed && node.hasChildren"
        [class.tree-node-leaf]="node.isLeaf"
        [class.tree-node-active]="node.isActive"
        [class.tree-node-focused]="node.isFocused"
      >
        <tree-node-drop-slot
          *ngIf="index === 0"
          [dropIndex]="node.index"
          [node]="node.parent"
        ></tree-node-drop-slot>

        <tree-node-wrapper
          [node]="node"
          [index]="index"
          [templates]="templates"
        ></tree-node-wrapper>

        <tree-node-children
          [node]="node"
          [templates]="templates"
        ></tree-node-children>
        <tree-node-drop-slot
          [dropIndex]="node.index + 1"
          [node]="node.parent"
        ></tree-node-drop-slot>
      </div>
      <ng-container
        [ngTemplateOutlet]="templates.treeNodeFullTemplate"
        [ngTemplateOutletContext]="{
          $implicit: node,
          node: node,
          index: index,
          templates: templates
        }"
      >
      </ng-container>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: TreeNodeChildrenComponent, selector: "tree-node-children", inputs: ["node", "templates"] }, { kind: "component", type: i5.TreeNodeDropSlot, selector: "TreeNodeDropSlot, tree-node-drop-slot", inputs: ["node", "dropIndex"] }, { kind: "component", type: i6.TreeNodeWrapperComponent, selector: "tree-node-wrapper", inputs: ["node", "index", "templates"] }, { kind: "directive", type: i4.TreeMobxAutorunDirective, selector: "[treeMobxAutorun]", inputs: ["treeMobxAutorun"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeNodeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'TreeNode, tree-node', encapsulation: ViewEncapsulation.None, template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div
        *ngIf="!templates.treeNodeFullTemplate"
        [class]="node.getClass()"
        [class.tree-node]="true"
        [class.tree-node-expanded]="node.isExpanded && node.hasChildren"
        [class.tree-node-collapsed]="node.isCollapsed && node.hasChildren"
        [class.tree-node-leaf]="node.isLeaf"
        [class.tree-node-active]="node.isActive"
        [class.tree-node-focused]="node.isFocused"
      >
        <tree-node-drop-slot
          *ngIf="index === 0"
          [dropIndex]="node.index"
          [node]="node.parent"
        ></tree-node-drop-slot>

        <tree-node-wrapper
          [node]="node"
          [index]="index"
          [templates]="templates"
        ></tree-node-wrapper>

        <tree-node-children
          [node]="node"
          [templates]="templates"
        ></tree-node-children>
        <tree-node-drop-slot
          [dropIndex]="node.index + 1"
          [node]="node.parent"
        ></tree-node-drop-slot>
      </div>
      <ng-container
        [ngTemplateOutlet]="templates.treeNodeFullTemplate"
        [ngTemplateOutletContext]="{
          $implicit: node,
          node: node,
          index: index,
          templates: templates
        }"
      >
      </ng-container>
    </ng-container>
  ` }]
        }], propDecorators: { node: [{
                type: Input
            }], index: [{
                type: Input
            }], templates: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWNvbGxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci10cmVlLWNvbXBvbmVudC9zcmMvbGliL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNvbGxlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGlCQUFpQixFQUdsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7OztBQXdDMUUsTUFBTSxPQUFPLHlCQUF5Qjs7eUlBQXpCLHlCQUF5Qjs2SEFBekIseUJBQXlCLDRHQTlCMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0QlQscVlBd0JVLDJCQUEyQjsyRkF0QjNCLHlCQUF5QjtrQkFsQ3JDLFNBQVM7K0JBQ0Usb0JBQW9CLGlCQUNmLGlCQUFpQixDQUFDLElBQUksWUFFM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0QlQ7OEJBR1EsSUFBSTtzQkFBWixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7O0FBb0JSLE1BQU0sT0FBTywyQkFBMkI7SUFqQnhDO1FBK0NFLGFBQVEsR0FBRyxFQUFFLENBQUM7S0FxQ2Y7SUFsRUMsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLO1FBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDO1FBVWEsU0FBUztRQUNyQixNQUFNLFNBQVMsR0FDYixJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FB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O3NCQUFiLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgcmVhY3Rpb24gfSBmcm9tICdtb2J4JztcclxuaW1wb3J0IHsgb2JzZXJ2YWJsZSwgY29tcHV0ZWQsIGFjdGlvbiB9IGZyb20gJy4uL21vYngtYW5ndWxhci9tb2J4LXByb3h5JztcclxuaW1wb3J0IHsgVHJlZVZpcnR1YWxTY3JvbGwgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbCc7XHJcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtbm9kZS5tb2RlbCc7XHJcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4uL21vZGVscy90cmVlLm1vZGVsJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3RyZWUtbm9kZS1jaGlsZHJlbicsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBzdHlsZXM6IFtdLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmctY29udGFpbmVyICp0cmVlTW9ieEF1dG9ydW49XCJ7IGRvbnREZXRhY2g6IHRydWUgfVwiPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgW2NsYXNzLnRyZWUtY2hpbGRyZW5dPVwidHJ1ZVwiXHJcbiAgICAgICAgW2NsYXNzLnRyZWUtY2hpbGRyZW4tbm8tcGFkZGluZ109XCJub2RlLm9wdGlvbnMubGV2ZWxQYWRkaW5nXCJcclxuICAgICAgICAqdHJlZUFuaW1hdGVPcGVuPVwiXHJcbiAgICAgICAgICBub2RlLmlzRXhwYW5kZWQ7XHJcbiAgICAgICAgICBzcGVlZDogbm9kZS5vcHRpb25zLmFuaW1hdGVTcGVlZDtcclxuICAgICAgICAgIGFjY2VsZXJhdGlvbjogbm9kZS5vcHRpb25zLmFuaW1hdGVBY2NlbGVyYXRpb247XHJcbiAgICAgICAgICBlbmFibGVkOiBub2RlLm9wdGlvbnMuYW5pbWF0ZUV4cGFuZFxyXG4gICAgICAgIFwiXHJcbiAgICAgID5cclxuICAgICAgICA8dHJlZS1ub2RlLWNvbGxlY3Rpb25cclxuICAgICAgICAgICpuZ0lmPVwibm9kZS5jaGlsZHJlblwiXHJcbiAgICAgICAgICBbbm9kZXNdPVwibm9kZS5jaGlsZHJlblwiXHJcbiAgICAgICAgICBbdGVtcGxhdGVzXT1cInRlbXBsYXRlc1wiXHJcbiAgICAgICAgICBbdHJlZU1vZGVsXT1cIm5vZGUudHJlZU1vZGVsXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgPC90cmVlLW5vZGUtY29sbGVjdGlvbj5cclxuICAgICAgICA8dHJlZS1sb2FkaW5nLWNvbXBvbmVudFxyXG4gICAgICAgICAgW3N0eWxlLnBhZGRpbmctbGVmdF09XCJub2RlLmdldE5vZGVQYWRkaW5nKClcIlxyXG4gICAgICAgICAgY2xhc3M9XCJ0cmVlLW5vZGUtbG9hZGluZ1wiXHJcbiAgICAgICAgICAqbmdJZj1cIiFub2RlLmNoaWxkcmVuXCJcclxuICAgICAgICAgIFt0ZW1wbGF0ZV09XCJ0ZW1wbGF0ZXMubG9hZGluZ1RlbXBsYXRlXCJcclxuICAgICAgICAgIFtub2RlXT1cIm5vZGVcIlxyXG4gICAgICAgID48L3RyZWUtbG9hZGluZy1jb21wb25lbnQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVDaGlsZHJlbkNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgbm9kZTogVHJlZU5vZGU7XHJcbiAgQElucHV0KCkgdGVtcGxhdGVzOiBhbnk7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndHJlZS1ub2RlLWNvbGxlY3Rpb24nLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy1jb250YWluZXIgKnRyZWVNb2J4QXV0b3J1bj1cInsgZG9udERldGFjaDogdHJ1ZSB9XCI+XHJcbiAgICAgIDxkaXYgW3N0eWxlLm1hcmdpbi10b3BdPVwibWFyZ2luVG9wXCI+XHJcbiAgICAgICAgPHRyZWUtbm9kZVxyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IG5vZGUgb2Ygdmlld3BvcnROb2RlczsgbGV0IGkgPSBpbmRleDsgdHJhY2tCeTogdHJhY2tOb2RlXCJcclxuICAgICAgICAgIFtub2RlXT1cIm5vZGVcIlxyXG4gICAgICAgICAgW2luZGV4XT1cImlcIlxyXG4gICAgICAgICAgW3RlbXBsYXRlc109XCJ0ZW1wbGF0ZXNcIlxyXG4gICAgICAgID5cclxuICAgICAgICA8L3RyZWUtbm9kZT5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmVlTm9kZUNvbGxlY3Rpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbm9kZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbm9kZXM7XHJcbiAgfVxyXG4gIHNldCBub2Rlcyhub2Rlcykge1xyXG4gICAgdGhpcy5zZXROb2Rlcyhub2Rlcyk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSB0cmVlTW9kZWw6IFRyZWVNb2RlbDtcclxuXHJcbiAgQG9ic2VydmFibGUgX25vZGVzO1xyXG4gIHByaXZhdGUgdmlydHVhbFNjcm9sbDogVHJlZVZpcnR1YWxTY3JvbGw7IC8vIENhbm5vdCBpbmplY3QgdGhpcywgYmVjYXVzZSB3ZSBtaWdodCBiZSBpbnNpZGUgdHJlZU5vZGVUZW1wbGF0ZUZ1bGxcclxuICBASW5wdXQoKSB0ZW1wbGF0ZXM7XHJcblxyXG4gIEBvYnNlcnZhYmxlIHZpZXdwb3J0Tm9kZXM6IFRyZWVOb2RlW107XHJcblxyXG4gIEBjb21wdXRlZCBnZXQgbWFyZ2luVG9wKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBmaXJzdE5vZGUgPVxyXG4gICAgICB0aGlzLnZpZXdwb3J0Tm9kZXMgJiYgdGhpcy52aWV3cG9ydE5vZGVzLmxlbmd0aCAmJiB0aGlzLnZpZXdwb3J0Tm9kZXNbMF07XHJcbiAgICBjb25zdCByZWxhdGl2ZVBvc2l0aW9uID1cclxuICAgICAgZmlyc3ROb2RlICYmIGZpcnN0Tm9kZS5wYXJlbnRcclxuICAgICAgICA/IGZpcnN0Tm9kZS5wb3NpdGlvbiAtXHJcbiAgICAgICAgICBmaXJzdE5vZGUucGFyZW50LnBvc2l0aW9uIC1cclxuICAgICAgICAgIGZpcnN0Tm9kZS5wYXJlbnQuZ2V0U2VsZkhlaWdodCgpXHJcbiAgICAgICAgOiAwO1xyXG5cclxuICAgIHJldHVybiBgJHtyZWxhdGl2ZVBvc2l0aW9ufXB4YDtcclxuICB9XHJcblxyXG4gIF9kaXNwb3NlID0gW107XHJcblxyXG4gIEBhY3Rpb24gc2V0Tm9kZXMobm9kZXMpIHtcclxuICAgIHRoaXMuX25vZGVzID0gbm9kZXM7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudmlydHVhbFNjcm9sbCA9IHRoaXMudHJlZU1vZGVsLnZpcnR1YWxTY3JvbGw7XHJcbiAgICB0aGlzLl9kaXNwb3NlID0gW1xyXG4gICAgICAvLyByZXR1cm4gbm9kZSBpbmRleGVzIHNvIHdlIGNhbiBjb21wYXJlIHN0cnVjdHVyYWxseSxcclxuICAgICAgcmVhY3Rpb24oXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMudmlydHVhbFNjcm9sbFxyXG4gICAgICAgICAgICAuZ2V0Vmlld3BvcnROb2Rlcyh0aGlzLm5vZGVzKVxyXG4gICAgICAgICAgICAubWFwKG4gPT4gbi5pbmRleCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBub2RlSW5kZXhlcyA9PiB7XHJcbiAgICAgICAgICB0aGlzLnZpZXdwb3J0Tm9kZXMgPSBub2RlSW5kZXhlcy5tYXAoaSA9PiB0aGlzLm5vZGVzW2ldKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgY29tcGFyZVN0cnVjdHVyYWw6IHRydWUsIGZpcmVJbW1lZGlhdGVseTogdHJ1ZSB9IGFzIGFueVxyXG4gICAgICApLFxyXG4gICAgICByZWFjdGlvbihcclxuICAgICAgICAoKSA9PiB0aGlzLm5vZGVzLFxyXG4gICAgICAgIG5vZGVzID0+IHtcclxuICAgICAgICAgIHRoaXMudmlld3BvcnROb2RlcyA9IHRoaXMudmlydHVhbFNjcm9sbC5nZXRWaWV3cG9ydE5vZGVzKG5vZGVzKTtcclxuICAgICAgICB9XHJcbiAgICAgIClcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX2Rpc3Bvc2UuZm9yRWFjaChkID0+IGQoKSk7XHJcbiAgfVxyXG5cclxuICB0cmFja05vZGUoaW5kZXgsIG5vZGUpIHtcclxuICAgIHJldHVybiBub2RlLmlkO1xyXG4gIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdUcmVlTm9kZSwgdHJlZS1ub2RlJyxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIHN0eWxlczogW10sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy1jb250YWluZXIgKnRyZWVNb2J4QXV0b3J1bj1cInsgZG9udERldGFjaDogdHJ1ZSB9XCI+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICAqbmdJZj1cIiF0ZW1wbGF0ZXMudHJlZU5vZGVGdWxsVGVtcGxhdGVcIlxyXG4gICAgICAgIFtjbGFzc109XCJub2RlLmdldENsYXNzKClcIlxyXG4gICAgICAgIFtjbGFzcy50cmVlLW5vZGVdPVwidHJ1ZVwiXHJcbiAgICAgICAgW2NsYXNzLnRyZWUtbm9kZS1leHBhbmRlZF09XCJub2RlLmlzRXhwYW5kZWQgJiYgbm9kZS5oYXNDaGlsZHJlblwiXHJcbiAgICAgICAgW2NsYXNzLnRyZWUtbm9kZS1jb2xsYXBzZWRdPVwibm9kZS5pc0NvbGxhcHNlZCAmJiBub2RlLmhhc0NoaWxkcmVuXCJcclxuICAgICAgICBbY2xhc3MudHJlZS1ub2RlLWxlYWZdPVwibm9kZS5pc0xlYWZcIlxyXG4gICAgICAgIFtjbGFzcy50cmVlLW5vZGUtYWN0aXZlXT1cIm5vZGUuaXNBY3RpdmVcIlxyXG4gICAgICAgIFtjbGFzcy50cmVlLW5vZGUtZm9jdXNlZF09XCJub2RlLmlzRm9jdXNlZFwiXHJcbiAgICAgID5cclxuICAgICAgICA8dHJlZS1ub2RlLWRyb3Atc2xvdFxyXG4gICAgICAgICAgKm5nSWY9XCJpbmRleCA9PT0gMFwiXHJcbiAgICAgICAgICBbZHJvcEluZGV4XT1cIm5vZGUuaW5kZXhcIlxyXG4gICAgICAgICAgW25vZGVdPVwibm9kZS5wYXJlbnRcIlxyXG4gICAgICAgID48L3RyZWUtbm9kZS1kcm9wLXNsb3Q+XHJcblxyXG4gICAgICAgIDx0cmVlLW5vZGUtd3JhcHBlclxyXG4gICAgICAgICAgW25vZGVdPVwibm9kZVwiXHJcbiAgICAgICAgICBbaW5kZXhdPVwiaW5kZXhcIlxyXG4gICAgICAgICAgW3RlbXBsYXRlc109XCJ0ZW1wbGF0ZXNcIlxyXG4gICAgICAgID48L3RyZWUtbm9kZS13cmFwcGVyPlxyXG5cclxuICAgICAgICA8dHJlZS1ub2RlLWNoaWxkcmVuXHJcbiAgICAgICAgICBbbm9kZV09XCJub2RlXCJcclxuICAgICAgICAgIFt0ZW1wbGF0ZXNdPVwidGVtcGxhdGVzXCJcclxuICAgICAgICA+PC90cmVlLW5vZGUtY2hpbGRyZW4+XHJcbiAgICAgICAgPHRyZWUtbm9kZS1kcm9wLXNsb3RcclxuICAgICAgICAgIFtkcm9wSW5kZXhdPVwibm9kZS5pbmRleCArIDFcIlxyXG4gICAgICAgICAgW25vZGVdPVwibm9kZS5wYXJlbnRcIlxyXG4gICAgICAgID48L3RyZWUtbm9kZS1kcm9wLXNsb3Q+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVzLnRyZWVOb2RlRnVsbFRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xyXG4gICAgICAgICAgJGltcGxpY2l0OiBub2RlLFxyXG4gICAgICAgICAgbm9kZTogbm9kZSxcclxuICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgIHRlbXBsYXRlczogdGVtcGxhdGVzXHJcbiAgICAgICAgfVwiXHJcbiAgICAgID5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmVlTm9kZUNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgbm9kZTogVHJlZU5vZGU7XHJcbiAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcclxuICBASW5wdXQoKSB0ZW1wbGF0ZXM6IGFueTtcclxufVxyXG5cclxuXHJcblxyXG4iXX0=