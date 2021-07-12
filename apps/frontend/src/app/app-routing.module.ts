import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthorizationComponent } from './common/authorization/authorization.component';
import { RegistrationComponent } from './common/registration/registration.component';
import { AddRoomFormComponent } from './common/add-room-form/add-room-form.component';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
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
  {
    path: 'add-room',
    component: AddRoomFormComponent
    // canActivate: [GuestGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
