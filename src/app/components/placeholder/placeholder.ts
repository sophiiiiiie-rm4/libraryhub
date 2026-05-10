import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="text-align:center; padding:5rem 2rem; color:#6b7280; font-family:'Inter',sans-serif;">
      <div style="font-size:3rem; margin-bottom:1rem;">🚧</div>
      <h2 style="font-size:1.4rem; font-weight:700; color:#0f0f1a; margin-bottom:0.5rem;">
        Section en cours de developpement
      </h2>
      <p style="margin-bottom:1.5rem;">Cette page sera disponible dans une prochaine phase.</p>
      <a routerLink="/books"
        style="background:linear-gradient(135deg,#6366f1,#4f46e5);color:#fff;text-decoration:none;
               padding:0.6rem 1.5rem;border-radius:12px;font-weight:600;font-size:0.88rem;">
        Retour au catalogue
      </a>
    </div>
  `
})
export class PlaceholderComponent {}
