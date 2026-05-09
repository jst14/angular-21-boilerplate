import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { Role } from './_models';

// lazy-loaded feature modules
const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);

const routes: Routes = [
  // home — protected by auth guard
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // account section — lazy loaded (login, register, verify, forgot password, reset password)
  { path: 'account', loadChildren: accountModule },
  // profile section — lazy loaded and protected
  { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
  // admin section — lazy loaded, protected and restricted to Admin role
  { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  // catch-all redirect
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }