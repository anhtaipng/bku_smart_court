import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'bku',
  password: '123456',
  database: 'food_court'
});
connection.connect(function (err) {
  (err) ? console.log(err) : console.log(connection);
});


//tai data cho home screen
app.get("/api/products", (req, res) => {
  const vendor = req.query.vendor ? req.query.vendor : '';
  var sql;
  sql = "SELECT * FROM products";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    if (vendor == '')
      res.json(results);
    else {
      const products = results.filter(x => x.vendor === vendor);
      res.json(products);
    }
  });
});

//tai productdetail cho product screen
app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const sql = "SELECT * FROM products WHERE _id = " + productId;
  connection.query(sql, function (err, results) {
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
          isChef: signinUser.isChef,
          isITstaff: signinUser.isITstaff,
        });
      else res.status(401).send({ message: 'Password wrong.' });
    }
    else res.status(401).send({ message: 'Invalid Email or Password.' });
  });
});


//xu ly register
app.post("/api/users/register", (req, res) => {
  var sql = "INSERT INTO users(name,email,password,isAdmin,isChef, isITstaff, isManager, vendor) VALUES(?,?,?,?,?,?,?,?)";
  const prepare = [req.body.name, req.body.email, req.body.password, 0, 0, 0,0,0];
  sql = connection.format(sql, prepare);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log("Register thanh cong");
  });

  sql = "SELECT * FROM users";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    const newUser = results.find(x => x.email === req.body.email);
    if (newUser)
      res.send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        isChef: newUser.isChef,
        isITstaff: newUser.isITstaff,
        isManager: newUser.isManager,
        isVendor: newUser.isVendor
      });
    else res.status(401).send({ msg: 'Invalid User Data.' });
  })

});

//xu ly create new product
app.post("/api/products", (req, res) => {
  var sql = "INSERT INTO products(name,category,image,price,brand,rating,numReviews,countInStock,description) VALUES(?,?,?,?,?,?,?,?,?)";
  const prepare = [req.body.name, req.body.category, req.body.image, req.body.price, req.body.brand, 0, 0, req.body.countInStock, req.body.description];
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
  var sql = "UPDATE products SET name=? , category=? , image=? , price=? , brand=? , countInStock=?, description=? WHERE _id = ?";
  if (req.body.price < 0 || req.body.countInStock < 0) return res.status(500).send({ message: ' Error in Creating Product.' });
  const prepare = [req.body.name, req.body.category, req.body.image, req.body.price, req.body.brand, req.body.countInStock, req.body.description, productId];
  connection.query(sql, prepare, function (err, results) {
    if (err) throw err;
    console.log("Edit thanh cong");
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
  var sql = "DELETE FROM products WHERE _id = " + productId;
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

//xu ly create order


app.post("/api/orders", async (req, res) => {

  //xu ly update coountinstock
  var i = 0;
  while (i < req.body.orderItems.length) {
    if (req.body.orderItems[i].countInStock - req.body.orderItems[i].qty < 0) return res.status(500).send({ message: ' Error in Creating Product.' });
    sql = "UPDATE products SET countInStock=? WHERE _id=?";
    const prepare = [req.body.orderItems[i].countInStock - req.body.orderItems[i].qty, req.body.orderItems[i].product];
    sql = connection.format(sql, prepare);
    connection.query(sql, function (err, results) {
      if (err) throw err;
      console.log("update coountinstock thanh cong");
    });
    i++;
  }
  //ket thuc update coountinstock

  var sql = "INSERT INTO orders(_id_user,orderItems,totalPrice,isDone,isReceived,requirement) VALUES(?,?,?,?,?,?)";
  const itemsDetail = req.body.orderItems.reduce((a, c) => a + "    " + String(c.qty) + c.name, " ");
  const prepare = [req.body._id, itemsDetail, req.body.totalPrice, 0, 0, req.body.requirement];
  sql = connection.format(sql, prepare);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log("Create thanh cong");
  });


  sql = "SELECT * FROM orders";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    const newOrderCreated = results.find(x => x.orderItems === itemsDetail);
    if (newOrderCreated) {
      return res.status(201).send({ message: 'New Order Created', data: newOrderCreated });
    }
    return res.status(500).send({ message: ' Error in Creating Product.' });
  })
});

//xu ly tai my list orders
app.get("/api/orders/:id", async (req, res) => {
  const userID = req.params.id;
  const sql = "SELECT * FROM orders WHERE _id_user = " + userID;
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json(results);
  });
});

//xuly tai list orders cho manage xem
app.get("/api/orders", async (req, res) => {
  var sql = "SELECT * FROM orders ORDER BY _id_order DESC";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json(results);
  });
});


//xu ly tai list order cho chef xem
app.get("/api/chef", async (req, res) => {
  var sql = "SELECT * FROM orders ORDER BY _id_order ASC";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    const orders = results.filter(x => x.isDone === 0);
    res.json(orders);
  });
});

//xu ly done cua chef
app.put("/api/chef", async (req, res) => {
  var sql = "UPDATE orders SET isDone=? WHERE _id_order=?";
  const prepare = [1, req.body._id_order];
  sql = connection.format(sql, prepare);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log("done thanh cong");
    res.send(true);
  });
})


//xu ly taken cua customer
app.put("/api/customer", async (req, res) => {
  var sql = "UPDATE orders SET isReceived=? WHERE _id_order=?";
  const prepare = [1, req.body._id_order];
  sql = connection.format(sql, prepare);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log("taken thanh cong");
    res.send(true);
  });
})

//xu ly tai list user cho IT staff
app.get("/api/users", async (req, res) => {
  var sql = "SELECT * FROM users ORDER BY _id DESC";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json(results);
  });
});


//xu ly add manager
app.put("/api/users/addmanager", async (req, res) => {
  var sql = "UPDATE users SET isAdmin=? WHERE _id=?";
  const prepare = [1, req.body._id];
  sql = connection.format(sql, prepare);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log("add manager thanh cong");
    res.send(true);
  });
})

//xu ly delete manager
app.put("/api/users/deletemanager", async (req, res) => {
  var sql = "UPDATE users SET isAdmin=? WHERE _id=?";
  const prepare = [0, req.body._id];
  sql = connection.format(sql, prepare);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log("delete manager thanh cong");
    res.send(true);
  });
})

//xu ly add chef
app.put("/api/users/addchef", async (req, res) => {
  var sql = "UPDATE users SET isChef=? WHERE _id=?";
  const prepare = [1, req.body._id];
  sql = connection.format(sql, prepare);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log("add chef thanh cong");
    res.send(true);
  });
})


//xu ly delete chef
app.put("/api/users/deletechef", async (req, res) => {
  var sql = "UPDATE users SET isChef=? WHERE _id=?";
  const prepare = [0, req.body._id];
  sql = connection.format(sql, prepare);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log("delete chef thanh cong");
    res.send(true);
  });
})


//xu ly hien sidebar vendors
app.get("/api/vendors", async (req, res) => {
  var sql = "SELECT * FROM vendors";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
})

app.listen(5000, () => {
  console.log("server at port 5000");
})