import express from 'express';
import mysql from 'mysql';

const app = express();


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



app.listen(5000, () => {
    console.log("server at port 5000");
})