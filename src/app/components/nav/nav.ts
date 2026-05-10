import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.html',
  styleUrls: ['./nav.css']
})
export class NavComponent {
  @Input() view: string = 'home';
  @Input() favCount: number = 0;
  @Output() viewChange = new EventEmitter<string>();
}