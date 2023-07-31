import cloudinary from 'cloudinary';
import { envVars } from '../config';
import { Logger } from '../utils';

class CloudinaryApi {
  private static clientOptions = {
    cloud_name: envVars.cloudinary.cloudName,
    api_key: envVars.cloudinary.apiKey,
    api_secret: envVars.cloudinary.apiSecret,
  };

  public static getConnection() {
    try {
      cloudinary.v2.config(CloudinaryApi.clientOptions);
      return cloudinary.v2;
    } catch (error) {
      Logger.error('ERROR::Something went wrong during getting connection of CloudinaryApi', error);
      return null;
    }
  }
}

export default CloudinaryApi;
