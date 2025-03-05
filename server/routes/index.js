const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Laad nieuwsberichten
const newsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/news.json')));

// Startpagina
router.get('/', (req, res) => {
    res.render('index', { news: newsData });
});

module.exports = router; 