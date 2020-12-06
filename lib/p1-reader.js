const P1Reader = require( 'p1-reader' );

const logger = require( './logger' );

module.exports = () => {
	let p1Reader;
	if ( process.env.P1_SERIAL_PORT ) {
		p1Reader = new P1Reader( {
			"port": process.env.P1_SERIAL_PORT,
			"baudRate": 9600,
			"parity": "even",
			"dataBits": 7,
			"stopBits": 1,
			"debug": false
		} );
	} else {
		logger.info( 'Using P1 emulator.' );
		p1Reader = new P1Reader( { emulator: true, interval:1 } );
	}
	return p1Reader;
};