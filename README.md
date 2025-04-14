# Dự án Demo: Axios/Sass & Ngrx Angular 16

## 1. Giới thiệu  
Dự án **Demo Axios/Sass & Ngrx Angular 16** là một ứng dụng quản lý nhân viên và bảng lương, sử dụng công nghệ hiện đại để tối ưu hóa hiệu suất và trải nghiệm người dùng.  

- **Frontend**: Angular 16 với Ngrx, sử dụng Axios để giao tiếp với API, sử dụng Apexcharts để vẽ biểu đồ và Animations để tạo hiệu ứng chuyển động .  
- **Backend**: Node.js + Express.js để xây dựng API.  
- **Database**: MySQL được quản lý thông qua phpMyAdmin.  

---

## 2. Cấu trúc thư mục  

- **ngrx-axios-demo**: Chứa giao diện và các component chính  
  - `nguoidung-list`: Quản lý danh sách nhân viên (hiển thị, thêm, sửa, xóa nhân viên) sử dụng **Axios** để kết nối API.  
  - `bangluong-salary`: Quản lý bảng lương nhân viên (hiển thị, thêm, sửa, xóa bảng lương, vẽ biểu đồ tổng lương tháng/năm) sử dụng **Axios** để kết nối API.
  - `phongban-list`: Quản lý bảng lương nhân viên (hiển thị, thêm, xóa phòng ban) sử dụng **Axios** để kết nối API.  
  - **Sử dụng Sass** để tối ưu hóa style.
  - **Ngrx** để quản lý trạng thái.  

- **backend_gk**: Chứa API server  
  - Sử dụng **Node.js + Express.js** để tạo RESTful API.  
  - Xử lý CRUD dữ liệu nhân viên, bảng lương, và phòng ban.  
  - Kết nối với **phpMyAdmin (MySQL)** để lưu trữ dữ liệu.

## 3. Store trong NgRx  

1. **nguoidung.actions.ts**:
   - Chứa các action cần thiết cho việc xử lý các hành động liên quan đến nhân viên, như thêm, sửa, xóa, và lấy danh sách nhân viên từ API.

2. **nguoidung.effects.ts**:
   - Xử lý các side effects của các action, như gọi API qua Axios và cập nhật state sau khi nhận phản hồi từ server.

3. **nguoidung.model.ts**:
   - Định nghĩa cấu trúc dữ liệu của nhân viên, bao gồm các trường như `id`, `hoten`, `phongban_id`, và các thông tin khác.

4. **nguoidung.reducer.ts**:
   - Quản lý state của danh sách nhân viên, xử lý các action như `loadNguoidung`, `addNguoidung`, `updateNguoidung`, `deleteNguoidung`, v.v.

5. **phongban.actions.ts**:
   - Chứa các action cần thiết cho việc xử lý các hành động liên quan đến nhân viên, như thêm, sửa, xóa, và lấy danh sách phòng ban từ API.

6. **phongban.effects.ts**:
   - Xử lý các side effects của các action, như gọi API qua Axios và cập nhật state sau khi nhận phản hồi từ server.

7. **phongban.model.ts**:
   - Định nghĩa cấu trúc dữ liệu của phòng ban, bao gồm các trường như `id`, `tenphong`, `mota`, và các thông tin khác.

8. **phongban.reducer.ts**:
   - Quản lý state của danh sách phòng ban, xử lý các action như `loadPhongban`, `addPhongban`, `deletePhongban`, v.v.

9. **bangluong.actions.ts**:
   - Chứa các action cần thiết cho việc xử lý các hành động liên quan đến bảng lương, như thêm, sửa, xóa, và lấy danh sách bảng lương từ API.

10. **bangluong.effects.ts**:
    - Xử lý các side effects của các action, như gọi API qua Axios và cập nhật state sau khi nhận phản hồi từ server.

11. **bangluong.model.ts**:
    - Định nghĩa cấu trúc dữ liệu của bảng lương, bao gồm các trường như `id`, `user_id`, `luongtheogio`, và các thông tin khác.

12. **bangluong.reducer.ts**:
    - Quản lý state của danh sách bảng lương, xử lý các action như `loadBangluong`, `addBangluong`, `deleteBangluong`, v.v.

---

## 4. Công nghệ sử dụng  

| Công nghệ        | Mô tả |
|-----------------|-------|
| Angular 16 | Framework frontend chính |
| Ngrx | Quản lý trạng thái ứng dụng |
| Sass | Tiền xử lý CSS, tối ưu style |
| Axios | Giao tiếp API hiệu quả |
| Ng-apexcharts | Vẽ biểu đồ |
| Animations | Tạo hiệu ứng chuyển động |
|-----------------|-------|
| Node.js + Express.js | Xây dựng API backend |
|-----------------|-------|
| MySQL + phpMyAdmin | Lưu trữ dữ liệu |

---

## 4. Chức năng chính  

✅ **Quản lý nhân viên**:  
- Hiển thị danh sách nhân viên.  
- Thêm, sửa, xóa nhân viên bằng Axios.  
- Quản lý trạng thái bằng Ngrx.  

✅ **Quản lý bảng lương**:  
- Hiển thị bảng lương nhân viên.  
- Thêm, sửa, xóa bảng lương bằng Axios.  
- Vẽ biểu đồ bảng lương bằng Ng-apexcharts.  
- Quản lý trạng thái bằng Ngrx.  

✅ **Quản lý phòng ban**:  
- Hiển thị phòng ban.  
- Thêm, xóa bảng lương bằng Axios.  
- Quản lý trạng thái bằng Ngrx.  

✅ **Kết nối API**:  
- API được xây dựng bằng Node.js + Express.js.  
- Sử dụng PhpMySql để lưu trữ dữ liệu.  

---

## 5. Hướng dẫn chạy dự án  

### **Cài đặt backend & frontend**   
```sh
Backend
cd backend_gk  
npm install  
node server.js

Frontend
cd ngrx-axios-demo
npm install  
node server.js

---
