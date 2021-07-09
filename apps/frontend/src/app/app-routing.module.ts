import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './common/page/page.component';
import { DistanceFormComponent } from './common/distance-form/distance-form.component';
import { MainInfoFormComponent } from './common/main-info-form/main-info-form.component';
import { AuthorizationComponent } from './common/authorization/authorization.component';
import { RegistrationComponent } from './common/registration/registration.component';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  { path: 'page', component: PageComponent },
  { path: 'main-info-form', component: MainInfoFormComponent },
  { path: 'distance-form', component: DistanceFormComponent },
  { path: '', redirectTo: 'page', pathMatch: 'full' },
  {
    path: 'authorization',
    component: AuthorizationComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [GuestGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
