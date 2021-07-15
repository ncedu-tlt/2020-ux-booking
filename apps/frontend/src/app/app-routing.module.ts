import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './common/authorization/authorization.component';
import { RegistrationComponent } from './common/registration/registration.component';
import { GuestGuard } from './guards/guest.guard';
import { HotelPageComponent } from './common/admin-tool/hotel-page/hotel-page.component';
import { MainInfoComponent } from './common/admin-tool/main-info/main-info/main-info.component';

const routes: Routes = [
  {
    path: 'admin-tool/hotel/:id',
    component: HotelPageComponent,
    children: [
      {
        path: 'main-info',
        component: MainInfoComponent
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
  { path: '', component: MainInfoComponent, pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
