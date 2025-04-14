import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideInFromTop', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }), // Bắt đầu từ trên
        animate(
          '1.4s ease-out', // Thời gian và hiệu ứng
          style({ transform: 'translateY(0)', opacity: 1 }) // Kết thúc ở vị trí ban đầu
        ),
      ]),
    ]),
  ],
})
export class HomeComponent {}
