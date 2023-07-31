import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
  ServiceAccountCredentials,
} from 'google-spreadsheet';
import { envVars } from '../config';
import { Logger } from '../utils';

class GoogleSpreadsheets {
  private static clientOptions: ServiceAccountCredentials = {
    client_email: envVars.excel.clientEmail,
    private_key: envVars.excel.privateKey,
  };

  public static async getConnection(): Promise<GoogleSpreadsheetWorksheet | null> {
    try {
      // Initialize the sheet - doc ID is the long id in the sheets URL
      const doc = new GoogleSpreadsheet(envVars.excel.sheetId);
      // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
      await doc.useServiceAccountAuth(GoogleSpreadsheets.clientOptions);
      await doc.loadInfo(); // loads document properties and worksheets
      const sheet = doc.sheetsByTitle[envVars.excel.sheetName]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
      return sheet;
    } catch (error) {
      Logger.error(
        'ERROR::Something went wrong during getting connection of GoogleSpreadsheet',
        error
      );
      return null;
    }
  }
}

export default GoogleSpreadsheets;
