import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MemberService, Member } from '../../services/member';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './member-list.html',
  styleUrls: ['./member-list.css']
})
export class MemberListComponent {
  query = '';
  showInactiveOnly = false;

  constructor(public memberService: MemberService) {}

  get members(): Member[] {
    const q = this.query.toLowerCase();
    return this.memberService.getMembers().filter(m => {
      const matchesQuery = !q
        || m.firstName.toLowerCase().includes(q)
        || m.lastName.toLowerCase().includes(q)
        || m.email.toLowerCase().includes(q)
        || m.memberCard.toLowerCase().includes(q);
      const matchesStatus = !this.showInactiveOnly || !m.active;
      return matchesQuery && matchesStatus;
    });
  }

  delete(id: number, name: string): void {
    if (confirm(`Supprimer le membre "${name}" ?`)) {
      this.memberService.delete(id);
    }
  }
}
