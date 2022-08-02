const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require("./middleware/jwt");


const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.options('*', cors())
app.use(express.json());
app.use('/images', express.static(__dirname + '/images'));
app.use(auth());


const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');


app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', ordersRoutes);


mongoose.connect('mongodb://localhost:27017/travelerspoint').then(() => {
    console.log('Database Connected');
}).catch(() => {
    console.log('Failed To Connect To The Database');
})


app.listen(port , () => {
    console.log(`Server is Running at http://localhost:${port}/api/`)
})
