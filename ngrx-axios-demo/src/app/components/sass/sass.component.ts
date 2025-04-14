import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-sass',
  templateUrl: './sass.component.html',
  styleUrls: ['./sass.component.scss'],
  animations: [
    trigger('slideInFromLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }), // Bắt đầu từ bên trái
        animate(
          '1.4s ease-out', // Thời gian và hiệu ứng
          style({ transform: 'translateX(0)', opacity: 1 }) // Kết thúc ở vị trí ban đầu
        ),
      ]),
    ]),
  ],
})
export class SassComponent {
  cssCode: string = `
.base-button {
  padding: 10px 20px;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  border: 1px solid gray;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}

.btn-primary {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: darken(blue, 10%);
}

.btn-secondary {
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-secondary:hover {
  background-color: darken(green, 10%);
}

.card {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px 0;
}

.card h2 {
  font-size: 24px;
  color: blue;
}

.card p {
  font-size: 16px;
  color: black;
}
    `;

  scssCode: string = `
  // Định nghĩa các biến
$primary-color: blue;
$secondary-color: green;
$font-stack: 'Arial', sans-serif;
$border-radius: 5px;

// Mixins cho việc tạo hiệu ứng cho các button
@mixin button-style($bg-color, $text-color) {
  background-color: $bg-color;
  color: $text-color;
  padding: 10px 20px;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: darken($bg-color, 10%);
  }
}

// Kế thừa từ một lớp khác
%base-button {
  padding: 10px 20px;
  border-radius: $border-radius;
  font-family: $font-stack;
  border: 1px solid gray;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}

// Sử dụng kế thừa và mixin trong các lớp cụ thể
.btn-primary {
  @extend %base-button;
  @include button-style($primary-color, white);
}

.btn-secondary {
  @extend %base-button;
  @include button-style($secondary-color, white);
}

.card {
  background-color: white;
  border-radius: $border-radius;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px 0;

  h2 {
    font-size: 24px;
    color: $primary-color;
  }

  p {
    font-size: 16px;
    color: black;
  }
}
`;
}
