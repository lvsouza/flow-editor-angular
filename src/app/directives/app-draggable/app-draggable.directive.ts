import { Directive, ElementRef, OnDestroy, OnChanges, Input, OnInit, Output, EventEmitter } from '@angular/core';

export interface DraggableOptions {
  top: number;
  left: number;
}

// 1
@Directive({
  selector: '[dragEnabled]',
})
export class DraggableDirective implements OnInit, OnDestroy, OnChanges {
  /**
   * Indica se está sendo aplicado algum tipo de zoom customizado.
   * 
   * @default 1
   */
  @Input() dragZoom?: number = 1;
  /**  */
  @Input() dragTop: number;
  @Output() dragTopChange = new EventEmitter<number>();
  /**  */
  @Input() dragLeft: number;
  @Output() dragLeftChange = new EventEmitter<number>();
  /** */
  @Input() dragDelimiterTop?: number = undefined;
  /** */
  @Input() dragDelimiterLeft?: number = undefined;
  /** */
  @Input() dragSnapGridWhileDrag?: boolean = false;
  /** */
  @Input() dragSnapGridSize?: number = 15;


  // Internal
  private redundantY = 0;
  private redundantX = 0;
  private isDragging = false;
  private snapGridRedundantY = 0;
  private snapGridRedundantX = 0;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.addEventListener('mousedown', () => this.mouseDown());

    window.addEventListener('mouseup', () => this.mouseUp());
    window.addEventListener('mousemove', e => this.mouseMove(e.movementY, e.movementX));
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.removeEventListener('mousedown', () => this.mouseDown());

    window.removeEventListener('mouseup', () => this.mouseUp());
    window.removeEventListener('mousemove', e => this.mouseMove(e.movementY, e.movementX));
  }

  ngOnChanges() {
    this.elementRef.nativeElement.setAttribute('y', this.dragTop);
    this.elementRef.nativeElement.setAttribute('x', this.dragLeft);
  }

  private mouseDown() {
    this.isDragging = true;
  }

  private mouseMove(movementY: number, movementX: number) {
    if (this.isDragging) {

      // TOP
      this.moveTop((movementY / (devicePixelRatio)) / this.dragZoom);

      // LEFT
      this.moveLeft((movementX / (devicePixelRatio)) / this.dragZoom);
    }
  }

  /** Reset local values */
  private mouseUp() {
    this.isDragging = false;
    this.redundantX = 0;
    this.redundantY = 0;
  }

  /**
   * Increment or decrement top input propertie
   * @param movementY All added movement
   */
  private moveTop(movementY: number) {
    if (this.dragDelimiterTop !== undefined) {
      const delimiter = this.dragDelimiterTop || 0;

      if ((this.dragTop >= delimiter || movementY > 0) && this.redundantY >= 0) {
        this.dragTopChange.emit(this.snapGrid(this.dragTop, movementY, 'Y'));
      } else {
        this.redundantY += movementY;
      }

    } else {
      this.dragTopChange.emit(this.snapGrid(this.dragTop, movementY, 'Y'));
    }
  }

  /**
   * Increment or decrement left input propertie
   * @param movementX All added movement
   */
  private moveLeft(movementX: number) {
    if (this.dragDelimiterLeft !== undefined) {
      const delimiter = this.dragDelimiterLeft || 0;

      if ((this.dragLeft >= delimiter || movementX > 0) && this.redundantX >= 0) {
        this.dragLeftChange.emit(this.snapGrid(this.dragLeft, movementX, 'X'));
      } else {
        this.redundantX += movementX;
      }

    } else {
      this.dragLeftChange.emit(this.snapGrid(this.dragLeft, movementX, 'X'));
    }
  }

  private snapGrid(oldMovement: number, newMovement: number, type: 'X' | 'Y') {
    if (this.dragSnapGridWhileDrag) {

      if (type === 'X') {
        this.snapGridRedundantX += newMovement;

        if (this.snapGridRedundantX <= -this.dragSnapGridSize || this.snapGridRedundantX >= this.dragSnapGridSize) {
          const movement = oldMovement + this.snapGridRedundantX;
          this.snapGridRedundantX = 0;
          return movement;
        } else {
          return oldMovement;
        }
      } else {
        this.snapGridRedundantY += newMovement;

        if (this.snapGridRedundantY <= -this.dragSnapGridSize || this.snapGridRedundantY >= this.dragSnapGridSize) {
          const movement = oldMovement + this.snapGridRedundantY;
          this.snapGridRedundantY = 0;
          return movement;
        } else {
          return oldMovement;
        }
      }
    } else {
      return oldMovement + newMovement;
    }
  }
}
