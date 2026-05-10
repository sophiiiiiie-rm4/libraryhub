import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoanService } from '../../services/loan';
import { BookService, Book } from '../../services/book';
import { MemberService, Member } from '../../services/member';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './loan-form.html',
  styleUrls: ['./loan-form.css']
})
export class LoanFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  errorMessage = '';
  successMessage = '';

  availableBooks: Book[] = [];
  activeMembers: Member[] = [];

  constructor(
    private fb: FormBuilder,
    private loanService: LoanService,
    private bookService: BookService,
    private memberService: MemberService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.availableBooks = this.bookService.getBooks().filter(b => b.availableCopies > 0);
    this.activeMembers = this.memberService.getActiveMembers();

    this.form = this.fb.group({
      bookId:   [null, Validators.required],
      memberId: [null, Validators.required],
    });
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched || this.submitted));
  }

  submit(): void {
    this.submitted = true;
    this.errorMessage = '';
    if (this.form.invalid) return;

    const { bookId, memberId } = this.form.value;
    const loan = this.loanService.borrow(Number(bookId), Number(memberId));

    if (!loan) {
      this.errorMessage = 'Impossible de creer l\'emprunt. Le livre est peut-etre indisponible.';
      return;
    }

    this.router.navigate(['/loans']);
  }

  cancel(): void {
    this.router.navigate(['/loans']);
  }
}
