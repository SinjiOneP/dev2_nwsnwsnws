const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Stel EJS in als de view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware om statische bestanden te serveren
app.use(express.static(path.join(__dirname, 'public')));

// Middleware om JSON-gegevens te parseren
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Voor het parseren van URL-gecodeerde gegevens

// Laad de artikelen uit het JSON-bestand
const newsPath = path.join(__dirname, 'data', 'news.json');
let nieuwsberichten = [];

// Functie om artikelen te laden
function loadNews() {
    const data = fs.readFileSync(newsPath);
    nieuwsberichten = JSON.parse(data);
}

// Functie om een nieuw artikel toe te voegen
function addNews(newArticle) {
    nieuwsberichten.push(newArticle);
    fs.writeFileSync(newsPath, JSON.stringify(nieuwsberichten, null, 2)); // Schrijf de nieuwe artikelen terug naar het bestand
}

// Route voor de indexpagina
app.get('/', (req, res) => {
    loadNews(); // Laad de artikelen
    res.render('index', { nieuwsberichten });
});

// Route voor de detailpagina
app.get('/detail/:slug', (req, res) => {
    const slug = req.params.slug;
    const artikel = nieuwsberichten.find(a => a.slug === slug);
    if (artikel) {
        res.render('detail', { title: artikel.title, content: artikel.content });
    } else {
        res.status(404).render('404'); // Render de 404-pagina
    }
});

// Route voor het toevoegen van een artikel
app.get('/add', (req, res) => {
    res.render('add'); // Render de add view
});

// POST-route om een nieuw artikel toe te voegen
app.post('/add', (req, res) => {
    const newArticle = {
        slug: req.body.slug,
        title: req.body.title,
        content: req.body.content,
        date: new Date().toISOString().split('T')[0] // Huidige datum in YYYY-MM-DD formaat
    };
    addNews(newArticle); // Voeg het artikel toe
    res.redirect('/'); // Redirect naar de indexpagina
});

// 404-pagina voor andere niet-gevonden routes
app.use((req, res) => {
    res.status(404).render('404'); // Render de 404-pagina voor andere routes
});

// Start de server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 