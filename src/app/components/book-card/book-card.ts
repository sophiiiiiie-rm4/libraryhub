import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../services/book';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-card.html',
  styleUrls: ['./book-card.css']
})
export class BookCardComponent {
  @Input() book!: Book;
  @Input() isFav: boolean = false;
  @Output() selected = new EventEmitter<Book>();
  @Output() toggleFav = new EventEmitter<number>();
}