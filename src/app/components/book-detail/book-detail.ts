import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book, Review } from '../../services/book';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.css']
})
export class BookDetailComponent {
  @Input() book!: Book;
  @Input() isFav: boolean = false;
  @Output() closed = new EventEmitter<void>();
  @Output() toggleFav = new EventEmitter<number>();
  @Output() reviewAdded = new EventEmitter<{bookId: number, review: Review}>();

  newReview = { user: '', comment: '', stars: 5 };

  setStars(n: number) { this.newReview.stars = n; }
  starsArray(n: number) { return Array(Math.round(n)).fill('★'); }
  emptyStars(n: number) { return Array(5 - Math.round(n)).fill('☆'); }

  submit() {
    if (!this.newReview.user.trim() || !this.newReview.comment.trim()) return;
    this.reviewAdded.emit({ bookId: this.book.id, review: { ...this.newReview } });
    this.newReview = { user: '', comment: '', stars: 5 };
  }
}