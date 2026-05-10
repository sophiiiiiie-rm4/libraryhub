import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private favorites = new Set<number>();

  toggle(id: number): void {
    this.favorites.has(id) ? this.favorites.delete(id) : this.favorites.add(id);
  }

  isFav(id: number): boolean { return this.favorites.has(id); }
  getAll(): Set<number> { return this.favorites; }
  count(): number { return this.favorites.size; }
}