import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[enableZoom]'
})
export class ZoomDirective implements OnInit, OnDestroy {
  /**
   *
   */
  @Input() zoom: number = 1;
  @Output() zoomChange = new EventEmitter<number>();

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.style.zoom = this.zoom;

    document.addEventListener('wheel', e => {
      e.preventDefault();
    });
    window.addEventListener('wheel', e => {
      e.preventDefault();
      this.handleWhell(e);

      return false
    });
  }

  ngOnDestroy() {
    window.removeEventListener('wheel', e => this.handleWhell(e));
  }

  private handleWhell(e: WheelEvent) {
    if (e.altKey) {
      if (e.deltaY > 0 && this.zoom > 0.01) {
        this.elementRef.nativeElement.style.zoom = this.zoom - 0.05;
        this.zoomChange.emit(this.zoom - 0.05);
      } else if (this.zoom < 5) {
        this.elementRef.nativeElement.style.zoom = this.zoom + 0.05;
        this.zoomChange.emit(this.zoom + 0.05);
      }
    }
  }
}
