import { Component, Input, OnInit } from '@angular/core';
import { IItem } from 'src/app/interfaces/IItem';

type Sides = 'left' | 'top' | 'right' | 'bottom';

@Component({
  selector: '[app-line]',
  templateUrl: './line.component.html',
})
export class LineComponent implements OnInit {
  fowardItem: IItem;
  @Input() item: IItem;
  @Input() nextItem?: IItem;

  /** Get angue from a grup of coords */
  public get angle(): number {
    if (!this.nextItem || !this.item) return 0;

    let angle = Math.atan2(this.item.left - this.nextItem.left, this.item.top - this.nextItem.top) * (180 / Math.PI);

    if (angle < 0) {
      angle = Math.abs(angle);
    } else {
      angle = 360 - angle;
    }

    return angle;
  }

  private get sideAngle(): number {
    if (this.angle >= 45 && this.angle <= 135) {// Left
      return this.angle - 45;

    } else if (this.angle >= 135 && this.angle <= 225) {// Top
      return this.angle - 135;

    } else if (this.angle >= 225 && this.angle <= 315) {// Right
      return this.angle - 225;

    } else if ((this.angle >= 315 && this.angle <= 360) || (this.angle >= 0 && this.angle <= 45)) {// Bottom
      if (this.angle >= 315 && this.angle <= 360) {// Bottom - Left
        return this.angle - 315;

      } else {// Bottom - Right
        return this.angle + 45;
      }
    }
  }

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      if (!this.nextItem || !this.item) return;

      console.log('angle: ', this.angle)
      console.log('sideAngle: ', this.sideAngle)
      console.log('getCurrentSide: ', this.getCurrentSide(this.angle))
    }, 100);
  }

  private getCurrentSide(angle: number): Sides {
    if (angle >= 45 && angle <= 135) {// Left
      return 'left';

    } else if (angle >= 135 && angle <= 225) {// Top
      return 'top';

    } else if (angle >= 225 && angle <= 315) {// Right
      return 'right';

    } else if ((angle >= 315 && angle <= 360) || (angle >= 0 && angle <= 45)) {// Bottom
      return 'bottom';
    }
  }


  /** Get line distance */
  public getLineDistance(top2: number, top: number, left2: number, left: number) {
    return Math.hypot((top2 - top), (left2 - left));
  }

  private getPositionByAngle(value: number, sideAngle: number, space: number) {
    const sideAnglePercent = (sideAngle * 100) / 90;

    const spaceBySideAnglePercent = (space * sideAnglePercent) / 100;

    return value - spaceBySideAnglePercent;
  }

  // Item
  public getX1(x1: number) {

    switch (this.getCurrentSide(this.angle)) {
      case 'left':
        return x1 + this.item.width;
      case 'top':
        return this.getPositionByAngle(x1 + this.item.width, this.sideAngle, this.item.width);
      case 'right':
        return x1;
      case 'bottom':
        return this.getPositionByAngle(x1, this.sideAngle, -this.item.width);
    }
  }
  public getY1(y1: number) {

    switch (this.getCurrentSide(this.angle)) {
      case 'left':
        return this.getPositionByAngle(y1, this.sideAngle, -this.item.height);
      case 'top':
        return y1 + this.item.height;
      case 'right':
        return this.getPositionByAngle(y1 + this.item.height, this.sideAngle, this.item.height);
      case 'bottom':
        return y1;
    }
  }

  // Next item
  public getX2(x2: number) {

    switch (this.getCurrentSide(this.angle)) {
      case 'left':
        return x2;
      case 'top':
        return this.getPositionByAngle(x2, this.sideAngle, -this.nextItem.width);
      case 'right':
        return x2 + this.nextItem.width;
      case 'bottom':
        return this.getPositionByAngle(x2 + this.nextItem.width, this.sideAngle, this.nextItem.width);
    }
  }
  public getY2(y2: number) {

    switch (this.getCurrentSide(this.angle)) {
      case 'left':
        return this.getPositionByAngle(y2 + this.nextItem.height, this.sideAngle, this.nextItem.height);
      case 'top':
        return y2;
      case 'right':
        return this.getPositionByAngle(y2, this.sideAngle, -this.nextItem.height);
      case 'bottom':
        return y2 + this.nextItem.height;
    }
  }
}
