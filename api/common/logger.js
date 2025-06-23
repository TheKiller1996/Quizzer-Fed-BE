const { configDotenv } = require('dotenv');
const winston = require('winston');
configDotenv();

const ENV = process.env.NODE_ENV || 'development'

let logger;

if(ENV === 'development'){
    logger = winston.createLogger({
        level: 'debug',
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(({timestamp, level, message})=>{
                return `${timestamp} [${level}]: ${message}`
            })
        ),
        transports: [new winston.transports.Console()],
    })
} else {

    if (!process.env.CORALOGIX_PRIVATE_KEY) {
        throw new Error('Missing CORALOGIX_PRIVATE_KEY env var');
    }
    const coralogixLogger = new CoralogixLogger({
    privateKey: process.env.CORALOGIX_PRIVATE_KEY,
    applicationName: 'MyApp',       // change to your app name
    subsystemName: 'MySubsystem',   // optional
  });

  const coralogixTransport = new CoralogixTransport({ logger: coralogixLogger });

  logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json() // JSON format for structured logs
    ),
    transports: [
      coralogixTransport,
      new winston.transports.Console(), // optional: keep console logs in prod
    ],
  });

}