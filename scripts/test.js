const Tello = require('../../node_modules/@harleylara/tello-js/src/tello');
const wsServer = require('../../node_modules/@harleylara/tello-js/src/server');


const drone = new Tello();
drone.connect();
// drone.sendCmd('takeoff');
drone.sendCmd('streamon');
drone.initFfmpeg();

const server = new wsServer(drone);



/*setTimeout(() => {
    drone.getFrame();
    }, 3000); */