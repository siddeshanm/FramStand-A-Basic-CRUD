const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Product = require('./models/product');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/framStand');
  console.log("CONNECTION SUCCESSFUL!!");
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.listen(3000, () => {
  console.log(' APP LISTENING TO 3000...')
})
app.get('/products', async (req, res) => {
  const products = await Product.find({});
  res.render('products/index.ejs', { products });
})
app.get('/products/new', (req, res) => {
  res.render('products/new');

})
app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`products/${newProduct._id}`);
})
app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.render('products/edit', { product })
})
app.put('/products/:id', async (req, res) => {
  const { id } = req.params
  const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
  res.redirect(`/products/${product._id}`)
})
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params
  const deletedProduct = await Product.findByIdAndDelete(id)
  res.redirect('/products')
})
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById({ _id: `${id}` });
  res.render('products/show.ejs', { product })

})

