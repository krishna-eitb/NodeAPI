const express = require("express");
const mongoose = require("mongoose");

const Product = require("./models/product.model.js");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey i am Nodejs API server");
});

app.get("/api/products",async (req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://krishnaeitb:m3KwoPDJvx9kFo41@productdb.ro5x7.mongodb.net/?retryWrites=true&w=majority&appName=ProductDb"
  )

  .then(() => {
    console.log("Database connection Successfull");
    app.listen(3000, () => {
      console.log("server is running in the port 3000");
    });
  })

  .catch(() => {
    console.log("Database connection Failed ");
  });
