import { Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../directives/tree-drop.directive";
export class TreeNodeDropSlot {
    onDrop($event) {
        this.node.mouseAction('drop', $event.event, {
            from: $event.element,
            to: { parent: this.node, index: this.dropIndex }
        });
    }
    allowDrop(element, $event) {
        return this.node.options.allowDrop(element, { parent: this.node, index: this.dropIndex }, $event);
    }
}
/** @nocollapse */ TreeNodeDropSlot.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeNodeDropSlot, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ TreeNodeDropSlot.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: TreeNodeDropSlot, selector: "TreeNodeDropSlot, tree-node-drop-slot", inputs: { node: "node", dropIndex: "dropIndex" }, ngImport: i0, template: `
    <div
      class="node-drop-slot"
      (treeDrop)="onDrop($event)"
      [treeAllowDrop]="allowDrop.bind(this)"
      [allowDragoverStyling]="true">
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.TreeDropDirective, selector: "[treeDrop]", inputs: ["allowDragoverStyling", "treeAllowDrop"], outputs: ["treeDrop", "treeDropDragOver", "treeDropDragLeave", "treeDropDragEnter"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeNodeDropSlot, decorators: [{
            type: Component,
            args: [{ selector: 'TreeNodeDropSlot, tree-node-drop-slot', encapsulation: ViewEncapsulation.None, template: `
    <div
      class="node-drop-slot"
      (treeDrop)="onDrop($event)"
      [treeAllowDrop]="allowDrop.bind(this)"
      [allowDragoverStyling]="true">
    </div>
  ` }]
        }], propDecorators: { node: [{
                type: Input
            }], dropIndex: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWRyb3Atc2xvdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLXRyZWUtY29tcG9uZW50L3NyYy9saWIvY29tcG9uZW50cy90cmVlLW5vZGUtZHJvcC1zbG90LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBZ0JwRSxNQUFNLE9BQU8sZ0JBQWdCO0lBSTNCLE1BQU0sQ0FBQyxNQUFNO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDMUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPO1lBQ3BCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFO1NBQ2pELENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU07UUFDdkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwRyxDQUFDOztnSUFiVSxnQkFBZ0I7b0hBQWhCLGdCQUFnQiwrSEFUakI7Ozs7Ozs7R0FPVDsyRkFFVSxnQkFBZ0I7a0JBYjVCLFNBQVM7K0JBQ0UsdUNBQXVDLGlCQUNsQyxpQkFBaUIsQ0FBQyxJQUFJLFlBRTNCOzs7Ozs7O0dBT1Q7OEJBR1EsSUFBSTtzQkFBWixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdUcmVlTm9kZURyb3BTbG90LCB0cmVlLW5vZGUtZHJvcC1zbG90JyxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIHN0eWxlczogW10sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJub2RlLWRyb3Atc2xvdFwiXHJcbiAgICAgICh0cmVlRHJvcCk9XCJvbkRyb3AoJGV2ZW50KVwiXHJcbiAgICAgIFt0cmVlQWxsb3dEcm9wXT1cImFsbG93RHJvcC5iaW5kKHRoaXMpXCJcclxuICAgICAgW2FsbG93RHJhZ292ZXJTdHlsaW5nXT1cInRydWVcIj5cclxuICAgIDwvZGl2PlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlRHJvcFNsb3Qge1xyXG4gIEBJbnB1dCgpIG5vZGU6IFRyZWVOb2RlO1xyXG4gIEBJbnB1dCgpIGRyb3BJbmRleDogbnVtYmVyO1xyXG5cclxuICBvbkRyb3AoJGV2ZW50KSB7XHJcbiAgICB0aGlzLm5vZGUubW91c2VBY3Rpb24oJ2Ryb3AnLCAkZXZlbnQuZXZlbnQsIHtcclxuICAgICAgZnJvbTogJGV2ZW50LmVsZW1lbnQsXHJcbiAgICAgIHRvOiB7IHBhcmVudDogdGhpcy5ub2RlLCBpbmRleDogdGhpcy5kcm9wSW5kZXggfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhbGxvd0Ryb3AoZWxlbWVudCwgJGV2ZW50KSB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlLm9wdGlvbnMuYWxsb3dEcm9wKGVsZW1lbnQsIHsgcGFyZW50OiB0aGlzLm5vZGUsIGluZGV4OiB0aGlzLmRyb3BJbmRleCB9LCAkZXZlbnQpO1xyXG4gIH1cclxufVxyXG4iXX0=