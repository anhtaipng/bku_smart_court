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

app.listen(5000, () => {
    console.log("server at port 5000");
})