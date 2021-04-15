import { Directive, ElementRef, OnChanges, Input, OnInit, Output, OnDestroy, EventEmitter } from '@angular/core';

@Directive({
  selector: '[enableBackgroundDraggable]'
})
export class BackgroundDragDirective implements OnInit, OnChanges, OnDestroy {
  /**
   *
   */
  @Input() dragZoom: number = 1;
  /**
   *
   */
  @Input() top: number = 0;
  @Output() topChange = new EventEmitter<number>();
  /**
   *
   */
  @Input() left: number = 0;
  @Output() leftChange = new EventEmitter<number>();

  private isDragging = false;

  constructor(private elementRef: ElementRef<SVGElement>) { }

  ngOnInit() {
    this.elementRef.nativeElement.addEventListener('mousedown', e => this.mouseDown(e.button === 1));

    window.addEventListener('mousemove', e => this.mouseMove(e.movementY, e.movementX));
    window.addEventListener('mouseup', () => this.mouseUp());
  }

  ngOnChanges() {
    const gContent = (this.elementRef.nativeElement.children.item(0)) as SVGGElement;
    gContent.style.transform = `translate(${this.left}px, ${this.top}px)`;
  }

  ngOnDestroy() {
    window.removeEventListener('mousemove', e => this.mouseMove(e.movementY, e.movementX));
    window.removeEventListener('mouseup', () => this.mouseUp());
  }

  mouseDown(midleClicked: boolean) {
    if (midleClicked) {
      this.isDragging = true;
    }
  }

  mouseMove(movementY: number, movementX: number) {
    if (this.isDragging) {
      this.topChange.emit(this.top + (movementY / (devicePixelRatio)) / this.dragZoom);
      this.leftChange.emit(this.left + (movementX / (devicePixelRatio)) / this.dragZoom);
    }
  }

  mouseUp() {
    this.isDragging = false;
  }
}
