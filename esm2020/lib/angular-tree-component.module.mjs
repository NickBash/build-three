import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeMobxAutorunDirective } from './mobx-angular/tree-mobx-autorun.directive';
import { TREE_ACTIONS } from './models/tree-options.model';
import { KEYS } from './constants/keys';
import { TreeModel } from './models/tree.model';
import { TreeNode } from './models/tree-node.model';
import { TreeDraggedElement } from './models/tree-dragged-element.model';
import { TreeVirtualScroll } from './models/tree-virtual-scroll.model';
import { LoadingComponent } from './components/loading.component';
import { TreeComponent } from './components/tree.component';
import { TreeNodeComponent } from './components/tree-node-collection.component';
import { TreeNodeContent } from './components/tree-node-content.component';
import { TreeNodeDropSlot } from './components/tree-node-drop-slot.component';
import { TreeNodeExpanderComponent } from './components/tree-node-expander.component';
import { TreeNodeChildrenComponent } from './components/tree-node-collection.component';
import { TreeNodeCollectionComponent } from './components/tree-node-collection.component';
import { TreeNodeWrapperComponent } from './components/tree-node-wrapper.component';
import { TreeViewportComponent } from './components/tree-viewport.component';
import { TreeNodeCheckboxComponent } from './components/tree-node-checkbox.component';
import { TreeDropDirective } from './directives/tree-drop.directive';
import { TreeDragDirective } from './directives/tree-drag.directive';
import { TreeAnimateOpenDirective } from './directives/tree-animate-open.directive';
import * as i0 from "@angular/core";
export class TreeModule {
}
/** @nocollapse */ TreeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ TreeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: TreeModule, declarations: [TreeComponent,
        TreeNodeComponent,
        TreeNodeContent,
        LoadingComponent,
        TreeDropDirective,
        TreeDragDirective,
        TreeNodeExpanderComponent,
        TreeNodeChildrenComponent,
        TreeNodeDropSlot,
        TreeNodeCollectionComponent,
        TreeViewportComponent,
        TreeNodeWrapperComponent,
        TreeNodeCheckboxComponent,
        TreeAnimateOpenDirective,
        TreeMobxAutorunDirective], imports: [CommonModule], exports: [TreeComponent,
        TreeNodeComponent,
        TreeNodeContent,
        LoadingComponent,
        TreeDropDirective,
        TreeDragDirective,
        TreeNodeExpanderComponent,
        TreeNodeChildrenComponent,
        TreeNodeDropSlot,
        TreeNodeCollectionComponent,
        TreeViewportComponent,
        TreeNodeWrapperComponent,
        TreeNodeCheckboxComponent,
        TreeAnimateOpenDirective,
        TreeMobxAutorunDirective] });
/** @nocollapse */ TreeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        TreeComponent,
                        TreeNodeComponent,
                        TreeNodeContent,
                        LoadingComponent,
                        TreeDropDirective,
                        TreeDragDirective,
                        TreeNodeExpanderComponent,
                        TreeNodeChildrenComponent,
                        TreeNodeDropSlot,
                        TreeNodeCollectionComponent,
                        TreeViewportComponent,
                        TreeNodeWrapperComponent,
                        TreeNodeCheckboxComponent,
                        TreeAnimateOpenDirective,
                        TreeMobxAutorunDirective
                    ],
                    exports: [
                        TreeComponent,
                        TreeNodeComponent,
                        TreeNodeContent,
                        LoadingComponent,
                        TreeDropDirective,
                        TreeDragDirective,
                        TreeNodeExpanderComponent,
                        TreeNodeChildrenComponent,
                        TreeNodeDropSlot,
                        TreeNodeCollectionComponent,
                        TreeViewportComponent,
                        TreeNodeWrapperComponent,
                        TreeNodeCheckboxComponent,
                        TreeAnimateOpenDirective,
                        TreeMobxAutorunDirective
                    ],
                    imports: [CommonModule],
                    providers: []
                }]
        }] });
export { TreeModel, TreeNode, TreeDraggedElement, TreeVirtualScroll, TREE_ACTIONS, KEYS, LoadingComponent, TreeAnimateOpenDirective, TreeComponent, TreeNodeComponent, TreeNodeWrapperComponent, TreeNodeContent, TreeDropDirective, TreeDragDirective, TreeNodeExpanderComponent, TreeNodeChildrenComponent, TreeNodeDropSlot, TreeNodeCollectionComponent, TreeViewportComponent, TreeNodeCheckboxComponent, TreeMobxAutorunDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci10cmVlLWNvbXBvbmVudC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLXRyZWUtY29tcG9uZW50L3NyYy9saWIvYW5ndWxhci10cmVlLWNvbXBvbmVudC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFFdEYsT0FBTyxFQUdMLFlBQVksRUFDYixNQUFNLDZCQUE2QixDQUFDO0FBT3JDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNoRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdEYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDeEYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDMUYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDN0UsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMENBQTBDLENBQUM7O0FBd0NwRixNQUFNLE9BQU8sVUFBVTs7MEhBQVYsVUFBVTsySEFBVixVQUFVLGlCQXBDbkIsYUFBYTtRQUNiLGlCQUFpQjtRQUNqQixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQixpQkFBaUI7UUFDakIseUJBQXlCO1FBQ3pCLHlCQUF5QjtRQUN6QixnQkFBZ0I7UUFDaEIsMkJBQTJCO1FBQzNCLHFCQUFxQjtRQUNyQix3QkFBd0I7UUFDeEIseUJBQXlCO1FBQ3pCLHdCQUF3QjtRQUN4Qix3QkFBd0IsYUFtQmhCLFlBQVksYUFoQnBCLGFBQWE7UUFDYixpQkFBaUI7UUFDakIsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixpQkFBaUI7UUFDakIsaUJBQWlCO1FBQ2pCLHlCQUF5QjtRQUN6Qix5QkFBeUI7UUFDekIsZ0JBQWdCO1FBQ2hCLDJCQUEyQjtRQUMzQixxQkFBcUI7UUFDckIsd0JBQXdCO1FBQ3hCLHlCQUF5QjtRQUN6Qix3QkFBd0I7UUFDeEIsd0JBQXdCOzJIQUtmLFVBQVUsWUFIWCxZQUFZOzJGQUdYLFVBQVU7a0JBdEN0QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLGlCQUFpQjt3QkFDakIsaUJBQWlCO3dCQUNqQix5QkFBeUI7d0JBQ3pCLHlCQUF5Qjt3QkFDekIsZ0JBQWdCO3dCQUNoQiwyQkFBMkI7d0JBQzNCLHFCQUFxQjt3QkFDckIsd0JBQXdCO3dCQUN4Qix5QkFBeUI7d0JBQ3pCLHdCQUF3Qjt3QkFDeEIsd0JBQXdCO3FCQUN6QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsYUFBYTt3QkFDYixpQkFBaUI7d0JBQ2pCLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLGlCQUFpQjt3QkFDakIseUJBQXlCO3dCQUN6Qix5QkFBeUI7d0JBQ3pCLGdCQUFnQjt3QkFDaEIsMkJBQTJCO3dCQUMzQixxQkFBcUI7d0JBQ3JCLHdCQUF3Qjt3QkFDeEIseUJBQXlCO3dCQUN6Qix3QkFBd0I7d0JBQ3hCLHdCQUF3QjtxQkFDekI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixTQUFTLEVBQUUsRUFBRTtpQkFDZDs7QUFHRCxPQUFPLEVBQ0wsU0FBUyxFQUNULFFBQVEsRUFDUixrQkFBa0IsRUFDbEIsaUJBQWlCLEVBRWpCLFlBQVksRUFDWixJQUFJLEVBS0osZ0JBQWdCLEVBQ2hCLHdCQUF3QixFQUN4QixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLHdCQUF3QixFQUN4QixlQUFlLEVBQ2YsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQix5QkFBeUIsRUFDekIseUJBQXlCLEVBQ3pCLGdCQUFnQixFQUNoQiwyQkFBMkIsRUFDM0IscUJBQXFCLEVBQ3JCLHlCQUF5QixFQUV6Qix3QkFBd0IsRUFDekIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFRyZWVNb2J4QXV0b3J1bkRpcmVjdGl2ZSB9IGZyb20gJy4vbW9ieC1hbmd1bGFyL3RyZWUtbW9ieC1hdXRvcnVuLmRpcmVjdGl2ZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIElBY3Rpb25IYW5kbGVyLFxyXG4gIElBY3Rpb25NYXBwaW5nLFxyXG4gIFRSRUVfQUNUSU9OU1xyXG59IGZyb20gJy4vbW9kZWxzL3RyZWUtb3B0aW9ucy5tb2RlbCc7XHJcbmltcG9ydCB7XHJcbiAgSUFsbG93RHJhZ0ZuLFxyXG4gIElBbGxvd0Ryb3BGbixcclxuICBJVHJlZU9wdGlvbnMsXHJcbiAgSVRyZWVTdGF0ZVxyXG59IGZyb20gJy4vZGVmcy9hcGknO1xyXG5pbXBvcnQgeyBLRVlTIH0gZnJvbSAnLi9jb25zdGFudHMva2V5cyc7XHJcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4vbW9kZWxzL3RyZWUubW9kZWwnO1xyXG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4vbW9kZWxzL3RyZWUtbm9kZS5tb2RlbCc7XHJcbmltcG9ydCB7IFRyZWVEcmFnZ2VkRWxlbWVudCB9IGZyb20gJy4vbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZVZpcnR1YWxTY3JvbGwgfSBmcm9tICcuL21vZGVscy90cmVlLXZpcnR1YWwtc2Nyb2xsLm1vZGVsJztcclxuaW1wb3J0IHsgTG9hZGluZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sb2FkaW5nLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRyZWVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUcmVlTm9kZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLW5vZGUtY29sbGVjdGlvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUcmVlTm9kZUNvbnRlbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVHJlZU5vZGVEcm9wU2xvdCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLW5vZGUtZHJvcC1zbG90LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRyZWVOb2RlRXhwYW5kZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS1ub2RlLWV4cGFuZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRyZWVOb2RlQ2hpbGRyZW5Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNvbGxlY3Rpb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVHJlZU5vZGVDb2xsZWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUtbm9kZS1jb2xsZWN0aW9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRyZWVOb2RlV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLW5vZGUtd3JhcHBlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUcmVlVmlld3BvcnRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS12aWV3cG9ydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUcmVlTm9kZUNoZWNrYm94Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUtbm9kZS1jaGVja2JveC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUcmVlRHJvcERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy90cmVlLWRyb3AuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgVHJlZURyYWdEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdHJlZS1kcmFnLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRyZWVBbmltYXRlT3BlbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy90cmVlLWFuaW1hdGUtb3Blbi5kaXJlY3RpdmUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIFRyZWVDb21wb25lbnQsXHJcbiAgICBUcmVlTm9kZUNvbXBvbmVudCxcclxuICAgIFRyZWVOb2RlQ29udGVudCxcclxuICAgIExvYWRpbmdDb21wb25lbnQsXHJcbiAgICBUcmVlRHJvcERpcmVjdGl2ZSxcclxuICAgIFRyZWVEcmFnRGlyZWN0aXZlLFxyXG4gICAgVHJlZU5vZGVFeHBhbmRlckNvbXBvbmVudCxcclxuICAgIFRyZWVOb2RlQ2hpbGRyZW5Db21wb25lbnQsXHJcbiAgICBUcmVlTm9kZURyb3BTbG90LFxyXG4gICAgVHJlZU5vZGVDb2xsZWN0aW9uQ29tcG9uZW50LFxyXG4gICAgVHJlZVZpZXdwb3J0Q29tcG9uZW50LFxyXG4gICAgVHJlZU5vZGVXcmFwcGVyQ29tcG9uZW50LFxyXG4gICAgVHJlZU5vZGVDaGVja2JveENvbXBvbmVudCxcclxuICAgIFRyZWVBbmltYXRlT3BlbkRpcmVjdGl2ZSxcclxuICAgIFRyZWVNb2J4QXV0b3J1bkRpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgVHJlZUNvbXBvbmVudCxcclxuICAgIFRyZWVOb2RlQ29tcG9uZW50LFxyXG4gICAgVHJlZU5vZGVDb250ZW50LFxyXG4gICAgTG9hZGluZ0NvbXBvbmVudCxcclxuICAgIFRyZWVEcm9wRGlyZWN0aXZlLFxyXG4gICAgVHJlZURyYWdEaXJlY3RpdmUsXHJcbiAgICBUcmVlTm9kZUV4cGFuZGVyQ29tcG9uZW50LFxyXG4gICAgVHJlZU5vZGVDaGlsZHJlbkNvbXBvbmVudCxcclxuICAgIFRyZWVOb2RlRHJvcFNsb3QsXHJcbiAgICBUcmVlTm9kZUNvbGxlY3Rpb25Db21wb25lbnQsXHJcbiAgICBUcmVlVmlld3BvcnRDb21wb25lbnQsXHJcbiAgICBUcmVlTm9kZVdyYXBwZXJDb21wb25lbnQsXHJcbiAgICBUcmVlTm9kZUNoZWNrYm94Q29tcG9uZW50LFxyXG4gICAgVHJlZUFuaW1hdGVPcGVuRGlyZWN0aXZlLFxyXG4gICAgVHJlZU1vYnhBdXRvcnVuRGlyZWN0aXZlXHJcbiAgXSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICBwcm92aWRlcnM6IFtdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmVlTW9kdWxlIHt9XHJcblxyXG5leHBvcnQge1xyXG4gIFRyZWVNb2RlbCxcclxuICBUcmVlTm9kZSxcclxuICBUcmVlRHJhZ2dlZEVsZW1lbnQsXHJcbiAgVHJlZVZpcnR1YWxTY3JvbGwsXHJcbiAgSVRyZWVPcHRpb25zLFxyXG4gIFRSRUVfQUNUSU9OUyxcclxuICBLRVlTLFxyXG4gIElBY3Rpb25NYXBwaW5nLFxyXG4gIElBY3Rpb25IYW5kbGVyLFxyXG4gIElBbGxvd0Ryb3BGbixcclxuICBJQWxsb3dEcmFnRm4sXHJcbiAgTG9hZGluZ0NvbXBvbmVudCxcclxuICBUcmVlQW5pbWF0ZU9wZW5EaXJlY3RpdmUsXHJcbiAgVHJlZUNvbXBvbmVudCxcclxuICBUcmVlTm9kZUNvbXBvbmVudCxcclxuICBUcmVlTm9kZVdyYXBwZXJDb21wb25lbnQsXHJcbiAgVHJlZU5vZGVDb250ZW50LFxyXG4gIFRyZWVEcm9wRGlyZWN0aXZlLFxyXG4gIFRyZWVEcmFnRGlyZWN0aXZlLFxyXG4gIFRyZWVOb2RlRXhwYW5kZXJDb21wb25lbnQsXHJcbiAgVHJlZU5vZGVDaGlsZHJlbkNvbXBvbmVudCxcclxuICBUcmVlTm9kZURyb3BTbG90LFxyXG4gIFRyZWVOb2RlQ29sbGVjdGlvbkNvbXBvbmVudCxcclxuICBUcmVlVmlld3BvcnRDb21wb25lbnQsXHJcbiAgVHJlZU5vZGVDaGVja2JveENvbXBvbmVudCxcclxuICBJVHJlZVN0YXRlLFxyXG4gIFRyZWVNb2J4QXV0b3J1bkRpcmVjdGl2ZVxyXG59O1xyXG4iXX0=