// Import required modules
import winston from 'winston';
import { Spinner } from '@topcli/spinner'
import config from './config.js';
class SpinnerTransport extends winston.Transport {
    constructor(opts) {
      super(opts);
      this.spinner = new Spinner({ name: 'line' })
      this.spinner.start('started')
    }
  
    log(info, callback) {
 
        this.spinner.text = info.message;
      
      if (callback) {
        callback();
      }
    }
  }


// Define custom format for logging
const customFormat = winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss A', // Changed to 12-hour format with AM/PM
    }),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  );
// Create a Winston logger
const logger = winston.createLogger({
  // Define the log levels and corresponding colors
  levels: winston.config.npm.levels,
  format: customFormat,
  transports: [

    // Console transport for colorized logging
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        customFormat
      ),
    }),
    // File transport for standard Linux .log format
    new winston.transports.File({
      filename: config.get('logFile'),
      level: 'info',
      format: customFormat,
    }),
  ],
});


export default logger;
