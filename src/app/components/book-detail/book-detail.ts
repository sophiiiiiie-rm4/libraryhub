import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { BookService, Book, Review } from '../../services/book';
import { FavoriteService } from '../../services/favorite';
import { IsbnPipe } from '../../pipes/isbn.pipe';
import { AvailabilityPipe } from '../../pipes/availability.pipe';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IsbnPipe, AvailabilityPipe],
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.css']
})
export class BookDetailComponent implements OnInit {
  book: Book | null = null;
  newReview = { user: '', comment: '', stars: 5 };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    public favService: FavoriteService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.book = this.bookService.getById(id) ?? null;
    if (!this.book) this.router.navigate(['/books']);
  }

  get isFav(): boolean {
    return this.book ? this.favService.isFav(this.book.id) : false;
  }

  toggleFav(): void {
    if (this.book) this.favService.toggle(this.book.id);
  }

  delete(): void {
    if (!this.book) return;
    if (confirm(`Supprimer "${this.book.title}" du catalogue ?`)) {
      this.bookService.delete(this.book.id);
      this.router.navigate(['/books']);
    }
  }

  setStars(n: number): void { this.newReview.stars = n; }
  starsArray(n: number): string[] { return Array(Math.round(n)).fill('*'); }
  emptyStars(n: number): string[] { return Array(5 - Math.round(n)).fill('*'); }

  submitReview(): void {
    if (!this.book || !this.newReview.user.trim() || !this.newReview.comment.trim()) return;
    this.bookService.addReview(this.book.id, { ...this.newReview });
    this.book = this.bookService.getById(this.book.id) ?? null;
    this.newReview = { user: '', comment: '', stars: 5 };
  }
}
