import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export class Alert {
  id: string = 'default';
  type!: AlertType;
  message!: string;
  autoClose!: boolean;
  keepAfterRouteChange!: boolean;
  fade!: boolean;
}

export enum AlertType { Success, Error, Info, Warning }

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<Alert | null>();

  onAlert(id = 'default'): Observable<Alert | null> {
    return this.subject.asObservable().pipe(filter(x => x?.id === id));
  }
  success(message: string, options?: any) { this.alert({ ...options, type: AlertType.Success, message }); }
  error(message: string, options?: any) { this.alert({ ...options, type: AlertType.Error, message }); }
  info(message: string, options?: any) { this.alert({ ...options, type: AlertType.Info, message }); }
  warn(message: string, options?: any) { this.alert({ ...options, type: AlertType.Warning, message }); }
  clear(id = 'default') { this.subject.next(null); }
  private alert(alert: Partial<Alert>) {
    this.subject.next({
      id: 'default', autoClose: true, keepAfterRouteChange: false, fade: false,
      ...alert
    } as Alert);
  }
}