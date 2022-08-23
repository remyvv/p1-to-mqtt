require( 'dotenv' ).config();

const logger = require( './lib/logger' );
const p1Reader = require( './lib/p1-reader' )();
const mqtt = require( './lib/mqtt' )();

const mqttTopic = ( key ) => {
	const prefix = process.env.MQTT_TOPIC_PREFIX || 'rkvv_p1/smartmeter';
	return `${prefix}/${key}`;
};

let messagesSend = {};

const recursiveSend = ( object, prefix = '' ) => {
	Object.keys( object ).forEach( function ( key ) {
		if ( object[key] === null ) {
			return;
		}
		const topicKey = prefix ? `${prefix}/${key}` : key;
		if ( typeof object[ key ] === 'object' ) {
			recursiveSend( object[ key ], topicKey );
		} else {
			const message = object[ key ].toString();
			if (messagesSend.hasOwnProperty( topicKey ) && messagesSend[ topicKey ] === message) {
				return;
			}
			messagesSend[ topicKey ] = message;
			mqtt.publish(mqttTopic( topicKey ), message );
		}
	});
};

mqtt.on( 'connect', () => logger.success( 'Connected to MQTT server.' ) );
mqtt.on( 'reconnect', () => logger.info( 'MQTT Reconnecting.' ) );
mqtt.on( 'close', () => logger.warning( 'MQTT Connection closed.' ) );
mqtt.on( 'disconnect', () => logger.warning( 'MQTT Disconnected.' ) );
mqtt.on( 'offline', () => logger.error( 'MQTT Offline' ) );
mqtt.on( 'error', err => logger.error( 'MQTT Error: ' + err ) );


p1Reader.on( 'connect', () => logger.success( 'Connected to P1-port.' ) );

p1Reader.on( 'reading', data => {
	logger.info( 'Received reading from P1-port.' );
	recursiveSend( data, data.equipmentId );
} );

p1Reader.on( 'error', err => logger.error( 'Error while reading P1-port: ' + err ) );

process.on('exit', (code) => {
	mqtt.end();
});