import { google } from 'googleapis';
import type { sheets_v4, Auth, drive_v3 } from 'googleapis';
import { envVars } from '../config';
import { Logger } from '../utils';

class GoogleApi {
  private static clientOptions: Auth.GoogleAuthOptions = {
    credentials: {
      type: envVars.drive.type,
      private_key: envVars.drive.privateKey,
      client_email: envVars.drive.clientEmail,
      client_id: envVars.drive.clientId,
    },
    projectId: envVars.drive.projectId,
    scopes: envVars.drive.scopes,
  };

  public static async getConnection(): Promise<sheets_v4.Sheets | null> {
    try {
      const auth = await google.auth.getClient(GoogleApi.clientOptions);
      const sheets = google.sheets({ version: 'v4', auth });
      return sheets;
    } catch (error) {
      Logger.error('ERROR::Something went wrong during getting connection of GoogleApi', error);
      return null;
    }
  }

  public static async getDriveConnection(): Promise<drive_v3.Drive | null> {
    try {
      const clientOptions: Auth.GoogleAuthOptions = {
        credentials: {
          type: envVars.drive.type,
          private_key: envVars.drive.privateKey,
          client_email: envVars.drive.clientEmail,
          client_id: envVars.drive.clientId,
        },
        projectId: envVars.drive.projectId,
        scopes: [
          'https://www.googleapis.com/auth/drive',
          'https://www.googleapis.com/auth/drive.file',
          'https://www.googleapis.com/auth/drive.appdata',
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/drive.metadata',
        ],
      };
      const auth = await google.auth.getClient(clientOptions);
      const drive = google.drive({ version: 'v3', auth });
      return drive;
    } catch (error) {
      Logger.error(
        'ERROR::Something went wrong during getting drive connection of GoogleApi',
        error
      );
      return null;
    }
  }
}

export default GoogleApi;
