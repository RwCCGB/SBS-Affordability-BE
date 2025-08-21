import Status from './status';

export interface PingResponse {
  status: Status;
  timestamp: Date;
  backendIsOnline: boolean;
  databaseIsonline: boolean;
}
