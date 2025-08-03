import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.scss']
})
export class TopbarComponent {
  @Output() toggle = new EventEmitter<void>();
}
