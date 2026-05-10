import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService, Book, Review } from './services/book';
import { FavoriteService } from './services/favorite';
import { NavComponent } from './components/nav/nav';
import { BookListComponent } from './components/book-list/book-list';
import { BookDetailComponent } from './components/book-detail/book-detail';
import { FavoritesComponent } from './components/favorites/favorites';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavComponent, BookListComponent, BookDetailComponent, FavoritesComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  view: 'home' | 'favorites' = 'home';
  selectedBook: Book | null = null;

  constructor(public bookService: BookService, public favService: FavoriteService) {}

  get books() { return this.bookService.getBooks(); }
  get categories() { return this.bookService.getCategories(); }
  get favorites() { return this.favService.getAll(); }
  get favCount() { return this.favService.count(); }

  onNavChange(v: string) { this.view = v as 'home' | 'favorites'; this.selectedBook = null; }
  onBookSelected(b: Book) { this.selectedBook = b; }
  onFavToggled(id: number) { this.favService.toggle(id); }
  onModalClosed() { this.selectedBook = null; }
  onReviewAdded(e: { bookId: number, review: Review }) {
    this.bookService.addReview(e.bookId, e.review);
  }
}