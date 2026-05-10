import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../services/book';
import { BookCardComponent } from '../book-card/book-card';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css']
})
export class FavoritesComponent {
  @Input() books: Book[] = [];
  @Input() favorites = new Set<number>();
  @Output() bookSelected = new EventEmitter<Book>();
  @Output() favToggled = new EventEmitter<number>();

  get favBooks(): Book[] { return this.books.filter(b => this.favorites.has(b.id)); }
}