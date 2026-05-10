import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'availability', standalone: true })
export class AvailabilityPipe implements PipeTransform {
  transform(availableCopies: number, total: number): string {
    if (availableCopies === 0) return 'Indisponible';
    if (availableCopies === total) return 'Disponible';
    return `${availableCopies} / ${total} exemplaires`;
  }
}
