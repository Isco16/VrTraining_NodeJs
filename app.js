const express = require('express');
const coursesRoute = require('./src/routes/courses.route.js');
const usersRoute = require('./src/routes/users.route.js')
const authRoute = require('./src/routes/auth.route.js');
const app = express();

app.use(express.json());
app.use('/api/v1/courses', coursesRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/auth', authRoute);

module.exports = app;