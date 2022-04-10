const { info } = require('winston');
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
	process.on('unhandledRejection', (ex) => {
		throw ex;
	});

	const logger = winston.createLogger({
		format: winston.format.combine(
			winston.format.timestamp(),
			winston.format.json(),
			winston.format.prettyPrint(),
			winston.format.errors({ stack: true }),
			winston.format.metadata()
		),
		transports: [
			new winston.transports.Console(),
			new winston.transports.File({
				filename: 'logfile.log'
			}),
			new winston.transports.File({
				filename: 'uncaughtExceptions.log',
				handleExceptions: true
			}),
			new winston.transports.MongoDB({ 
				db: 'mongodb://localhost/giftapp',
				// collection: log,
				metaKey: 'meta',
				options: { useUnifiedTopology: true },
				handleExceptions: true
			})
		]
	});
	winston.add(logger);
};