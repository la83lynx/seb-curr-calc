import { formatNumber } from "@angular/common";

export function str(value: number): string {
  return formatNumber(value, 'en-US', '1.0-2');
}

export function num(value: string): number {
  return Number(value.replace(/,/g, ''));
}

export function getAdd(event: any, plus: boolean) {
  return (event.ctrlKey ? 0.01 : event.shiftKey ? 100 : 1) * (plus ? 1 : -1);
}
