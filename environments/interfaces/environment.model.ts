export interface IEnvironments {
  platform: 'LOCAL' | 'QA' | 'STAGE' | 'PRODUCTION';
  API_URL: string;
  AUTH_URL: string;
  ENCRYPTION_TOKEN: string;
}
