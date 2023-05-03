const mysql = require('mysql');
const Tello = require('../../node_modules/@harleylara/tello-js/src/tello');
const db = require('../db');
const drone = new Tello();

// Fonction pour récupérer les coordonnées X, Y, Z et la rotation d'une zone à partir de son ID
function getZone(zoneId, callback) {
  const query = `SELECT x, y, z, rotation FROM location WHERE id_location = ${zoneId}`;
  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      callback(null);
    } else {
      const { x, y, z, rotation } = results[0];
      callback({ x, y, z, rotation });
    }
  });
}
function flyToPosition(zoneId) {
  return new Promise((resolve, reject) => {
    getZone(zoneId, (zone) => {
      if (!zone) {
        reject(new Error(`Zone ${zoneId} not found`));
        return;
      }

      drone.connect()
        .then(() => {
          return drone.sendCmd('takeoff');
        })
        .then(() => {
          return new Promise(resolve => setTimeout(resolve, 2000));
        }) // attendre 2 secondes avant de continuer
        .then(() => {
          return drone.sendCmd(`up ${zone.z}`);
        })
        .then(() => {
          return new Promise(resolve => setTimeout(resolve, 2000));
        }) 
        .then(() => {
          return drone.sendCmd(`right ${zone.y}`);
        })
        .then(() => {
          return new Promise(resolve => setTimeout(resolve, 2000));
        }) 
        .then(() => {
          return drone.sendCmd(`cw ${zone.rotation}`);
        })
        .then(() => {
          return new Promise(resolve => setTimeout(resolve, 2000));
        }) 
        .then(() => {
          return drone.sendCmd(`back ${zone.x}`);
        })
        .then(() => {
          return new Promise(resolve => setTimeout(resolve, 2000));
        }) 
        .then(() => {
          return drone.sendCmd('land');
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

module.exports = flyToPosition;


