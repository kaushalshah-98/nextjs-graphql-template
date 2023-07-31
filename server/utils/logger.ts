import logger, { JetLogger } from 'jet-logger';
import { envVars } from '../config';

class Logger {
  constructor() {
    JetLogger(
      envVars.logger.JET_LOGGER_MODE,
      envVars.logger.JET_LOGGER_FILEPATH,
      envVars.logger.JET_LOGGER_TIMESTAMP,
      envVars.logger.JET_LOGGER_FORMAT
    );
  }

  public static info(...msg: unknown[]): void {
    logger.info(msg, true);
  }

  public static imp(...msg: unknown[]): void {
    logger.imp(msg, true);
  }

  public static debug(...msg: unknown[]): void {
    logger.warn(msg, true);
  }

  public static warn(...msg: unknown[]): void {
    logger.warn(msg, true);
  }

  public static error(...msg: unknown[]): void {
    logger.err(msg, true);
  }
}
export { Logger };
