const mqtt = require('mqtt');


module.exports = () => {
	return mqtt.connect( process.env.MQTT_SERVER_URL );
};