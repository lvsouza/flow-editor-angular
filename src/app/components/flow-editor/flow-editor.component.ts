import { Component, Input } from '@angular/core';
import { IItem } from './../../interfaces/IItem';

@Component({
  selector: 'app-flow-editor',
  templateUrl: './flow-editor.component.html',
  styleUrls: ['./flow-editor.component.css']
})
export class FlowEditorComponent {
  @Input() items: IItem[] = [];
  @Input() snapGridWhileDrag?: boolean = false;

  public zoom: number = 1;
  public boardTop: number = 0;
  public boardLeft: number = 0;

  constructor() { }

  get getBackgroundSize() {
    return ((15 / devicePixelRatio) / this.zoom);
  }

  selectByIndex(e: MouseEvent, index: number, keepSelected: boolean = false) {
    e.stopPropagation();

    this.items.forEach((item, currentIndex) => item.isSelected = (currentIndex === index || (item.isSelected && keepSelected)));
  }

  addItem(e: MouseEvent) {
    e.stopPropagation();

    this.items.push({
      id: this.items.length,
      width: 200,
      height: 100,
      text: 'Testando',
      top: e.offsetY - 50,
      left: e.offsetX - 100,
    })
  }

  clickOutside(e: MouseEvent) {
    e.stopPropagation();

    this.items.forEach(item => item.isSelected = false);
  }
}
