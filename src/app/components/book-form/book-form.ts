import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.css']
})
export class BookFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  bookId: number | null = null;
  submitted = false;

  categories: string[] = [];

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categories = this.bookService.getCategories().filter(c => c !== 'Toutes');

    this.form = this.fb.group({
      title:           ['', [Validators.required, Validators.minLength(2)]],
      author:          ['', [Validators.required, Validators.minLength(2)]],
      isbn:            ['', [Validators.required, Validators.pattern(/^[\d\-X]{10,17}$/i)]],
      category:        ['', Validators.required],
      coverUrl:        [''],
      quantity:        [1, [Validators.required, Validators.min(1)]],
      availableCopies: [1, [Validators.required, Validators.min(0)]],
      pages:           [1, [Validators.required, Validators.min(1)]],
      year:            [new Date().getFullYear(), [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
      country:         ['', Validators.required],
      description:     ['', [Validators.required, Validators.minLength(10)]],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.bookId = Number(idParam);
      const book = this.bookService.getById(this.bookId);
      if (book) {
        this.form.patchValue({
          title:           book.title,
          author:          book.author,
          isbn:            book.isbn,
          category:        book.category,
          coverUrl:        book.coverUrl,
          quantity:        book.quantity,
          availableCopies: book.availableCopies,
          pages:           book.pages,
          year:            book.year,
          country:         book.country,
          description:     book.description,
        });
      } else {
        this.router.navigate(['/books']);
      }
    }
  }

  get f() { return this.form.controls; }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched || this.submitted));
  }

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    const value = this.form.value;

    if (this.isEditMode && this.bookId !== null) {
      this.bookService.update(this.bookId, value);
      this.router.navigate(['/books', this.bookId]);
    } else {
      const created = this.bookService.add(value);
      this.router.navigate(['/books', created.id]);
    }
  }

  cancel(): void {
    if (this.isEditMode && this.bookId !== null) {
      this.router.navigate(['/books', this.bookId]);
    } else {
      this.router.navigate(['/books']);
    }
  }
}
