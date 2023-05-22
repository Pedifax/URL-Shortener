
import winston, { createLogger, format, transports } from 'winston';

const httpTransportOptions = {
    host: 'http-intake.logs.us5.datadoghq.com',
    path: '/api/v2/logs?dd-api-key=790a2b43e37f5d6ec32556a8e82c5835&ddsource=nodejs&service=team2',
    ssl: true
  };
  
const DDlogger = createLogger({
    level: 'info',
    exitOnError: false,
    format: format.json(),
    transports: [
        new transports.Http(httpTransportOptions),
    ],
});

export default DDlogger;