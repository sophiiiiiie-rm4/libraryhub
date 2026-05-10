import { Injectable } from '@angular/core';
import { BookService } from './book';
import { MemberService } from './member';

export type LoanStatus = 'active' | 'returned' | 'overdue';

export type Loan = {
  id: number;
  bookId: number;
  memberId: number;
  borrowedAt: Date;
  dueDate: Date;
  returnedAt: Date | null;
  status: LoanStatus;
};

@Injectable({ providedIn: 'root' })
export class LoanService {
  private nextId = 4;

  private loans: Loan[] = [
    {
      id: 1, bookId: 1, memberId: 1,
      borrowedAt: new Date('2025-04-20'),
      dueDate: new Date('2025-05-04'),
      returnedAt: null,
      status: 'overdue'
    },
    {
      id: 2, bookId: 4, memberId: 2,
      borrowedAt: new Date('2025-05-01'),
      dueDate: new Date('2025-05-15'),
      returnedAt: null,
      status: 'active'
    },
    {
      id: 3, bookId: 2, memberId: 3,
      borrowedAt: new Date('2025-04-10'),
      dueDate: new Date('2025-04-24'),
      returnedAt: new Date('2025-04-23'),
      status: 'returned'
    },
  ];

  constructor(
    private bookService: BookService,
    private memberService: MemberService
  ) {}

  getLoans(): Loan[] {
    this.refreshOverdueStatuses();
    return this.loans;
  }

  getActiveLoans(): Loan[] {
    this.refreshOverdueStatuses();
    return this.loans.filter(l => l.status !== 'returned');
  }

  getById(id: number): Loan | undefined {
    return this.loans.find(l => l.id === id);
  }

  getLoansByMember(memberId: number): Loan[] {
    return this.loans.filter(l => l.memberId === memberId);
  }

  borrow(bookId: number, memberId: number): Loan | null {
    const book = this.bookService.getById(bookId);
    if (!book || book.availableCopies === 0) return null;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const loan: Loan = {
      id: this.nextId++,
      bookId,
      memberId,
      borrowedAt: new Date(),
      dueDate,
      returnedAt: null,
      status: 'active'
    };

    this.loans.push(loan);
    this.bookService.decrementAvailability(bookId);
    return loan;
  }

  return(loanId: number): void {
    const loan = this.loans.find(l => l.id === loanId);
    if (!loan || loan.status === 'returned') return;
    loan.returnedAt = new Date();
    loan.status = 'returned';
    this.bookService.incrementAvailability(loan.bookId);
  }

  filterByStatus(status: LoanStatus | 'all'): Loan[] {
    this.refreshOverdueStatuses();
    if (status === 'all') return this.loans;
    return this.loans.filter(l => l.status === status);
  }

  getStats() {
    this.refreshOverdueStatuses();
    return {
      total: this.loans.length,
      active: this.loans.filter(l => l.status === 'active').length,
      overdue: this.loans.filter(l => l.status === 'overdue').length,
      returned: this.loans.filter(l => l.status === 'returned').length,
    };
  }

  private refreshOverdueStatuses(): void {
    const today = new Date();
    this.loans.forEach(l => {
      if (l.status === 'active' && l.dueDate < today) {
        l.status = 'overdue';
      }
    });
  }
}
