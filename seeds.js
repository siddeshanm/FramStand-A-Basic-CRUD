const mongoose = require('mongoose');
const { db } = require('./models/product');

const Product=require('./models/product');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/framStand');
  console.log("CONNECTION SUCCESSFUL!!");
}
/*const p= new Product({
    name:'grapes',
    price:1.99,
    category:'fruit'
})
p.save().then(data=>{ console.log(data)}).catch(err=>{console.log(err)})*/
const seedProducts=[
    {
        name:'milk',
        price:5,
        category:'dairy'
    },
    {
        name:'eggs',
        price:2,
        category:'dairy'
    },
    {
        name:'pineapple',
        price:1.99,
        category:'fruit'
    },
    {
        name:'coconut',
        price:6,
        category:'vegetable'
    },
    {
        name:'carrot',
        price:1,
        category:'vegetable'
    }
]
Product.insertMany(seedProducts)
.then(data=>{
    console.log(data)
})
.catch(err=>{
console.log(err)
})
