// Alert class — represents a single alert notification displayed in the UI
export class Alert {
  id?: string;
  type?: AlertType;
  message?: string;
  autoClose?: boolean;
  keepAfterRouteChange?: boolean;
  fade?: boolean;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}

// AlertType enum — maps to Bootstrap alert CSS classes
export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}

// AlertOptions — optional config when sending alerts via the alert service
export class AlertOptions {
  id?: string;
  autoClose?: boolean;
  keepAfterRouteChange?: boolean;
}
