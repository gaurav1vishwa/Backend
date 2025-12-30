
require('dotenv').config();
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');


require('./config/mongoose-connection');

const indexRoutes = require('./routes/index');
const ownerRoutes = require('./routes/ownerRouter');
const productRoutes = require('./routes/productRouter');
const userRoutes = require('./routes/userRouter');




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET_KEY,
})
);
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRoutes);
app.use('/owners', ownerRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);


app.listen(3000, () => {
  console.log('Server running on port 3000');
});

