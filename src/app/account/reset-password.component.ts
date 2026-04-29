import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: 'reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  token!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParams['token'];
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: MustMatch('password', 'confirmPassword') });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) return;
    this.loading = true;
    this.accountService.resetPassword(this.token, this.f['password'].value, this.f['confirmPassword'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Password reset successful! You can now log in.', { keepAfterRouteChange: true });
          this.router.navigate(['/account/login']);
        },
        error: err => { this.alertService.error(err); this.loading = false; }
      });
  }
}