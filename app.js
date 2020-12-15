const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
//   console.log("connected");
// });
// const employee = require('./model/Employee');
// const employeeRoute = require('./routes/EmployeeRoute');
// const authRoute = require('./routes/AuthRoute');
const userRoute = require('./routes/userRoute');
const registerRoute = require('./routes/RegisterRoute');
const loginRoute = require('./routes/LoginRoute');
const projectRoute = require('./routes/project');
const app = express();
dotenv.config({ path: './.env' });
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(passport.initialize());
app.use(cors());
require('./middleware/passport')(passport);


// app.use(async (req, res, next) => {

//     employee.findById(1, async (err, result) => {
//         res.locals.loggedInEmployee = result;
//         if (req.header["x-access-token"]) {
//             const accessToken = req.header["x-access-token"];
//             const { employeeId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
    
//             if (exp < Date.now().valueOf() / 1000) {
//                 return res.status(401).json({
//                     error: "JWT token has expired, please login to obtain a new one"
//                 });
//             }
//             next()
//         } else {
//             next()
//         }
//     });
// });

// app.use('/', employeeRoute);
// app.use('/login', authRoute);
app.use('/', userRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/project', projectRoute);

module.exports = app;