import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loadPhongbans,
  createPhongban,
  deletePhongban,
} from 'src/app/store-phongban/phongban.action';
import { PhongbanState } from 'src/app/store-phongban/phongban.reducer';
import { Observable } from 'rxjs';
import { Phongban } from 'src/app/store-phongban/phongban.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-phongban-list',
  templateUrl: './phongban-list.component.html',
  styleUrls: ['./phongban-list.component.scss'],
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
export class PhongbanListComponent {
  phongbans$: Observable<Phongban[]>;
  error$: Observable<string | null>;
  selectedPhongban: Phongban = this.resetPhongban();
  searchKeyword = '';
  submittedDataMessage: string | null = null;

  constructor(private store: Store<{ phongban: PhongbanState }>) {
    this.phongbans$ = store.select((state) => state.phongban.phongbans);
    this.error$ = store.select((state) => state.phongban.error);
  }

  loadPhongbanList() {
    this.store.dispatch(loadPhongbans());
  }

  createPhongban(pb: Phongban) {
    this.store.dispatch(createPhongban({ phongban: pb }));
  }

  deletePhongban(id: number) {
    this.store.dispatch(deletePhongban({ id }));
  }

  onSubmit(phongban: Phongban) {
    this.createPhongban(phongban);

    this.submittedDataMessage = `✅ Đã thêm phòng ban: ${phongban.tenphong}, mô tả: ${phongban.mota}`;

    setTimeout(() => {
      this.submittedDataMessage = null;
    }, 5000);

    this.resetForm();
  }

  resetForm() {
    this.selectedPhongban = this.resetPhongban();
  }

  resetPhongban(): Phongban {
    return {
      id: 0,
      tenphong: '',
      mota: '',
    };
  }
}
