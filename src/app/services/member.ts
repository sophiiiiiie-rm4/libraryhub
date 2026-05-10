import { Injectable } from '@angular/core';

export type Member = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  memberCard: string;
  joinedAt: Date;
  active: boolean;
};

@Injectable({ providedIn: 'root' })
export class MemberService {
  private nextId = 6;

  private members: Member[] = [
    {
      id: 1, firstName: 'Aicha', lastName: 'Moussaoui',
      email: 'aicha.moussaoui@email.com', phone: '0661234567',
      memberCard: 'MBR-0001', joinedAt: new Date('2023-09-01'), active: true
    },
    {
      id: 2, firstName: 'Youssef', lastName: 'Benali',
      email: 'youssef.benali@email.com', phone: '0672345678',
      memberCard: 'MBR-0002', joinedAt: new Date('2023-10-15'), active: true
    },
    {
      id: 3, firstName: 'Sara', lastName: 'Kettani',
      email: 'sara.kettani@email.com', phone: '0683456789',
      memberCard: 'MBR-0003', joinedAt: new Date('2024-01-10'), active: true
    },
    {
      id: 4, firstName: 'Hamza', lastName: 'Lamrani',
      email: 'hamza.lamrani@email.com', phone: '0694567890',
      memberCard: 'MBR-0004', joinedAt: new Date('2024-03-22'), active: true
    },
    {
      id: 5, firstName: 'Fatima', lastName: 'Rachidi',
      email: 'fatima.rachidi@email.com', phone: '0615678901',
      memberCard: 'MBR-0005', joinedAt: new Date('2024-06-05'), active: false
    },
  ];

  getMembers(): Member[] { return this.members; }
  getActiveMembers(): Member[] { return this.members.filter(m => m.active); }

  getById(id: number): Member | undefined {
    return this.members.find(m => m.id === id);
  }

  add(member: Omit<Member, 'id' | 'memberCard' | 'joinedAt'>): Member {
    const newMember: Member = {
      ...member,
      id: this.nextId++,
      memberCard: `MBR-${String(this.nextId - 1).padStart(4, '0')}`,
      joinedAt: new Date()
    };
    this.members.push(newMember);
    return newMember;
  }

  update(id: number, changes: Partial<Omit<Member, 'id' | 'memberCard' | 'joinedAt'>>): void {
    const idx = this.members.findIndex(m => m.id === id);
    if (idx !== -1) {
      this.members[idx] = { ...this.members[idx], ...changes };
    }
  }

  delete(id: number): void {
    this.members = this.members.filter(m => m.id !== id);
  }
}
