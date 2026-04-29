import { ChangeDetectorRef, Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from '@app/_models';
import { AlertService } from '@app/_services';

@Component({ selector: 'alert', templateUrl: 'alert.component.html', standalone: false })
export class AlertComponent implements OnInit, OnDestroy {
  // Schedules a change detection run outside the current cycle
  private scheduleDetectChanges() {
    setTimeout(() => this.cdr.detectChanges());
  }

  // Input: which alert component instance to listen to (supports multiple alert areas)
  @Input() id = 'default-alert';
  // Input: whether to use fade-out animation when removing alerts
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // subscribe to new alert notifications from the alert service
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        // clear alerts when an empty alert is received (no message = clear signal)
        if (!alert.message) {
          // keep alerts that have keepAfterRouteChange set — they survive one navigation
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);
          // clear the keepAfterRouteChange flag so they don't survive a second navigation
          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          this.scheduleDetectChanges();
          return;
        }

        // add new alert to the alerts array for display
        this.alerts.push(alert);
        this.scheduleDetectChanges();

        // auto-close alert after 3 seconds if autoClose is enabled
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });

    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
        this.scheduleDetectChanges();
      }
    });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks from orphaned subscriptions
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
      // start fade-out animation
      alert.fade = true;
      this.scheduleDetectChanges();

      // remove alert after fade-out animation completes (250ms)
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
        this.scheduleDetectChanges();
      }, 250);
    } else {
      // remove immediately without animation
      this.alerts = this.alerts.filter(x => x !== alert);
      this.scheduleDetectChanges();
    }
  }

  // Returns Bootstrap alert CSS classes based on alert type and fade state
  cssClasses(alert: Alert) {
    if (!alert) return;

    // base classes applied to every alert
    const classes = ['alert', 'alert-dismissible', 'mt-4', 'container'];

    // map AlertType enum to Bootstrap alert class
    const alertTypeClass = {
      [AlertType.Success]: 'alert-success',
      [AlertType.Error]: 'alert-danger',
      [AlertType.Info]: 'alert-info',
      [AlertType.Warning]: 'alert-warning'
    }

    if (alert.type !== undefined) {
      classes.push(alertTypeClass[alert.type]);
    }

    // add fade class for animation support
    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }
}