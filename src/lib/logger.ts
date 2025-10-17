import winston from 'winston';

// Configuração do logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'arco-backend',
    environment: process.env.NODE_ENV,
  },
  transports: [
    // Console (sempre ativo)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp, ...meta }) => {
          const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
          return `${timestamp} [${level}]: ${message} ${metaStr}`;
        })
      ),
    }),
  ],
});

// Adicionar transporte para CloudWatch em produção (opcional)
if (process.env.NODE_ENV === 'production' && process.env.AWS_CLOUDWATCH_LOG_GROUP) {
  // Instalar: pnpm add winston-cloudwatch
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const WinstonCloudWatch = require('winston-cloudwatch');
    
    logger.add(
      new WinstonCloudWatch({
        logGroupName: process.env.AWS_CLOUDWATCH_LOG_GROUP,
        logStreamName: `instance-${process.env.INSTANCE_ID || 'default'}`,
        awsRegion: process.env.AWS_REGION || 'sa-east-1',
      })
    );
  } catch (error) {
    console.warn('CloudWatch logger não disponível:', error);
  }
}

export { logger };
