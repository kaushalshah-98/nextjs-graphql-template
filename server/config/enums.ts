enum uploadType {
  SINGLE = 'single',
  ARRAY = 'array',
  FIELDS = 'fields',
  NONE = 'none',
}

enum storageType {
  DISK = 'disk',
  AWS = 'aws',
}

export enum ENV_MODE {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

export { uploadType, storageType };
