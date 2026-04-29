import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountService {

  private accountSubject = new BehaviorSubject<any>(null);
  public account: Observable<any>;

  constructor() {
    this.account = this.accountSubject.asObservable();
  }

  public get accountValue() {
    return this.accountSubject.value;
  }

  login(email: string, password: string) {
    // Fake login
    if (email === 'admin@test.com' && password === '123456') {
      const account = { email, role: 'Admin' };
      this.accountSubject.next(account);
      return of(account);
    } else {
      throw new Error('Invalid credentials');
    }
  }

  register(data: any) {
    console.log('Registered:', data);
    return of(true);
  }

  logout() {
    this.accountSubject.next(null);
  }
}