const express = require('express');
const mysql = require('mysql');
const app = express();
const db = require('./db')
const flyToPosition = require('./scripts/vol');
const vol = require('./scripts/vol');
const port = process.env.PORT || 3003;



// Configuration du moteur de template EJS
app.set('view engine', 'ejs');

// Configuration du dossier public pour servir les fichiers statiques
app.use(express.static(__dirname + '/public'));

// Configuration des routes
app.get('/', (req, res) => {
  db.query('SELECT * FROM location', (err, results) => {
    if (err) {
      throw err;
    }
    res.render('index', { zones: results });
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/vol', (req, res) => {
  const selectedZones = req.body;
  
  for (const zoneId of Object.values(selectedZones)) {
    flyToPosition(zoneId);
  }
  
  res.send('Drone en vol');
});




// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
