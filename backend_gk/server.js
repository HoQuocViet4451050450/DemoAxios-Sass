require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Kết nối MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Lỗi kết nối MySQL:", err);
  } else {
    console.log("✅ Kết nối MySQL thành công!");
  }
});

// 🔹 Khởi chạy server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy trên cổng ${PORT}`);
});

/*****************************************NGƯỜI DÙNG********************************************************** */
// 🔹 API Tạo 1 người dùng mới
app.post("/api/user/create", (req, res) => {
  const { hoten, tuoi, gioitinh, diachi, socccd, phongban_id } = req.body;

  if (!hoten || !tuoi || !gioitinh || !diachi || !socccd) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
  }

  const sql =
    "INSERT INTO user_table (hoten, tuoi, gioitinh, diachi, socccd, phongban_id) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [hoten, tuoi, gioitinh, diachi, socccd, phongban_id],
    (err, result) => {
      if (err) {
        console.error("❌ Lỗi khi thêm người dùng:", err);
        return res.status(500).json({ error: "Lỗi khi thêm người dùng!" });
      }
      res.status(201).json({
        message: "✅ Thêm người dùng thành công!",
        userId: result.insertId,
      });
    }
  );
});

// 🔹 API lấy danh sách tất cả người dùng
app.get("/api/users", (req, res) => {
  const sql = "SELECT * FROM user_table";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Lỗi khi lấy danh sách người dùng:", err);
      return res
        .status(500)
        .json({ error: "Lỗi khi lấy danh sách người dùng!" });
    }
    res.status(200).json(results);
  });
});

// 🔹 API xóa người dùng theo ID
app.delete("/api/user/delete/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM user_table WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi xóa người dùng:", err);
      return res.status(500).json({ error: "Lỗi khi xóa người dùng!" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Không tìm thấy người dùng!" });
    }
    res.status(200).json({ message: "✅ Xóa người dùng thành công!" });
  });
});

// 🔹 API cập nhật thông tin người dùng
app.put("/api/user/update/:id", (req, res) => {
  const userId = req.params.id;
  const { hoten, tuoi, gioitinh, diachi, socccd, phongban_id } = req.body;

  if (!hoten || !tuoi || !gioitinh || !diachi || !socccd) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
  }

  const sql =
    "UPDATE user_table SET hoten = ?, tuoi = ?, gioitinh = ?, diachi = ?, socccd = ?, phongban_id = ? WHERE id = ?";
  db.query(
    sql,
    [hoten, tuoi, gioitinh, diachi, socccd, userId, phongban_id],
    (err, result) => {
      if (err) {
        console.error("❌ Lỗi khi cập nhật người dùng:", err);
        return res.status(500).json({ error: "Lỗi khi cập nhật người dùng!" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Không tìm thấy người dùng!" });
      }
      res.status(200).json({ message: "✅ Cập nhật người dùng thành công!" });
    }
  );
});

// 🔹 API tìm kiếm người dùng theo tên hoặc số CCCD
app.get("/api/user/search", (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: "Vui lòng nhập từ khóa tìm kiếm!" });
  }

  const sql = "SELECT * FROM user_table WHERE hoten LIKE ? OR socccd LIKE ?";
  const searchValue = `%${keyword}%`;

  db.query(sql, [searchValue, searchValue], (err, results) => {
    if (err) {
      console.error("❌ Lỗi khi tìm kiếm người dùng:", err);
      return res.status(500).json({ error: "Lỗi khi tìm kiếm người dùng!" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }
    res.status(200).json(results);
  });
});

/*****************************************BẢNG LƯƠNG********************************************************** */
// 🔹 API Tạo bảng lương cho người dùng
app.post("/api/salary/create", (req, res) => {
  const {
    user_id,
    luongtheogio,
    tonggiolam,
    tienthuong,
    tienphat,
    thang,
    nam,
    trangthai,
    ngaythanhtoan,
  } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!user_id || !luongtheogio || !tonggiolam || !thang || !nam) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
  }

  // Tính tổng lương
  const tongluong =
    luongtheogio * tonggiolam + (tienthuong || 0) - (tienphat || 0);

  const sql =
    "INSERT INTO salary_table (user_id, luongtheogio, tonggiolam, tienthuong, tienphat, tongluong, thang, nam, trangthai, ngaythanhtoan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  // Thực hiện truy vấn
  db.query(
    sql,
    [
      user_id,
      luongtheogio,
      tonggiolam,
      tienthuong,
      tienphat,
      tongluong,
      thang,
      nam,
      trangthai || "Chưa thanh toán",
      ngaythanhtoan || null,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ Lỗi khi tạo bảng lương:", err);
        return res.status(500).json({ error: "Lỗi khi tạo bảng lương!" });
      }
      res.status(201).json({
        message: "✅ Bảng lương được tạo thành công!",
        salaryId: result.insertId,
      });
    }
  );
});

// 🔹 API Lấy danh sách bảng lương của tất cả nhân viên (hiển thị hoten)
app.get("/api/salaries", (req, res) => {
  const sql = `
    SELECT s.id, s.user_id, u.hoten, s.tonggiolam, s.tienthuong, s.tienphat, s.luongtheogio, s.tongluong, s.thang, s.nam, s.trangthai, s.ngaythanhtoan
    FROM salary_table s
    JOIN user_table u ON s.user_id = u.id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Lỗi khi lấy danh sách bảng lương:", err);
      return res
        .status(500)
        .json({ error: "Lỗi khi lấy danh sách bảng lương!" });
    }
    res.status(200).json(results);
  });
});

// 🔹 API Xóa bảng lương theo ID
app.delete("/api/salary/delete/:id", (req, res) => {
  const salaryId = req.params.id;
  const sql = "DELETE FROM salary_table WHERE id = ?";

  db.query(sql, [salaryId], (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi xóa bảng lương:", err);
      return res.status(500).json({ error: "Lỗi khi xóa bảng lương!" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Không tìm thấy bảng lương!" });
    }

    res.status(200).json({ message: "✅ Xóa bảng lương thành công!" });
  });
});

// 🔹 API Cập nhật bảng lương theo ID
app.put("/api/salary/update/:id", (req, res) => {
  const salaryId = req.params.id;
  const {
    tonggiolam,
    tienthuong,
    tienphat,
    luongtheogio,
    thang,
    nam,
    trangthai,
    ngaythanhtoan,
  } = req.body;

  if (!tonggiolam || !luongtheogio || !thang || !nam) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
  }

  const tongluong =
    tonggiolam * luongtheogio + (tienthuong || 0) - (tienphat || 0);

  const sql =
    "UPDATE salary_table SET tonggiolam = ?, tienthuong = ?, tienphat = ?, luongtheogio = ?, tongluong = ?, thang = ?, nam = ?, trangthai = ?, ngaythanhtoan = ? WHERE id = ?";

  db.query(
    sql,
    [
      tonggiolam,
      tienthuong,
      tienphat,
      luongtheogio,
      tongluong,
      thang,
      nam,
      trangthai || "Chưa thanh toán",
      ngaythanhtoan || null,
      salaryId,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ Lỗi khi cập nhật bảng lương:", err);
        return res.status(500).json({ error: "Lỗi khi cập nhật bảng lương!" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Không tìm thấy bảng lương!" });
      }

      res.status(200).json({ message: "✅ Cập nhật bảng lương thành công!" });
    }
  );
});

app.get("/api/salary/search", (req, res) => {
  const { hoten } = req.query;

  if (!hoten) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp họ tên để tìm kiếm." });
  }

  const sql = `
    SELECT s.id, s.user_id, u.hoten, s.tonggiolam, s.tienthuong, s.tienphat, 
           s.luongtheogio, s.tongluong, s.thang, s.nam, s.trangthai, s.ngaythanhtoan
    FROM salary_table s
    JOIN user_table u ON s.user_id = u.id
    WHERE u.hoten LIKE ?
  `;

  db.query(sql, [`%${hoten}%`], (err, results) => {
    if (err) {
      console.error("❌ Lỗi khi tìm kiếm bảng lương:", err);
      return res.status(500).json({ error: "Lỗi khi tìm kiếm bảng lương!" });
    }
    res.status(200).json(results);
  });
});

app.post("/api/department/create", (req, res) => {
  const { tenphong, mota } = req.body;

  if (!tenphong) {
    return res.status(400).json({ error: "Vui lòng nhập tên phòng ban!" });
  }

  const sql = "INSERT INTO department_table (tenphong, mota) VALUES (?, ?)";
  db.query(sql, [tenphong, mota], (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi thêm phòng ban:", err);
      return res.status(500).json({ error: "Lỗi khi thêm phòng ban!" });
    }
    res.status(201).json({
      message: "✅ Thêm phòng ban thành công!",
      phongbanId: result.insertId,
    });
  });
});

app.get("/api/departments", (req, res) => {
  const sql = "SELECT * FROM department_table";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Lỗi khi lấy danh sách phòng ban:", err);
      return res
        .status(500)
        .json({ error: "Lỗi khi lấy danh sách phòng ban!" });
    }
    res.status(200).json(results);
  });
});

app.delete("/api/department/delete/:id", (req, res) => {
  const phongbanId = req.params.id;

  const sql = "DELETE FROM department_table WHERE id = ?";
  db.query(sql, [phongbanId], (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi xóa phòng ban:", err);
      return res.status(500).json({ error: "Lỗi khi xóa phòng ban!" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Không tìm thấy phòng ban!" });
    }
    res.status(200).json({ message: "✅ Xóa phòng ban thành công!" });
  });
});
