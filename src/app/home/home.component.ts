import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="text-center py-5">
      <h1>Welcome to Angular Auth Boilerplate</h1>
      <p class="lead">Use the navigation links to log in, register, or manage your profile.</p>
      <div class="mt-4">
        <a routerLink="/account/login" class="btn btn-primary me-2">Login</a>
        <a routerLink="/account/register" class="btn btn-outline-primary">Register</a>
      </div>
    </div>
  `
})
export class HomeComponent {}