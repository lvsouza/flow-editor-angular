import { Component, Input } from '@angular/core';
import { IItem } from 'src/app/interfaces/IItem';

@Component({
  selector: '[app-line]',
  templateUrl: './line.component.html',
})
export class LineComponent {
  fowardItem: IItem;
  @Input() item: IItem;
  @Input() nextItem?: IItem;

  /** Get angue from a grup of coords */
  public get angle(): number {
    let angle = Math.atan2(this.item.left - this.nextItem.left, this.item.top - this.nextItem.top) * (180 / Math.PI);

    if (angle < 0) {
      angle = Math.abs(angle);
    } else {
      angle = 360 - angle;
    }

    return angle;
  }

  constructor() {
  }


  /** Get line distance */
  public getLineDistance(top2: number, top: number, left2: number, left: number) {
    return Math.hypot((top2 - top), (left2 - left));
  }

  // Item
  public getX1(x1: number) {
    if (this.angle > 225 && this.angle < 315) {
      return x1 - (this.nextItem.width / 2);

    } else if ((this.angle > 315 && this.angle < 45) || (this.angle > 135 && this.angle < 225)) {
      return x1;

    } else if (this.angle > 45 && this.angle < 135) {
      return x1 + (this.nextItem.width / 2);

    }

    return x1;
  }
  public getY1(y1: number) {
    if (this.angle > 315 || this.angle < 45) {
      return y1 - this.nextItem.height;

    } else if ((this.angle > 225 && this.angle < 315) || (this.angle < 135 && this.angle > 45)) {
      return y1 - (this.nextItem.height / 2);

    } else if (this.angle < 225 && this.angle > 135) {
      return y1;

    }

    return y1;
  }

  // Next item
  public getX2(x2: number) {
    if (this.angle > 225 && this.angle < 315) {
      return x2 + (this.nextItem.width / 2);

    } else if ((this.angle > 315 && this.angle < 45) || (this.angle > 135 && this.angle < 225)) {
      return x2;

    } else if (this.angle > 45 && this.angle < 135) {
      return x2 - (this.nextItem.width / 2);

    }

    return x2;
  }
  public getY2(y2: number) {
    if (this.angle > 315 || this.angle < 45) {
      return y2 + this.nextItem.height;

    } else if ((this.angle > 225 && this.angle < 315) || (this.angle < 135 && this.angle > 45)) {
      return y2 + (this.nextItem.height / 2);

    } else if (this.angle < 225 && this.angle > 135) {
      return y2;

    }

    return y2;
  }
}
