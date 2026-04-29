import { Routes } from '@angular/router';

export const accountRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./account.component').then(m => m.AccountComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'verify-email',
    loadComponent: () => import('./verify-email.component').then(m => m.VerifyEmailComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password.component').then(m => m.ResetPasswordComponent)
  }
];