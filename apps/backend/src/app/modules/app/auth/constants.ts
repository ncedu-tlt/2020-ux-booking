import { appConfig } from '../../../config/app.config';

export const jwtConstants = {
  secret: appConfig().jwtSecret
};
