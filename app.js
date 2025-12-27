const express = require('express');
const app = express();

const cookiesParser = require('cookie-parser');
const path = require('path');

const db=require('./config/mongoose-connection');

const ownerRoutes=require('./routes/ownerRouter');
const productRoutes=require('./routes/productRouter');
const userRoutes=require('./routes/userRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());   
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

app.use('/owners', ownerRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.listen(3000);