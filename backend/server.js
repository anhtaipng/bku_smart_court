import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user_Test',
    password: '123456',
    database: 'testMySQL'
  });
  connection.connect(function(err){
    (err) ? console.log(err) : console.log(connection);
  });

  
//tai data cho home screen
app.get("/api/products", (req, res) => {
    const sql = "SELECT * FROM products";
    connection.query(sql, function(err, results) {
      if (err) throw err;
      res.json(results);
    });
});

//tai productdetail cho product screen
app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const sql = "SELECT * FROM products WHERE _id = " + productId;
    connection.query(sql, function(err, results) {
        if (err) throw err;
        const product = results.find(x => x._id === parseInt(productId));
        res.json(product);
      });
});

//xu ly sign in
app.post("/api/users/signin", (req, res) => {
  const sql = "SELECT * FROM users";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    const signinUser = results.find(x => x.email === req.body.email);
    if (signinUser) {
      if (signinUser.password === req.body.password)
        res.send({
          _id: signinUser._id,
          name: signinUser.name,
          email: signinUser.email,
          isAdmin: signinUser.isAdmin,
        });
      else res.status(401).send({ message: 'Password wrong.' });
    }
    else res.status(401).send({ message: 'Invalid Email or Password.' });
  });
});


//xu ly register
app.post("/api/users/register", (req, res) => {
  var sql = "INSERT INTO users(name,email,password,isAdmin) VALUES(?,?,?,?)";
  const prepare = [req.body.name,req.body.email,req.body.password,0];
  sql = connection.format(sql,prepare);
  connection.query(sql, function(err,results){
    if (err) throw err;
    console.log("Register thanh cong");
  });

  sql = "SELECT * FROM users";
  connection.query(sql, function(err,results){
    if (err) throw err;
    const newUser= results.find(x => x.email === req.body.email);
    if (newUser)
    res.send({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
    else res.status(401).send({ msg: 'Invalid User Data.' });
  })

});


//xu ly create new product
app.post("/api/products", (req, res) => {
  var sql = "INSERT INTO products(name,category,image,price,brand,rating,numReviews,countInStock) VALUES(?,?,?,?,?,?,?,?)";
  const prepare = [req.body.name, req.body.category, req.body.image, req.body.price, req.body.brand, 0, 0, req.body.countInStock];
  sql = connection.format(sql, prepare);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log("Create thanh cong");
  });

  sql = "SELECT * FROM products";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    const newProduct = results.find(x => x.name === req.body.name);
    if (newProduct) {
      return res.status(201).send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(500).send({ message: ' Error in Creating Product.' });
  })
})

//xu ly edit product
app.put("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  var sql = "UPDATE products SET name=? , category=? , image=? , price=? , brand=? , countInStock=? WHERE _id = ?"
  const prepare = [req.body.name, req.body.category, req.body.image, req.body.price, req.body.brand, req.body.countInStock, productId];
  connection.query(sql, prepare, function (err, results) {
    if (err) throw err;
    console.log("Create thanh cong");
  });
  sql = "SELECT * FROM products";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    const updateProduct = results.find(x => x._id === parseInt(productId));
    if (updateProduct) {
      return res.status(200).send({ message: 'Product Updated', data: updateProduct });
    }
    return res.status(500).send({ message: ' Error in Creating Product.' });
  })
});


//xu ly xoa product
app.delete("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  var sql = "DELETE FROM products WHERE _id = "+productId;
  connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log("Delete thanh cong");
  });
  sql = "SELECT * FROM products";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    const deletedProduct = results.find(x => x._id === parseInt(productId));
    if (deletedProduct) {
      res.send({ message: "Product Deleted" });
    } else {
      res.send("Error in Deletion.");
    }
  });

});

app.listen(5000, () => {
    console.log("server at port 5000");
})