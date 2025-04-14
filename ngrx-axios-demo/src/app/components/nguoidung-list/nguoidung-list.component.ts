import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loadNguoidungs,
  createNguoidung,
  deleteNguoidung,
  updateNguoidung,
  searchNguoidungs,
} from 'src/app/store-nguoidung/nguoidung.actions';
import { NguoidungState } from 'src/app/store-nguoidung/nguoidung.reducer';
import { Observable } from 'rxjs';
import { Nguoidung } from 'src/app/store-nguoidung/nguoidung.model';
import { Phongban } from 'src/app/store-phongban/phongban.model';
import { loadPhongbans } from 'src/app/store-phongban/phongban.action';
import { PhongbanState } from 'src/app/store-phongban/phongban.reducer';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-nguoidung-list',
  templateUrl: './nguoidung-list.component.html',
  styleUrls: ['./nguoidung-list.component.scss'],
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
export class NguoidungListComponent implements OnInit {
  nguoidungs$: Observable<Nguoidung[]>;
  phongbans$: Observable<Phongban[]>;
  error$: Observable<string | null>;
  selectedNguoidung: Nguoidung = this.resetNguoidung();
  isEditing = false;
  searchKeyword = '';
  submittedDataMessage: string | null = null;

  constructor(
    private store: Store<{ nguoidung: NguoidungState; phongban: PhongbanState }>
  ) {
    this.nguoidungs$ = store.select((state) => state.nguoidung.nguoidungs);
    this.phongbans$ = store.select((state) => state.phongban.phongbans);
    this.error$ = store.select((state) => state.nguoidung.error);
  }

  ngOnInit(): void {
    this.loadNguoiDungList();
    this.store.dispatch(loadPhongbans()); // Lấy danh sách phòng ban
  }

  loadNguoiDungList() {
    this.store.dispatch(loadNguoidungs());
  }

  createNguoidung(newUser: Nguoidung) {
    this.store.dispatch(createNguoidung({ nguoidung: newUser }));
  }

  deleteNguoidung(id: number) {
    this.store.dispatch(deleteNguoidung({ id }));
  }

  updateNguoidung(nguoidung: Nguoidung) {
    this.store.dispatch(updateNguoidung({ nguoidung }));
  }

  editNguoidung(nguoidung: Nguoidung) {
    this.selectedNguoidung = { ...nguoidung };
    this.isEditing = true;
  }

  onSubmit(nguoidung: Nguoidung) {
    if (this.isEditing) {
      this.updateNguoidung(nguoidung);
    } else {
      this.createNguoidung(nguoidung);
    }

    this.submittedDataMessage = `✅ Đã ${
      this.isEditing ? 'cập nhật' : 'thêm'
    } người dùng: ${nguoidung.hoten}, tuổi: ${nguoidung.tuoi}, giới tính: ${
      nguoidung.gioitinh
    }, địa chỉ: ${nguoidung.diachi}, CCCD: ${nguoidung.socccd}, phòng ban: ${
      nguoidung.phongban_id
    }`;

    setTimeout(() => {
      this.submittedDataMessage = null;
    }, 100000); // ẩn sau 5 giây

    this.resetForm();
  }

  resetForm() {
    this.selectedNguoidung = this.resetNguoidung();
    this.isEditing = false;
  }

  resetNguoidung(): Nguoidung {
    return {
      id: 0,
      hoten: '',
      tuoi: '',
      gioitinh: '',
      diachi: '',
      socccd: '',
      phongban_id: 0,
    };
  }

  searchNguoidung() {
    this.store.dispatch(searchNguoidungs({ keyword: this.searchKeyword }));
  }
}
