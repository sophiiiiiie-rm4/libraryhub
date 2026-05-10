import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoanService, Loan, LoanStatus } from '../../services/loan';
import { BookService } from '../../services/book';
import { MemberService } from '../../services/member';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './loan-list.html',
  styleUrls: ['./loan-list.css']
})
export class LoanListComponent implements OnInit {
  statusFilter: LoanStatus | 'all' = 'all';
  dateFrom = '';
  dateTo = '';

  constructor(
    public loanService: LoanService,
    public bookService: BookService,
    public memberService: MemberService
  ) {}

  ngOnInit(): void {}

  get loans(): Loan[] {
    let result = this.loanService.filterByStatus(this.statusFilter);

    if (this.dateFrom) {
      const from = new Date(this.dateFrom);
      result = result.filter(l => l.borrowedAt >= from);
    }
    if (this.dateTo) {
      const to = new Date(this.dateTo);
      to.setHours(23, 59, 59);
      result = result.filter(l => l.borrowedAt <= to);
    }

    return result.sort((a, b) => {
      const order: Record<LoanStatus, number> = { overdue: 0, active: 1, returned: 2 };
      return order[a.status] - order[b.status];
    });
  }

  get stats() {
    return this.loanService.getStats();
  }

  getBookTitle(bookId: number): string {
    return this.bookService.getById(bookId)?.title ?? '—';
  }

  getMemberName(memberId: number): string {
    const m = this.memberService.getById(memberId);
    return m ? `${m.firstName} ${m.lastName}` : '—';
  }

  getMemberCard(memberId: number): string {
    return this.memberService.getById(memberId)?.memberCard ?? '';
  }

  returnLoan(loanId: number): void {
    if (confirm('Confirmer le retour de ce livre ?')) {
      this.loanService.return(loanId);
    }
  }

  daysOverdue(loan: Loan): number {
    if (loan.status !== 'overdue') return 0;
    const diff = new Date().getTime() - loan.dueDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  resetFilters(): void {
    this.statusFilter = 'all';
    this.dateFrom = '';
    this.dateTo = '';
  }
}
