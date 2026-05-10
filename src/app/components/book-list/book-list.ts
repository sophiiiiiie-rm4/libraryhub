import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BookService, Book } from '../../services/book';
import { FavoriteService } from '../../services/favorite';
import { BookCardComponent } from '../book-card/book-card';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, BookCardComponent],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css']
})
export class BookListComponent {
  query = '';
  category = 'Toutes';

  constructor(public bookService: BookService, public favService: FavoriteService) {}

  get books() { return this.bookService.getBooks(); }
  get categories() { return this.bookService.getCategories(); }

  get filtered(): Book[] {
    return this.books.filter(b => {
      const q = this.query.toLowerCase();
      return (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
        && (this.category === 'Toutes' || b.category === this.category);
    });
  }

  toggleFav(id: number) { this.favService.toggle(id); }
  isFav(id: number) { return this.favService.isFav(id); }
}
