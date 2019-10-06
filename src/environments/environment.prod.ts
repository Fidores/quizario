import { GlobalConfig } from 'ngx-toastr';

const notificationsConfig: Partial<GlobalConfig> = {
  positionClass: 'toast-bottom-right',
  progressBar: true
}

export const environment = {
  production: true,
  backend: 'http://192.168.1.11:3000',
  api: 'http://192.168.1.11:3000/api',
  notificationsConfig
};
