import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book';
import { LoanService } from '../../services/loan';
import { MemberService } from '../../services/member';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  today = new Date();
  private bookService = inject(BookService);
  private loanService = inject(LoanService);
  private memberService = inject(MemberService);

  get totalBooks() { return this.bookService.getBooks().length; }
  get activeLoans() { return this.loanService.getStats().active; }
  get overdueLoans() { return this.loanService.getStats().overdue; }
  get totalMembers() { return this.memberService.getMembers().length; }

  get activeLoansDetails() {
    return this.loanService.getActiveLoans().map(loan => ({
      loan,
      book: this.bookService.getById(loan.bookId),
      member: this.memberService.getById(loan.memberId)
    }));
  }

  get overdueLoansDetails() {
    return this.loanService.filterByStatus('overdue').map(loan => ({
      loan,
      book: this.bookService.getById(loan.bookId),
      member: this.memberService.getById(loan.memberId)
    }));
  }

  daysOverdue(dueDate: Date): number {
    const today = new Date();
    return Math.floor((today.getTime() - new Date(dueDate).getTime()) / (1000 * 60 * 60 * 24));
  }
}
