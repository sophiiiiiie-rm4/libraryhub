import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MemberService } from '../../services/member';

@Component({
  selector: 'app-member-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './member-form.html',
  styleUrls: ['./member-form.css']
})
export class MemberFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  memberId: number | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName:  ['', [Validators.required, Validators.minLength(2)]],
      email:     ['', [Validators.required, Validators.email]],
      phone:     ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      active:    [true]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.memberId = Number(idParam);
      const member = this.memberService.getById(this.memberId);
      if (member) {
        this.form.patchValue({
          firstName: member.firstName,
          lastName:  member.lastName,
          email:     member.email,
          phone:     member.phone,
          active:    member.active
        });
      } else {
        this.router.navigate(['/members']);
      }
    }
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched || this.submitted));
  }

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    if (this.isEditMode && this.memberId !== null) {
      this.memberService.update(this.memberId, this.form.value);
    } else {
      this.memberService.add(this.form.value);
    }
    this.router.navigate(['/members']);
  }

  cancel(): void {
    this.router.navigate(['/members']);
  }
}
