import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', loadComponent: () => import('./components/book-list/book-list').then(m => m.BookListComponent) },
  { path: 'books/new', loadComponent: () => import('./components/book-form/book-form').then(m => m.BookFormComponent) },
  { path: 'books/edit/:id', loadComponent: () => import('./components/book-form/book-form').then(m => m.BookFormComponent) },
  { path: 'books/:id', loadComponent: () => import('./components/book-detail/book-detail').then(m => m.BookDetailComponent) },
  { path: 'members', loadComponent: () => import('./components/member-list/member-list').then(m => m.MemberListComponent) },
  { path: 'members/new', loadComponent: () => import('./components/member-form/member-form').then(m => m.MemberFormComponent) },
  { path: 'members/edit/:id', loadComponent: () => import('./components/member-form/member-form').then(m => m.MemberFormComponent) },
  { path: 'loans', loadComponent: () => import('./components/loan-list/loan-list').then(m => m.LoanListComponent) },
  { path: 'loans/new', loadComponent: () => import('./components/loan-form/loan-form').then(m => m.LoanFormComponent) },
  { path: 'dashboard', loadComponent: () => import('./components/placeholder/placeholder').then(m => m.PlaceholderComponent) },
  { path: '**', redirectTo: 'books' }
];
