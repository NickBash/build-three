import { Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./tree-node-content.component";
import * as i3 from "../directives/tree-drop.directive";
import * as i4 from "../directives/tree-drag.directive";
import * as i5 from "./tree-node-expander.component";
import * as i6 from "./tree-node-checkbox.component";
export class TreeNodeWrapperComponent {
}
/** @nocollapse */ TreeNodeWrapperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeNodeWrapperComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ TreeNodeWrapperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: TreeNodeWrapperComponent, selector: "tree-node-wrapper", inputs: { node: "node", index: "index", templates: "templates" }, ngImport: i0, template: `
      <div *ngIf="!templates.treeNodeWrapperTemplate" class="node-wrapper" [style.padding-left]="node.getNodePadding()">
          <tree-node-checkbox *ngIf="node.options.useCheckbox" [node]="node"></tree-node-checkbox>
          <tree-node-expander [node]="node"></tree-node-expander>
          <div class="node-content-wrapper"
               [class.node-content-wrapper-active]="node.isActive"
               [class.node-content-wrapper-focused]="node.isFocused"
               (click)="node.mouseAction('click', $event)"
               (dblclick)="node.mouseAction('dblClick', $event)"
               (mouseover)="node.mouseAction('mouseOver', $event)"
               (mouseout)="node.mouseAction('mouseOut', $event)"
               (contextmenu)="node.mouseAction('contextMenu', $event)"
               (treeDrop)="node.onDrop($event)"
               (treeDropDragOver)="node.mouseAction('dragOver', $event)"
               (treeDropDragLeave)="node.mouseAction('dragLeave', $event)"
               (treeDropDragEnter)="node.mouseAction('dragEnter', $event)"
               [treeAllowDrop]="node.allowDrop"
               [allowDragoverStyling]="node.allowDragoverStyling()"
               [treeDrag]="node"
               [treeDragEnabled]="node.allowDrag()">

              <tree-node-content [node]="node" [index]="index" [template]="templates.treeNodeTemplate">
              </tree-node-content>
          </div>
      </div>
      <ng-container
              [ngTemplateOutlet]="templates.treeNodeWrapperTemplate"
              [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index, templates: templates }">
      </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i2.TreeNodeContent, selector: "tree-node-content", inputs: ["node", "index", "template"] }, { kind: "directive", type: i3.TreeDropDirective, selector: "[treeDrop]", inputs: ["allowDragoverStyling", "treeAllowDrop"], outputs: ["treeDrop", "treeDropDragOver", "treeDropDragLeave", "treeDropDragEnter"] }, { kind: "directive", type: i4.TreeDragDirective, selector: "[treeDrag]", inputs: ["treeDrag", "treeDragEnabled"] }, { kind: "component", type: i5.TreeNodeExpanderComponent, selector: "tree-node-expander", inputs: ["node"] }, { kind: "component", type: i6.TreeNodeCheckboxComponent, selector: "tree-node-checkbox", inputs: ["node"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeNodeWrapperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'tree-node-wrapper', encapsulation: ViewEncapsulation.None, template: `
      <div *ngIf="!templates.treeNodeWrapperTemplate" class="node-wrapper" [style.padding-left]="node.getNodePadding()">
          <tree-node-checkbox *ngIf="node.options.useCheckbox" [node]="node"></tree-node-checkbox>
          <tree-node-expander [node]="node"></tree-node-expander>
          <div class="node-content-wrapper"
               [class.node-content-wrapper-active]="node.isActive"
               [class.node-content-wrapper-focused]="node.isFocused"
               (click)="node.mouseAction('click', $event)"
               (dblclick)="node.mouseAction('dblClick', $event)"
               (mouseover)="node.mouseAction('mouseOver', $event)"
               (mouseout)="node.mouseAction('mouseOut', $event)"
               (contextmenu)="node.mouseAction('contextMenu', $event)"
               (treeDrop)="node.onDrop($event)"
               (treeDropDragOver)="node.mouseAction('dragOver', $event)"
               (treeDropDragLeave)="node.mouseAction('dragLeave', $event)"
               (treeDropDragEnter)="node.mouseAction('dragEnter', $event)"
               [treeAllowDrop]="node.allowDrop"
               [allowDragoverStyling]="node.allowDragoverStyling()"
               [treeDrag]="node"
               [treeDragEnabled]="node.allowDrag()">

              <tree-node-content [node]="node" [index]="index" [template]="templates.treeNodeTemplate">
              </tree-node-content>
          </div>
      </div>
      <ng-container
              [ngTemplateOutlet]="templates.treeNodeWrapperTemplate"
              [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index, templates: templates }">
      </ng-container>
  ` }]
        }], propDecorators: { node: [{
                type: Input
            }], index: [{
                type: Input
            }], templates: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLXdyYXBwZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci10cmVlLWNvbXBvbmVudC9zcmMvbGliL2NvbXBvbmVudHMvdHJlZS1ub2RlLXdyYXBwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUcsS0FBSyxFQUFHLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztBQXVDdEUsTUFBTSxPQUFPLHdCQUF3Qjs7d0lBQXhCLHdCQUF3Qjs0SEFBeEIsd0JBQXdCLDJIQWhDekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJUOzJGQUdVLHdCQUF3QjtrQkFwQ3BDLFNBQVM7K0JBQ0UsbUJBQW1CLGlCQUNkLGlCQUFpQixDQUFDLElBQUksWUFFM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJUOzhCQUtRLElBQUk7c0JBQVosS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCAsIElucHV0ICwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndHJlZS1ub2RlLXdyYXBwZXInICxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lICxcclxuICBzdHlsZXM6IFtdICxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiIXRlbXBsYXRlcy50cmVlTm9kZVdyYXBwZXJUZW1wbGF0ZVwiIGNsYXNzPVwibm9kZS13cmFwcGVyXCIgW3N0eWxlLnBhZGRpbmctbGVmdF09XCJub2RlLmdldE5vZGVQYWRkaW5nKClcIj5cclxuICAgICAgICAgIDx0cmVlLW5vZGUtY2hlY2tib3ggKm5nSWY9XCJub2RlLm9wdGlvbnMudXNlQ2hlY2tib3hcIiBbbm9kZV09XCJub2RlXCI+PC90cmVlLW5vZGUtY2hlY2tib3g+XHJcbiAgICAgICAgICA8dHJlZS1ub2RlLWV4cGFuZGVyIFtub2RlXT1cIm5vZGVcIj48L3RyZWUtbm9kZS1leHBhbmRlcj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJub2RlLWNvbnRlbnQtd3JhcHBlclwiXHJcbiAgICAgICAgICAgICAgIFtjbGFzcy5ub2RlLWNvbnRlbnQtd3JhcHBlci1hY3RpdmVdPVwibm9kZS5pc0FjdGl2ZVwiXHJcbiAgICAgICAgICAgICAgIFtjbGFzcy5ub2RlLWNvbnRlbnQtd3JhcHBlci1mb2N1c2VkXT1cIm5vZGUuaXNGb2N1c2VkXCJcclxuICAgICAgICAgICAgICAgKGNsaWNrKT1cIm5vZGUubW91c2VBY3Rpb24oJ2NsaWNrJywgJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgIChkYmxjbGljayk9XCJub2RlLm1vdXNlQWN0aW9uKCdkYmxDbGljaycsICRldmVudClcIlxyXG4gICAgICAgICAgICAgICAobW91c2VvdmVyKT1cIm5vZGUubW91c2VBY3Rpb24oJ21vdXNlT3ZlcicsICRldmVudClcIlxyXG4gICAgICAgICAgICAgICAobW91c2VvdXQpPVwibm9kZS5tb3VzZUFjdGlvbignbW91c2VPdXQnLCAkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgKGNvbnRleHRtZW51KT1cIm5vZGUubW91c2VBY3Rpb24oJ2NvbnRleHRNZW51JywgJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICh0cmVlRHJvcCk9XCJub2RlLm9uRHJvcCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgKHRyZWVEcm9wRHJhZ092ZXIpPVwibm9kZS5tb3VzZUFjdGlvbignZHJhZ092ZXInLCAkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgKHRyZWVEcm9wRHJhZ0xlYXZlKT1cIm5vZGUubW91c2VBY3Rpb24oJ2RyYWdMZWF2ZScsICRldmVudClcIlxyXG4gICAgICAgICAgICAgICAodHJlZURyb3BEcmFnRW50ZXIpPVwibm9kZS5tb3VzZUFjdGlvbignZHJhZ0VudGVyJywgJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgIFt0cmVlQWxsb3dEcm9wXT1cIm5vZGUuYWxsb3dEcm9wXCJcclxuICAgICAgICAgICAgICAgW2FsbG93RHJhZ292ZXJTdHlsaW5nXT1cIm5vZGUuYWxsb3dEcmFnb3ZlclN0eWxpbmcoKVwiXHJcbiAgICAgICAgICAgICAgIFt0cmVlRHJhZ109XCJub2RlXCJcclxuICAgICAgICAgICAgICAgW3RyZWVEcmFnRW5hYmxlZF09XCJub2RlLmFsbG93RHJhZygpXCI+XHJcblxyXG4gICAgICAgICAgICAgIDx0cmVlLW5vZGUtY29udGVudCBbbm9kZV09XCJub2RlXCIgW2luZGV4XT1cImluZGV4XCIgW3RlbXBsYXRlXT1cInRlbXBsYXRlcy50cmVlTm9kZVRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgICAgPC90cmVlLW5vZGUtY29udGVudD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlcy50cmVlTm9kZVdyYXBwZXJUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBub2RlLCBub2RlOiBub2RlLCBpbmRleDogaW5kZXgsIHRlbXBsYXRlczogdGVtcGxhdGVzIH1cIj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgYFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlV3JhcHBlckNvbXBvbmVudCB7XHJcblxyXG4gIEBJbnB1dCgpIG5vZGU6IFRyZWVOb2RlO1xyXG4gIEBJbnB1dCgpIGluZGV4OiBudW1iZXI7XHJcbiAgQElucHV0KCkgdGVtcGxhdGVzOiBhbnk7XHJcblxyXG59XHJcbiJdfQ==