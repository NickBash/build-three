import { Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class TreeNodeContent {
}
/** @nocollapse */ TreeNodeContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeNodeContent, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ TreeNodeContent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: TreeNodeContent, selector: "tree-node-content", inputs: { node: "node", index: "index", template: "template" }, ngImport: i0, template: `
  <span *ngIf="!template">{{ node.displayField }}</span>
  <ng-container
    [ngTemplateOutlet]="template"
    [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index }">
  </ng-container>`, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeNodeContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'tree-node-content',
                    encapsulation: ViewEncapsulation.None,
                    template: `
  <span *ngIf="!template">{{ node.displayField }}</span>
  <ng-container
    [ngTemplateOutlet]="template"
    [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index }">
  </ng-container>`,
                }]
        }], propDecorators: { node: [{
                type: Input
            }], index: [{
                type: Input
            }], template: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci10cmVlLWNvbXBvbmVudC9zcmMvbGliL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFlLE1BQU0sZUFBZSxDQUFDOzs7QUFhakYsTUFBTSxPQUFPLGVBQWU7OytIQUFmLGVBQWU7bUhBQWYsZUFBZSx5SEFQaEI7Ozs7O2tCQUtNOzJGQUVMLGVBQWU7a0JBVjNCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRTs7Ozs7a0JBS007aUJBQ2pCOzhCQUVVLElBQUk7c0JBQVosS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd0cmVlLW5vZGUtY29udGVudCcsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gIDxzcGFuICpuZ0lmPVwiIXRlbXBsYXRlXCI+e3sgbm9kZS5kaXNwbGF5RmllbGQgfX08L3NwYW4+XHJcbiAgPG5nLWNvbnRhaW5lclxyXG4gICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIlxyXG4gICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBub2RlLCBub2RlOiBub2RlLCBpbmRleDogaW5kZXggfVwiPlxyXG4gIDwvbmctY29udGFpbmVyPmAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmVlTm9kZUNvbnRlbnQge1xyXG4gIEBJbnB1dCgpIG5vZGU6IFRyZWVOb2RlO1xyXG4gIEBJbnB1dCgpIGluZGV4OiBudW1iZXI7XHJcbiAgQElucHV0KCkgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbn1cclxuIl19