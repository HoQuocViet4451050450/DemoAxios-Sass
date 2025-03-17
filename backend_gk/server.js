const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3005;

// Middleware
app.use(cors()); // Cho phép CORS để frontend gọi API
app.use(bodyParser.json()); // Đọc dữ liệu JSON từ request

// Mock database (danh sách người dùng)
let users = [];

// API GET: Lấy danh sách người dùng
app.get("/users", (req, res) => {
  res.json(users);
});

// API POST: Thêm người dùng mới
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.json({ message: "Người dùng đã được thêm!", user: newUser });
});

// API DELETE: Xóa người dùng theo ID
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter(user => user.id !== userId);
  res.json({ message: `Người dùng ${userId} đã bị xóa` });
});

// Chạy server
app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});

// API PUT: Cập nhật người dùng theo ID
app.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
  
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = { id: userId, name, email };
      res.json({ message: "Người dùng đã được cập nhật!", user: users[userIndex] });
    } else {
      res.status(404).json({ message: "Người dùng không tồn tại!" });
    }
  });
  