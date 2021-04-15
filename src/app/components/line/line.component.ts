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

  constructor() { }


  /** Get line distance */
  public getLineDistance(top2: number, top: number, left2: number, left: number) {
    return Math.hypot((top2 - top), (left2 - left));
  }

  // Item
  public getX1(x1: number) {

    // 225 - 315
    if (this.angle < 315 && this.angle > 225) {
      return x1 - (this.item.width / 2);

      // 315 - 0 - 45
    } else if (this.angle > 315 || this.angle < 45) {
      if (this.angle > 315 && this.angle < 335) {
        return x1 - (this.item.width / 4);

      } else if (this.angle > 25 && this.angle < 45) {
        return x1 + (this.item.width / 4);

      }

      return x1;

      // 135 - 225
    } else if (this.angle < 225 && this.angle > 135) {
      if (this.angle > 190) {
        return x1 - (this.item.width / 4);

      } else if (this.angle < 170) {
        return x1 + (this.item.width / 4);

      }

      return x1;

      // 45 - 135
    } else if (this.angle > 45 && this.angle < 135) {
      return x1 + (this.item.width / 2);

    }

    return x1;
  }
  public getY1(y1: number) {

    // 315 - 0 - 45
    if (this.angle > 315 || this.angle < 45) {
      return y1 - this.item.height;

      // 225 - 315
    } else if (this.angle > 225 && this.angle < 315) {
      if (this.angle > 225 && this.angle < 250) {
        return (y1 - (this.item.height / 2)) + (this.item.height / 4);

      } else if (this.angle > 290 && this.angle < 315) {
        return (y1 - (this.item.height / 2)) - (this.item.height / 4);

      }

      return y1 - (this.item.height / 2);

      // 45 - 135
    } else if (this.angle < 135 && this.angle > 45) {
      if (this.angle > 115 && this.angle < 135) {
        return (y1 - (this.item.height / 2)) + (this.item.height / 4);

      } else if (this.angle > 45 && this.angle < 70) {
        return (y1 - (this.item.height / 2)) - (this.item.height / 4);

      }

      return y1 - (this.item.height / 2);

      // 135 - 225
    } else if (this.angle < 225 && this.angle > 135) {
      return y1;
    }

    return y1;
  }

  // Next item
  public getX2(x2: number) {

    // 225 - 315
    if (this.angle < 315 && this.angle > 225) {
      return x2 + (this.nextItem.width / 2) + 5;

      // 315 - 0 - 45
    } else if (this.angle > 315 || this.angle < 45) {
      if (this.angle > 315 && this.angle < 335) {
        return x2 + (this.nextItem.width / 4);

      } else if (this.angle > 25 && this.angle < 45) {
        return x2 - (this.nextItem.width / 4);

      }

      return x2;

      // 135 - 225
    } else if (this.angle < 225 && this.angle > 135) {
      if (this.angle > 190) {
        return x2 + (this.nextItem.width / 4);

      } else if (this.angle < 170) {
        return x2 - (this.nextItem.width / 4);

      }

      return x2;

      // 45 - 135
    } else if (this.angle > 45 && this.angle < 135) {
      return x2 - (this.nextItem.width / 2) - 5;

    }

    return x2;
  }
  public getY2(y2: number) {

    // 315 - 0 - 45 ---
    if (this.angle > 315 || this.angle < 45) {

      return y2 + this.nextItem.height + 5;

      // 225 - 315
    } else if (this.angle > 225 && this.angle < 315) {
      if (this.angle > 225 && this.angle < 250) {
        return (y2 + (this.nextItem.height / 2)) - (this.nextItem.height / 4);

      } else if (this.angle > 290 && this.angle < 315) {
        return (y2 + (this.nextItem.height / 2)) + (this.nextItem.height / 4);

      }

      return y2 + (this.nextItem.height / 2);

      // 45 - 135
    } else if (this.angle < 135 && this.angle > 45) {
      if (this.angle > 115 && this.angle < 135) {
        return (y2 + (this.nextItem.height / 2)) - (this.nextItem.height / 4);

      } else if (this.angle > 45 && this.angle < 70) {
        return (y2 + (this.nextItem.height / 2)) + (this.nextItem.height / 4);

      }

      return y2 + (this.nextItem.height / 2);

      // 135 - 225
    } else if (this.angle < 225 && this.angle > 135) {
      return y2 - 5;
    }

    return y2;
  }
}
