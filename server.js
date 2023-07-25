const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// GET →  Lấy về dữ liệu của toàn bộ users
app.get("/api/v1/users/", (req, res) => {
  const users = JSON.parse(fs.readFileSync("data/users.json"));
  console.log(users);
  res.json(users);
});

// GET →  Lấy về dữ liệu của một user
app.get("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  try {
    const users = JSON.parse(fs.readFileSync("data/users.json"));
    let user = users.find((e) => e.id === Number(id));
    if (!user) {
      res.json({
        message: "User not found",
      });
    } else {
      res.json({
        user: user,
      });
    }
  } catch (error) {
    res.json({
      error: error,
      status: "fail",
      message: "Invalid path",
    });
  }
});

// POST →  Thêm mới dữ liệu về 1 users vào trong CSDL
app.post("/api/v1/users/", (req, res) => {
  const { name, username, email, address, phone, website, company } = req.body;
  let users = JSON.parse(fs.readFileSync("./data/users.json"));
  console.log(users.length);
  const user = {
    id: users.length + 1,
    name,
    username,
    email,
    address,
    phone,
    website,
    company,
  };
  try {
    users.push(user);
    fs.writeFileSync("./data/users.json", JSON.stringify(users));
    res.json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
});
// PUT →  Chỉnh sửa dữ liệu của 1 user (email)

// DELETE	 →  Xoá dữ liệu về một user
app.delete("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  try {
    const users = JSON.parse(fs.readFileSync("data/users.json"));
    let newUsers = users.filter((e) => e.id !== Number(id));
    res.json({
      user: newUsers,
    });
    fs.writeFileSync("data/users.json", JSON.stringify(newUsers));
  } catch (error) {
    console.log(error);
  }
});
// GET →  Lấy về dữ liệu của một post
app.get("/api/v1/posts/:id/", (req, res) => {
  const { id } = req.params;
  try {
    const posts = JSON.parse(fs.readFileSync("data/posts.json"));
    let post = posts.find((e) => e.id === Number(id));
    if (!post) {
      res.json({
        message: "User not found",
      });
    } else {
      res.json({
        post: post,
      });
    }
  } catch (error) {
    res.json({
      error: error,
      status: "fail",
      message: "Invalid path",
    });
  }
});
// GET →  Lấy về dữ liệu của toàn bộ post
app.get("/api/v1/posts", (req, res) => {
  const posts = JSON.parse(fs.readFileSync("data/posts.json"));
  console.log(posts);
  res.json(posts);
});
// POST →  Thêm mới dữ liệu về 1 post vào trong CSDL
app.post("/api/v1/posts", (req, res) => {
  const { userId, title, body } = req.body;
  let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
  const post = {
    userId,
    id: posts.length + 1,
    title,
    body,
  };
  try {
    posts.push(post);
    fs.writeFileSync("./data/posts.json", JSON.stringify(posts));
    res.json({
      post,
    });
  } catch (error) {
    console.log(error);
  }
});
// PUT →  Chỉnh sửa dữ liệu của 1 post ()

// DELETE	 →  Xoá dữ liệu về một post
app.delete("/api/v1/posts/:id", (req, res) => {
  const { id } = req.params;
  try {
    const posts = JSON.parse(fs.readFileSync("data/posts.json"));
    let newPosts = posts.filter((e) => e.id !== Number(id));
    res.json({
      post: newPosts,
    });
    fs.writeFileSync("data/posts.json", JSON.stringify(newPosts));
  } catch (error) {
    console.log(error);
  }
});

// GET toàn bộ post của 1 user
app.get("/api/v1/users/:id/posts", (req, res) => {
  const { id } = req.params;
  try {
    const posts = JSON.parse(fs.readFileSync("data/posts.json"));
    let post = posts.filter((e) => e.userId === Number(id));
    res.json({
      post: post,
    });
  } catch (error) {
    console.log(error);
  }
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
