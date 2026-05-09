import { Component } from '@angular/core';

import { AccountService } from './_services';
import { Account, Role } from './_models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html', standalone: false })
export class AppComponent {
  // expose Role enum to template for role comparisons
  Role = Role;
  account?: Account | null;

  constructor(private accountService: AccountService) {
    // subscribe to account changes to reactively show/hide the nav bar
    this.accountService.account.subscribe(x => this.account = x);
  }

  logout() {
    this.accountService.logout();
  }
}