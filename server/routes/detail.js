const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Laad nieuwsberichten
const newsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/news.json')));

// Detailpagina
router.get('/:slug', (req, res) => {
    const newsItem = newsData.find(item => item.slug === req.params.slug);
    if (newsItem) {
        res.render('detail', { newsItem });
    } else {
        res.status(404).render('404');
    }
});

module.exports = router; 