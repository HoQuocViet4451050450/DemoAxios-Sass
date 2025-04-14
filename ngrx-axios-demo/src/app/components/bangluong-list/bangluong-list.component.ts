import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Bangluong } from 'src/app/store-bangluong/salary.model';
import { Nguoidung } from 'src/app/store-nguoidung/nguoidung.model'; // Import thêm model người dùng
import { BangluongState } from 'src/app/store-bangluong/salary.reducer';
import { NguoidungState } from 'src/app/store-nguoidung/nguoidung.reducer'; // Import thêm state người dùng
import {
  loadBangluongs,
  createBangluong,
  deleteBangluong,
  updateBangluong,
  searchBangluongs,
} from 'src/app/store-bangluong/salary.actions';
import { loadNguoidungs } from 'src/app/store-nguoidung/nguoidung.actions'; // Hành động load danh sách người dùng
import { trigger, transition, style, animate } from '@angular/animations';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexPlotOptions,
  ApexYAxis,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  dataLabels?: ApexDataLabels;
  stroke?: ApexStroke;
  plotOptions?: ApexPlotOptions;
  yaxis?: ApexYAxis;
};
@Component({
  selector: 'app-bangluong-list',
  templateUrl: './bangluong-list.component.html',
  styleUrls: ['./bangluong-list.component.scss'],
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
export class BangluongListComponent implements OnInit {
  bangluongs$: Observable<Bangluong[]>;
  nguoidungs$: Observable<Nguoidung[]>; // Thêm đối tượng Observable cho người dùng
  error$: Observable<string | null>;
  selectedBangluong: Bangluong = this.resetBangluong();
  isEditing = false;
  hoten: string = '';
  public chartOptions: Partial<ChartOptions> = {};
  showChart = false; // Điều khiển hiển thị biểu đồ
  months: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];

  years: number[] = [];
  constructor(
    private store: Store<{
      bangluong: BangluongState;
      nguoidung: NguoidungState;
    }>
  ) {
    this.bangluongs$ = store.select((state) => state.bangluong.bangluongs);
    this.nguoidungs$ = store.select((state) => state.nguoidung.nguoidungs); // Lấy danh sách người dùng
    this.error$ = store.select((state) => state.bangluong.error);
  }

  ngOnInit() {
    this.loadBangluongList();
    this.loadNguoidungList(); // Gọi hàm tải danh sách người dùng
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 10 }, (_, i) => currentYear - i);
    this.bangluongs$.subscribe((data) => {
      this.generateSalaryChart(data);
    });
  }

  loadBangluongList() {
    this.store.dispatch(loadBangluongs());
  }

  loadNguoidungList() {
    this.store.dispatch(loadNguoidungs()); // Lấy danh sách người dùng
  }

  createBangluong(newBangluong: Bangluong) {
    this.store.dispatch(createBangluong({ bangluong: newBangluong }));
  }

  deleteBangluong(id: number) {
    this.store.dispatch(deleteBangluong({ id }));
  }

  updateBangluong(bangluong: Bangluong) {
    this.store.dispatch(updateBangluong({ bangluong }));
  }

  editBangluong(bangluong: Bangluong) {
    this.selectedBangluong = { ...bangluong };
    this.isEditing = true;
  }

  onSubmit(bangluong: Bangluong) {
    if (this.isEditing) {
      this.updateBangluong(bangluong);
    } else {
      this.createBangluong(bangluong);
    }
    this.resetForm();
  }

  resetForm() {
    this.selectedBangluong = this.resetBangluong();
    this.isEditing = false;
  }

  resetBangluong(): Bangluong {
    return {
      id: 0,
      user_id: 0,
      hoten: '',
      luongtheogio: 0,
      tonggiolam: 0,
      tienthuong: 0,
      tienphat: 0,
      tongluong: 0,
      thang: 0,
      nam: 0,
      trangthai: '',
      ngaythanhtoan: '',
    };
  }

  onSearch() {
    this.store.dispatch(searchBangluongs({ keyword: this.hoten }));
  }

  generateSalaryChart(data: Bangluong[]) {
    const monthlyTotals: { [key: string]: number } = {};

    data.forEach((item) => {
      const key = `${item.thang}/${item.nam}`; // Gom theo cả tháng và năm
      if (!monthlyTotals[key]) {
        monthlyTotals[key] = 0;
      }
      monthlyTotals[key] += item.tongluong;
    });

    // Sắp xếp theo năm và tháng
    const sortedKeys = Object.keys(monthlyTotals).sort((a, b) => {
      const [monthA, yearA] = a.split('/').map(Number);
      const [monthB, yearB] = b.split('/').map(Number);
      return yearA !== yearB ? yearA - yearB : monthA - monthB;
    });

    const totalValues = sortedKeys.map((key) => monthlyTotals[key]);

    this.chartOptions = {
      series: [
        {
          name: 'Tổng lương',
          data: totalValues,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      title: {
        text: 'Biểu đồ Tổng lương theo Tháng/Năm',
      },
      xaxis: {
        categories: sortedKeys.map((key) => `Tháng ${key}`),
      },
      yaxis: {
        title: {
          text: 'Tổng lương (VND)',
        },
      },
    };
  }
  // Hàm để hiển thị hoặc ẩn biểu đồ
  toggleChart() {
    this.showChart = !this.showChart;
  }
}
