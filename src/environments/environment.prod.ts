import { GlobalConfig } from 'ngx-toastr';

const notificationsConfig: Partial<GlobalConfig> = {
  positionClass: 'toast-bottom-right',
  progressBar: true
}

export const environment = {
  production: true,
  backend: 'http://localhost:3000',
  api: 'http://localhost:3000/api',
  notificationsConfig
};
