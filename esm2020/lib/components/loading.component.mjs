import { Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class LoadingComponent {
}
/** @nocollapse */ LoadingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: LoadingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ LoadingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: LoadingComponent, selector: "tree-loading-component", inputs: { template: "template", node: "node" }, ngImport: i0, template: `
    <span *ngIf="!template">loading...</span>
    <ng-container
      [ngTemplateOutlet]="template"
      [ngTemplateOutletContext]="{ $implicit: node }">
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: LoadingComponent, decorators: [{
            type: Component,
            args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'tree-loading-component',
                    template: `
    <span *ngIf="!template">loading...</span>
    <ng-container
      [ngTemplateOutlet]="template"
      [ngTemplateOutletContext]="{ $implicit: node }">
    </ng-container>
  `,
                }]
        }], propDecorators: { template: [{
                type: Input
            }], node: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLXRyZWUtY29tcG9uZW50L3NyYy9saWIvY29tcG9uZW50cy9sb2FkaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBZSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBY2pGLE1BQU0sT0FBTyxnQkFBZ0I7O2dJQUFoQixnQkFBZ0I7b0hBQWhCLGdCQUFnQiw4R0FSakI7Ozs7OztHQU1UOzJGQUVVLGdCQUFnQjtrQkFYNUIsU0FBUzttQkFBQztvQkFDVCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsUUFBUSxFQUFFOzs7Ozs7R0FNVDtpQkFDRjs4QkFFVSxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBzZWxlY3RvcjogJ3RyZWUtbG9hZGluZy1jb21wb25lbnQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3BhbiAqbmdJZj1cIiF0ZW1wbGF0ZVwiPmxvYWRpbmcuLi48L3NwYW4+XHJcbiAgICA8bmctY29udGFpbmVyXHJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCJcclxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBub2RlIH1cIj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2FkaW5nQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICBASW5wdXQoKSBub2RlOiBUcmVlTm9kZTtcclxufVxyXG4iXX0=