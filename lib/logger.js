const chalk = require('chalk');

const output = ( method='log', level, message ) => {
	console[method]( `[${level}] ${message}` );
}

module.exports = {
	success: (message) => {
		output( 'log', chalk.green('SUCCESS'), message );
	},
	error: (message) => {
		output( 'error', chalk.redBright('ERROR'), message );
	},
	warning: (message) => {
		output( 'error', chalk.red('WARNING'), message );
	},
	info: (message) => {
		output( 'log', chalk.yellow('INFO'), message );
	},
};