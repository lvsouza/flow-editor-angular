export interface IItem {
  id: number | string;
  top: number;
  left: number;
  width: number;
  height: number;
  text: string;
  fillColor?: string;
  isSelected?: boolean;
}
