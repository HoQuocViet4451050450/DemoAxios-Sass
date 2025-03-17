// Import các module cần thiết cho component Angular
import { Component } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import axios from 'axios'; // Thư viện dùng để gửi HTTP request
import { FormsModule } from '@angular/forms'; // Hỗ trợ binding dữ liệu với form

@Component({
  selector: 'app-root', // Định danh của component trong HTML
  imports: [FormsModule, CommonModule], // Import các module cần thiết
  templateUrl: './app.component.html', // Đường dẫn file template HTML
  styleUrl: './app.component.scss' // Đường dẫn file SCSS chứa style
})
export class AppComponent {
  // Địa chỉ API backend để thao tác với danh sách người dùng
  apiUrl = 'http://localhost:3005/users';

  // Danh sách người dùng được lưu trữ trong biến users
  users: any[] = [];

  // Biến lưu trữ dữ liệu người dùng mới khi thêm
  newUser = { name: '', email: '' };

  // Biến lưu thông tin người dùng khi chỉnh sửa
  editUser = { id: null, name: '', email: '' };

  // Hàm lấy danh sách người dùng từ API
  fetchUsers() {
    axios.get(this.apiUrl) // Gửi request GET đến API
      .then(response => this.users = response.data) // Lưu dữ liệu vào biến users
      .catch(error => console.error("Lỗi khi lấy dữ liệu:", error)); // Xử lý lỗi nếu có
  }

  // Hàm thêm người dùng mới
  addUser() {
    axios.post(this.apiUrl, this.newUser) // Gửi request POST để thêm user
      .then(() => {
        this.fetchUsers(); // Sau khi thêm, tải lại danh sách người dùng
        this.newUser = { name: '', email: '' }; // Reset form nhập liệu
      })
      .catch(error => console.error("Lỗi khi thêm người dùng:", error)); // Xử lý lỗi
  }

  // Hàm xóa người dùng theo ID
  deleteUser(id: number) {
    axios.delete(`${this.apiUrl}/${id}`) // Gửi request DELETE đến API
      .then(() => this.fetchUsers()) // Sau khi xóa, tải lại danh sách
      .catch(error => console.error("Lỗi khi xóa:", error)); // Xử lý lỗi
  }

  // Hàm chọn người dùng để chỉnh sửa
  selectUserToEdit(user: any) {
    this.editUser = { ...user }; // Sao chép dữ liệu người dùng cần sửa vào biến editUser
  }

  // Hàm cập nhật thông tin người dùng
  updateUser() {
    axios.put(`${this.apiUrl}/${this.editUser.id}`, this.editUser) // Gửi request PUT để cập nhật user
      .then(() => {
        this.fetchUsers(); // Sau khi cập nhật, tải lại danh sách
        this.editUser = { id: null, name: '', email: '' }; // Reset form chỉnh sửa
      })
      .catch(error => console.error("Lỗi khi cập nhật người dùng:", error)); // Xử lý lỗi
  }
}
