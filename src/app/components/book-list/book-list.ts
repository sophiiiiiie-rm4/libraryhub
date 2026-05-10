import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../../services/book';
import { BookCardComponent } from '../book-card/book-card';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BookCardComponent],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css']
})
export class BookListComponent {
  @Input() books: Book[] = [];
  @Input() categories: string[] = [];
  @Input() favorites = new Set<number>();
  @Output() bookSelected = new EventEmitter<Book>();
  @Output() favToggled = new EventEmitter<number>();

  query = '';
  category = 'Toutes';

  get filtered(): Book[] {
    return this.books.filter(b => {
      const q = this.query.toLowerCase();
      return (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
        && (this.category === 'Toutes' || b.category === this.category);
    });
  }
}