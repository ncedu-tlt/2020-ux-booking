import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './common/page/page.component';
import { DistanceFormComponent } from './common/distance-form/distance-form.component';
import { MainInfoFormComponent } from './common/main-info-form/main-info-form.component';
import { AuthorizationComponent } from './common/authorization/authorization.component';
import { RegistrationComponent } from './common/registration/registration.component';
import { GuestGuard } from './guards/guest.guard';
import { BannerComponent } from './common/banner/banner.component';
import { TestComponent } from './common/test/test.component';

const routes: Routes = [
  {
    path: 'admin-tool/hotel/:id',
    component: PageComponent,
    children: [
      {
        path: 'main-info',
        component: MainInfoFormComponent
      },
      {
        path: 'distance',
        component: DistanceFormComponent
      }
    ]
  },
  {
    path: 'authorization',
    component: AuthorizationComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [GuestGuard]
  },
  { path: '', component: TestComponent, pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
