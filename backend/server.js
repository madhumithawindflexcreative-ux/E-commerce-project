const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/* IMAGE UPLOAD API */

app.post("/upload-images", upload.array("images",5), (req,res)=>{

  const filenames = req.files.map(file => file.filename);

  res.json({
    images: filenames
  });

});

app.use(cors());
app.use(express.json());



/* PRODUCT IMAGES */

app.get("/product-images/:id", (req,res)=>{

  const productId = req.params.id;

  const sql = "SELECT image FROM product_images WHERE product_id=?";

  db.query(sql,[productId],(err,result)=>{

    if(err){
      res.status(500).send(err);
    } else {
      res.json(result);
    }

  });

});

/* PRODUCTS API */

app.get("/products", (req, res) => {

  db.query("SELECT * FROM products", (err, result) => {

    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }

  });

});

app.post("/add-product", (req, res) => {

  console.log("Product received:", req.body);

  const { name, price, originalPrice, rating, image, images, category, showInHome } = req.body;

 const sql = `
INSERT INTO products (name, price, originalPrice, rating, image, images, category, showInHome)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

  db.query(sql, [name, price, originalPrice, rating, image,images, category, showInHome], (err, result) => {

    if (err) {
      console.log("Insert error:", err);
      res.status(500).send(err);
    } else {
      console.log("Product inserted successfully");
      res.json({ message: "Product added successfully" });
    }

  });

});

app.delete("/delete-product/:id", (req, res) => {

  console.log("DELETE API HIT:", req.params.id);

  const id = req.params.id;

  const sql = "DELETE FROM products WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.json({ message: "Product deleted successfully" });
    }

  });

});

/* UPDATE PRODUCT */

app.put("/update-product/:id", (req, res) => {

  const id = req.params.id;

  const { name, price, originalPrice, rating, image, category, showInHome } = req.body;

  const sql = `
    UPDATE products
    SET name = ?, price = ?, originalPrice = ?, rating = ?, image = ?, category = ?, showInHome = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [name, price, originalPrice, rating, image, category, showInHome, id],
    (err, result) => {

      if (err) {
        console.log("Update error:", err);
        res.status(500).send(err);
      } else {
        console.log("Product updated successfully");
        res.json({ message: "Product updated successfully" });
      }

    }
  );

});

/* USER AUTH */

app.post("/signup", (req, res) => {

  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, password], (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.json({ message: "User registered successfully" });
    }

  });

});

app.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {

    if (err) {
      res.status(500).send(err);
    }

    else if (result.length > 0) {

      const user = result[0];

      res.json({
        success: true,
        user: user
      });

    }

    else {
      res.json({
        success: false,
        message: "Invalid login"
      });
    }

  });

});

/* ADMIN STATS */

app.get("/admin-stats", (req, res) => {

  const stats = {
    products: 0,
    users: 0,
    orders: 0
  };

  db.query("SELECT COUNT(*) AS totalProducts FROM products", (err, p) => {

    if (!err && p.length > 0) {
      stats.products = p[0].totalProducts || 0;
    }

    db.query("SELECT COUNT(*) AS totalUsers FROM users", (err, u) => {

      if (!err && u.length > 0) {
        stats.users = u[0].totalUsers || 0;
      }

      db.query("SELECT COUNT(*) AS totalOrders FROM orders", (err, o) => {

        if (!err && o.length > 0) {
          stats.orders = o[0].totalOrders || 0;
        }

        res.json(stats);

      });

    });

  });

});

/* ORDERS */

app.post("/place-order",(req,res)=>{

const {email, product_name, price, quantity, image} = req.body;

const sql = `
INSERT INTO orders (user_email, product_name, price, quantity, image, status)
VALUES (?, ?, ?, ?, ?, 'Placed')
`;

db.query(sql,[email, product_name, price, quantity, image],(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({success:false});
}

res.json({success:true});

});

});


app.get("/orders", (req, res) => {

  db.query("SELECT * FROM orders", (err, result) => {

    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }

  });

});


app.get("/api/orders/:email", (req,res)=>{

const email = req.params.email;

const sql = "SELECT * FROM orders WHERE user_email = ?";

db.query(sql,[email],(err,result)=>{

if(err){
return res.status(500).json(err);
}

res.json(result);

});

});




app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});