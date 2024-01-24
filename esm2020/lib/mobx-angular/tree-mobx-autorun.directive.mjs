import { Directive, Input } from '@angular/core';
import { autorun } from 'mobx';
import * as i0 from "@angular/core";
export class TreeMobxAutorunDirective {
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.templateBindings = {};
    }
    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.templateRef);
        if (this.dispose) {
            this.dispose();
        }
        if (this.shouldDetach()) {
            this.view.detach();
        }
        this.autoDetect(this.view);
    }
    shouldDetach() {
        return this.treeMobxAutorun && this.treeMobxAutorun.detach;
    }
    autoDetect(view) {
        this.dispose = autorun(() => view.detectChanges());
    }
    ngOnDestroy() {
        if (this.dispose) {
            this.dispose();
        }
    }
}
/** @nocollapse */ TreeMobxAutorunDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeMobxAutorunDirective, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ TreeMobxAutorunDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.3.0", type: TreeMobxAutorunDirective, selector: "[treeMobxAutorun]", inputs: { treeMobxAutorun: "treeMobxAutorun" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeMobxAutorunDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[treeMobxAutorun]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }]; }, propDecorators: { treeMobxAutorun: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tb2J4LWF1dG9ydW4uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci10cmVlLWNvbXBvbmVudC9zcmMvbGliL21vYngtYW5ndWxhci90cmVlLW1vYngtYXV0b3J1bi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFLVCxLQUFLLEVBRU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFHL0IsTUFBTSxPQUFPLHdCQUF3QjtJQU1uQyxZQUNZLFdBQTZCLEVBQzdCLGFBQStCO1FBRC9CLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFQakMscUJBQWdCLEdBQUcsRUFBRSxDQUFDO0lBUTdCLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVwRSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNwQjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO0lBQzdELENBQUM7SUFFRCxVQUFVLENBQUMsSUFBMEI7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQzs7d0lBcENVLHdCQUF3Qjs0SEFBeEIsd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBRHBDLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7aUlBS2pDLGVBQWU7c0JBQXZCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgSW5wdXQsXHJcbiAgRW1iZWRkZWRWaWV3UmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGF1dG9ydW4gfSBmcm9tICdtb2J4JztcclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t0cmVlTW9ieEF1dG9ydW5dJyB9KVxyXG5leHBvcnQgY2xhc3MgVHJlZU1vYnhBdXRvcnVuRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByb3RlY3RlZCB0ZW1wbGF0ZUJpbmRpbmdzID0ge307XHJcbiAgcHJvdGVjdGVkIGRpc3Bvc2U6IGFueTtcclxuICBwcm90ZWN0ZWQgdmlldzogRW1iZWRkZWRWaWV3UmVmPGFueT47XHJcbiAgQElucHV0KCkgdHJlZU1vYnhBdXRvcnVuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PixcclxuICAgIHByb3RlY3RlZCB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudmlldyA9IHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZik7XHJcblxyXG4gICAgaWYgKHRoaXMuZGlzcG9zZSkge1xyXG4gICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zaG91bGREZXRhY2goKSkge1xyXG4gICAgICB0aGlzLnZpZXcuZGV0YWNoKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmF1dG9EZXRlY3QodGhpcy52aWV3KTtcclxuICB9XHJcblxyXG4gIHNob3VsZERldGFjaCgpIHtcclxuICAgIHJldHVybiB0aGlzLnRyZWVNb2J4QXV0b3J1biAmJiB0aGlzLnRyZWVNb2J4QXV0b3J1bi5kZXRhY2g7XHJcbiAgfVxyXG5cclxuICBhdXRvRGV0ZWN0KHZpZXc6IEVtYmVkZGVkVmlld1JlZjxhbnk+KSB7XHJcbiAgICB0aGlzLmRpc3Bvc2UgPSBhdXRvcnVuKCgpID0+IHZpZXcuZGV0ZWN0Q2hhbmdlcygpKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuZGlzcG9zZSkge1xyXG4gICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19