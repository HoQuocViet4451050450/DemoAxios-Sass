import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  animations: [
    trigger('slideInFromRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '1.2s ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('slideInFromBottom', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate(
          '1.2s ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class SidemenuComponent {
  isCollapsed = false;

  constructor() {}

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  goToHome(event: Event) {
    event.preventDefault();
  }

  scrollToSmooth(targetY: number, duration: number = 1000) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    const easeInOutQuad = (t: number) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }

  scrollToTop(event: Event) {
    event.preventDefault();
    this.scrollToSmooth(0, 1200); // Cuộn lên đầu trong 1.2 giây
  }

  scrollToBottom(event: Event) {
    event.preventDefault();
    const target = document.body.scrollHeight;
    this.scrollToSmooth(target, 1200); // Cuộn xuống cuối trang trong 1.2 giây
  }
}
