const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const indexRouter = require('./routes/index');
const detailRouter = require('./routes/detail');
const addRouter = require('./routes/add');

app.use('/', indexRouter);
app.use('/detail', detailRouter);
app.use('/add', addRouter);

// 404 route
app.use((req, res) => {
    res.status(404).render('404');
});

// Start de server
app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
}); 