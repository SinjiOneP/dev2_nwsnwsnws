const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Laad nieuwsberichten
const newsDataPath = path.join(__dirname, '../data/news.json');

// Formulier voor toevoegen van nieuws
router.get('/', (req, res) => {
    res.render('add');
});

// POST route om nieuws toe te voegen
router.post('/', (req, res) => {
    const newNewsItem = req.body;
    const newsData = JSON.parse(fs.readFileSync(newsDataPath));
    newsData.push(newNewsItem);
    fs.writeFileSync(newsDataPath, JSON.stringify(newsData, null, 2));
    res.redirect('/');
});

module.exports = router; 