import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../models/tree-dragged-element.model";
const DRAG_OVER_CLASS = 'is-dragging-over';
const DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';
export class TreeDropDirective {
    constructor(el, renderer, treeDraggedElement, ngZone) {
        this.el = el;
        this.renderer = renderer;
        this.treeDraggedElement = treeDraggedElement;
        this.ngZone = ngZone;
        this.allowDragoverStyling = true;
        this.onDropCallback = new EventEmitter();
        this.onDragOverCallback = new EventEmitter();
        this.onDragLeaveCallback = new EventEmitter();
        this.onDragEnterCallback = new EventEmitter();
        this._allowDrop = (element, $event) => true;
        this.dragOverEventHandler = this.onDragOver.bind(this);
        this.dragEnterEventHandler = this.onDragEnter.bind(this);
        this.dragLeaveEventHandler = this.onDragLeave.bind(this);
    }
    set treeAllowDrop(allowDrop) {
        if (allowDrop instanceof Function) {
            this._allowDrop = allowDrop;
        }
        else
            this._allowDrop = (element, $event) => allowDrop;
    }
    allowDrop($event) {
        return this._allowDrop(this.treeDraggedElement.get(), $event);
    }
    ngAfterViewInit() {
        let el = this.el.nativeElement;
        this.ngZone.runOutsideAngular(() => {
            el.addEventListener('dragover', this.dragOverEventHandler);
            el.addEventListener('dragenter', this.dragEnterEventHandler);
            el.addEventListener('dragleave', this.dragLeaveEventHandler);
        });
    }
    ngOnDestroy() {
        let el = this.el.nativeElement;
        el.removeEventListener('dragover', this.dragOverEventHandler);
        el.removeEventListener('dragenter', this.dragEnterEventHandler);
        el.removeEventListener('dragleave', this.dragLeaveEventHandler);
    }
    onDragOver($event) {
        if (!this.allowDrop($event)) {
            if (this.allowDragoverStyling) {
                return this.addDisabledClass();
            }
            return;
        }
        this.onDragOverCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        $event.preventDefault();
        if (this.allowDragoverStyling) {
            this.addClass();
        }
    }
    onDragEnter($event) {
        if (!this.allowDrop($event))
            return;
        $event.preventDefault();
        this.onDragEnterCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
    }
    onDragLeave($event) {
        if (!this.allowDrop($event)) {
            if (this.allowDragoverStyling) {
                return this.removeDisabledClass();
            }
            return;
        }
        this.onDragLeaveCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        if (this.allowDragoverStyling) {
            this.removeClass();
        }
    }
    onDrop($event) {
        if (!this.allowDrop($event))
            return;
        $event.preventDefault();
        this.onDropCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        if (this.allowDragoverStyling) {
            this.removeClass();
        }
        this.treeDraggedElement.set(null);
    }
    addClass() {
        this.renderer.addClass(this.el.nativeElement, DRAG_OVER_CLASS);
    }
    removeClass() {
        this.renderer.removeClass(this.el.nativeElement, DRAG_OVER_CLASS);
    }
    addDisabledClass() {
        this.renderer.addClass(this.el.nativeElement, DRAG_DISABLED_CLASS);
    }
    removeDisabledClass() {
        this.renderer.removeClass(this.el.nativeElement, DRAG_DISABLED_CLASS);
    }
}
/** @nocollapse */ TreeDropDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeDropDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.TreeDraggedElement }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ TreeDropDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.3.0", type: TreeDropDirective, selector: "[treeDrop]", inputs: { allowDragoverStyling: "allowDragoverStyling", treeAllowDrop: "treeAllowDrop" }, outputs: { onDropCallback: "treeDrop", onDragOverCallback: "treeDropDragOver", onDragLeaveCallback: "treeDropDragLeave", onDragEnterCallback: "treeDropDragEnter" }, host: { listeners: { "drop": "onDrop($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TreeDropDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[treeDrop]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.TreeDraggedElement }, { type: i0.NgZone }]; }, propDecorators: { allowDragoverStyling: [{
                type: Input
            }], onDropCallback: [{
                type: Output,
                args: ['treeDrop']
            }], onDragOverCallback: [{
                type: Output,
                args: ['treeDropDragOver']
            }], onDragLeaveCallback: [{
                type: Output,
                args: ['treeDropDragLeave']
            }], onDragEnterCallback: [{
                type: Output,
                args: ['treeDropDragEnter']
            }], treeAllowDrop: [{
                type: Input
            }], onDrop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcm9wLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItdHJlZS1jb21wb25lbnQvc3JjL2xpYi9kaXJlY3RpdmVzL3RyZWUtZHJvcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFFVCxZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUM7OztBQUd2QixNQUFNLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQztBQUMzQyxNQUFNLG1CQUFtQixHQUFHLDJCQUEyQixDQUFDO0FBS3hELE1BQU0sT0FBTyxpQkFBaUI7SUF1QjVCLFlBQW9CLEVBQWMsRUFBVSxRQUFtQixFQUFVLGtCQUFzQyxFQUFVLE1BQWM7UUFBbkgsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQXRCOUgseUJBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1Qix1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLHdCQUFtQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDekMsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUs5RCxlQUFVLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFjN0MsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMs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QUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUN4RSxDQUFDOztpSUE1R1UsaUJBQWlCO3FIQUFqQixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFIN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtpQkFDdkI7K0tBRVUsb0JBQW9CO3NCQUE1QixLQUFLO2dCQUNjLGNBQWM7c0JBQWpDLE1BQU07dUJBQUMsVUFBVTtnQkFDVSxrQkFBa0I7c0JBQTdDLE1BQU07dUJBQUMsa0JBQWtCO2dCQUNHLG1CQUFtQjtzQkFBL0MsTUFBTTt1QkFBQyxtQkFBbUI7Z0JBQ0UsbUJBQW1CO3NCQUEvQyxNQUFNO3VCQUFDLG1CQUFtQjtnQkFPZCxhQUFhO3NCQUF6QixLQUFLO2dCQXNFNEIsTUFBTTtzQkFBdkMsWUFBWTt1QkFBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgT25EZXN0cm95LFxyXG4gIE91dHB1dCxcclxuICBSZW5kZXJlcjJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsJztcclxuXHJcbmNvbnN0IERSQUdfT1ZFUl9DTEFTUyA9ICdpcy1kcmFnZ2luZy1vdmVyJztcclxuY29uc3QgRFJBR19ESVNBQkxFRF9DTEFTUyA9ICdpcy1kcmFnZ2luZy1vdmVyLWRpc2FibGVkJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3RyZWVEcm9wXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRyZWVEcm9wRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBhbGxvd0RyYWdvdmVyU3R5bGluZyA9IHRydWU7XHJcbiAgQE91dHB1dCgndHJlZURyb3AnKSBvbkRyb3BDYWxsYmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCd0cmVlRHJvcERyYWdPdmVyJykgb25EcmFnT3ZlckNhbGxiYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoJ3RyZWVEcm9wRHJhZ0xlYXZlJykgb25EcmFnTGVhdmVDYWxsYmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCd0cmVlRHJvcERyYWdFbnRlcicpIG9uRHJhZ0VudGVyQ2FsbGJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBkcmFnT3ZlckV2ZW50SGFuZGxlcjogKGV2OiBEcmFnRXZlbnQpID0+IHZvaWQ7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBkcmFnRW50ZXJFdmVudEhhbmRsZXI6IChldjogRHJhZ0V2ZW50KSA9PiB2b2lkO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZHJhZ0xlYXZlRXZlbnRIYW5kbGVyOiAoZXY6IERyYWdFdmVudCkgPT4gdm9pZDtcclxuXHJcbiAgcHJpdmF0ZSBfYWxsb3dEcm9wID0gKGVsZW1lbnQsICRldmVudCkgPT4gdHJ1ZTtcclxuXHJcbiAgQElucHV0KCkgc2V0IHRyZWVBbGxvd0Ryb3AoYWxsb3dEcm9wKSB7XHJcbiAgICBpZiAoYWxsb3dEcm9wIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgdGhpcy5fYWxsb3dEcm9wID0gYWxsb3dEcm9wO1xyXG4gICAgfVxyXG4gICAgZWxzZSB0aGlzLl9hbGxvd0Ryb3AgPSAoZWxlbWVudCwgJGV2ZW50KSA9PiBhbGxvd0Ryb3A7XHJcbiAgfVxyXG5cclxuICBhbGxvd0Ryb3AoJGV2ZW50KSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWxsb3dEcm9wKHRoaXMudHJlZURyYWdnZWRFbGVtZW50LmdldCgpLCAkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIHRyZWVEcmFnZ2VkRWxlbWVudDogVHJlZURyYWdnZWRFbGVtZW50LCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XHJcbiAgICB0aGlzLmRyYWdPdmVyRXZlbnRIYW5kbGVyID0gdGhpcy5vbkRyYWdPdmVyLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmRyYWdFbnRlckV2ZW50SGFuZGxlciA9IHRoaXMub25EcmFnRW50ZXIuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuZHJhZ0xlYXZlRXZlbnRIYW5kbGVyID0gdGhpcy5vbkRyYWdMZWF2ZS5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgbGV0IGVsOiBIVE1MRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcclxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVyRXZlbnRIYW5kbGVyKTtcclxuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgdGhpcy5kcmFnRW50ZXJFdmVudEhhbmRsZXIpO1xyXG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCB0aGlzLmRyYWdMZWF2ZUV2ZW50SGFuZGxlcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgbGV0IGVsOiBIVE1MRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcclxuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5kcmFnT3ZlckV2ZW50SGFuZGxlcik7XHJcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCB0aGlzLmRyYWdFbnRlckV2ZW50SGFuZGxlcik7XHJcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCB0aGlzLmRyYWdMZWF2ZUV2ZW50SGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBvbkRyYWdPdmVyKCRldmVudCkge1xyXG4gICAgaWYgKCF0aGlzLmFsbG93RHJvcCgkZXZlbnQpKSB7XHJcbiAgICAgIGlmICh0aGlzLmFsbG93RHJhZ292ZXJTdHlsaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkRGlzYWJsZWRDbGFzcygpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9uRHJhZ092ZXJDYWxsYmFjay5lbWl0KHtldmVudDogJGV2ZW50LCBlbGVtZW50OiB0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5nZXQoKX0pO1xyXG5cclxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYgKHRoaXMuYWxsb3dEcmFnb3ZlclN0eWxpbmcpIHtcclxuICAgICAgdGhpcy5hZGRDbGFzcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25EcmFnRW50ZXIoJGV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuYWxsb3dEcm9wKCRldmVudCkpIHJldHVybjtcclxuXHJcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMub25EcmFnRW50ZXJDYWxsYmFjay5lbWl0KHtldmVudDogJGV2ZW50LCBlbGVtZW50OiB0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5nZXQoKX0pO1xyXG4gIH1cclxuXHJcbiAgb25EcmFnTGVhdmUoJGV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuYWxsb3dEcm9wKCRldmVudCkpIHtcclxuICAgICAgaWYgKHRoaXMuYWxsb3dEcmFnb3ZlclN0eWxpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVEaXNhYmxlZENsYXNzKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vbkRyYWdMZWF2ZUNhbGxiYWNrLmVtaXQoe2V2ZW50OiAkZXZlbnQsIGVsZW1lbnQ6IHRoaXMudHJlZURyYWdnZWRFbGVtZW50LmdldCgpfSk7XHJcblxyXG4gICAgaWYgKHRoaXMuYWxsb3dEcmFnb3ZlclN0eWxpbmcpIHtcclxuICAgICAgdGhpcy5yZW1vdmVDbGFzcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pIG9uRHJvcCgkZXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5hbGxvd0Ryb3AoJGV2ZW50KSkgcmV0dXJuO1xyXG5cclxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5vbkRyb3BDYWxsYmFjay5lbWl0KHtldmVudDogJGV2ZW50LCBlbGVtZW50OiB0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5nZXQoKX0pO1xyXG5cclxuICAgIGlmICh0aGlzLmFsbG93RHJhZ292ZXJTdHlsaW5nKSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoKTtcclxuICAgIH1cclxuICAgIHRoaXMudHJlZURyYWdnZWRFbGVtZW50LnNldChudWxsKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkQ2xhc3MoKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgRFJBR19PVkVSX0NMQVNTKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlQ2xhc3MoKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgRFJBR19PVkVSX0NMQVNTKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkRGlzYWJsZWRDbGFzcygpIHtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBEUkFHX0RJU0FCTEVEX0NMQVNTKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlRGlzYWJsZWRDbGFzcygpIHtcclxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBEUkFHX0RJU0FCTEVEX0NMQVNTKTtcclxuICB9XHJcbn1cclxuIl19