# DemoAxios-Sass
## Giới thiệu

Đây là một dự án demo sử dụng **Angular**, **Axios** để gọi API, và **Sass** để thiết kế giao diện.

- **Frontend**: Angular, Axios, Sass
- **Backend**: Node.js, Express (API giả lập quản lý người dùng)
- **Chức năng**:
  - Hiển thị danh sách người dùng
  - Thêm, sửa, xóa người dùng
  - Giao diện tối ưu với Sass

## Cài đặt và chạy dự án

### 1. Clone Repository
```sh
git clone https://github.com/HoQuocViet4451050450/DemoAxios-Sass.git
cd DemoAxios-Sass
```

### 2. Cài đặt dependencies
```sh
npm install
```

### 3. Chạy Backend (Node.js API)
```sh
cd backend_gk
node server.js
```

### 4. Chạy Frontend (Angular App)
```sh
cd frontend_gk
ng serve --open
```

## Sử dụng

- Truy cập ứng dụng tại: `http://localhost:4200`
- Nhập thông tin người dùng mới vào form và nhấn **Thêm** để thêm người dùng mới.
- Nhấn **Sửa** để chỉnh sửa thông tin người dùng.
- Nhấn **Xóa** để xoá người dùng khỏi danh sách.

## Cấu trúc thư mục
```
DemoAxios-Sass/
│── backend/        # Thư mục backend (Node.js + Express API)
│── frontend/       # Thư mục frontend (Angular + Sass)
│── README.md       # Hướng dẫn sử dụng
```

## Công nghệ sử dụng
- **Angular**: Framework frontend
- **Axios**: Gọi API RESTful
- **Sass**: Tiền xử lý CSS giúp tối ưu giao diện
- **Node.js & Express**: Server backend giả lập

GitHub: [HoQuocViet4451050450](https://github.com/HoQuocViet4451050450)
