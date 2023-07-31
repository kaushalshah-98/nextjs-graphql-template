import type { Formats, LoggerModes } from 'jet-logger';
import { ALL_SHEETS } from './constants';
import { ENV_MODE } from './enums';
import { paths } from './paths';

const privateKey = `n`;

const envVars = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prod: (process.env.NODE_ENV || process.env.VERCEL_ENV) === ENV_MODE.PRODUCTION,
  uploadDir: paths.uploadsPath,
  db: {
    host: process.env.POSTGRES_HOST as string,
    name: process.env.POSTGRES_DB as string,
    user: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    port: process.env.POSTGRES_PORT as string,
    connection: process.env.DB_CONNECTION,
  },
  email: {
    SENDGRID_API: process.env.SENDGRID_API as string,
  },
  excel: {
    sheetId: process.env.SHEET_ID,
    sheetName: process.env.VERCEL_URL?.includes('visaoswal')
      ? process.env.SHEET_NAME ?? ALL_SHEETS.DEV_TRIAL
      : ALL_SHEETS.DEV_TRIAL,
    type: process.env.CLIENT_TYPE as string,
    privateKey: (process.env.PRIVATE_KEY as string)?.replace(/\\n/g, '\n'),
    clientEmail: process.env.CLIENT_KEY as string,
    clientId: process.env.CLIENT_ID as string,
    projectId: process.env.PROJECT_ID,
    // scopes: (process.env.PROJECT_SCOPES as string)?.split(', '),
  },
  cloudinary: {
    url: process.env.CLOUDINARY_IMAGE_URL,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
    apiKey: process.env.CLOUDINARY_API_KEY as string,
    apiSecret: process.env.CLOUDINARY_API_SECRET as string,
    folderName: process.env.CLOUDINARY_FOLDER_NAME as string,
  },
  notion: {
    auth: process.env.NOTION_TOKEN,
  },
  drive: {
    sheetId: process.env.SHEET_ID,
    sheetName: process.env.SHEET_NAME ?? ALL_SHEETS.DEV_TRIAL,
    type: process.env.CLIENT_TYPE as string,
    privateKey: privateKey?.replace(/\\n/g, '\n'),
    clientEmail: process.env.CLIENT_KEY as string,
    clientId: process.env.CLIENT_ID as string,
    projectId: process.env.PROJECT_ID,
    scopes: (process.env.PROJECT_SCOPES as string)?.split(', '),
  },
  redis: {
    host: process.env.REDIS_HOST as string,
    password: process.env.REDIS_PASSWORD as string,
    port: process.env.REDIS_PORT as string,
  },
  logger: {
    JET_LOGGER_TIMESTAMP: process.env.JET_LOGGER_TIMESTAMP as unknown as boolean,
    JET_LOGGER_MODE: process.env.JET_LOGGER_MODE as LoggerModes,
    JET_LOGGER_FILEPATH: process.env.JET_LOGGER_FILEPATH as string,
    JET_LOGGER_FORMAT: process.env.JET_LOGGER_FORMAT as Formats,
  },
};
export { envVars };
