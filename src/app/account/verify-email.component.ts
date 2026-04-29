import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from '@app/_services';

enum EmailStatus { Verifying, Failed }

@Component({
  selector: 'app-verify-email',
  imports: [CommonModule],
  templateUrl: 'verify-email.component.html'
})
export class VerifyEmailComponent implements OnInit {
  EmailStatus = EmailStatus;
  emailStatus = EmailStatus.Verifying;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParams['token'];
    this.accountService.verifyEmail(token)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Verification successful! You can now log in.', { keepAfterRouteChange: true });
          this.router.navigate(['/account/login']);
        },
        error: () => this.emailStatus = EmailStatus.Failed
      });
  }
}