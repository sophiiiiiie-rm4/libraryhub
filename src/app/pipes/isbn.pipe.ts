import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isbn', standalone: true })
export class IsbnPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const digits = value.replace(/[^0-9X]/gi, '');
    if (digits.length === 13) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 4)}-${digits.slice(4, 8)}-${digits.slice(8, 12)}-${digits.slice(12)}`;
    }
    if (digits.length === 10) {
      return `${digits.slice(0, 1)}-${digits.slice(1, 5)}-${digits.slice(5, 9)}-${digits.slice(9)}`;
    }
    return value;
  }
}
