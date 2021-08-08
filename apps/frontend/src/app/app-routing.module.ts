import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './common/authorization/authorization.component';
import { RegistrationComponent } from './common/registration/registration.component';
import { GuestGuard } from './guards/guest.guard';
import { ListOfHotelsComponent } from './common/admin-tool/list-of-hotels/list-of-hotels.component';
import { MainComponent } from './common/main/main.component';
import { HotelPageComponent } from './common/admin-tool/hotel-page/hotel-page.component';
import { MainInfoComponent } from './common/admin-tool/main-info/main-info/main-info.component';
import { FormSavingPhotosComponent } from './common/form-saving-photos/form-saving-photos.component';
import { ListOfUsersComponent } from './common/admin-tool/user-listing-page/user-listing-page.component';

const routes: Routes = [
  {
    path: 'admin-tool/hotels',
    component: ListOfHotelsComponent
  },
  {
    path: 'admin-tool/users',
    component: ListOfUsersComponent
  },
  {
    path: 'admin-tool/hotel/:id',
    component: HotelPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'main-info',
        pathMatch: 'full'
      },
      {
        path: 'main-info',
        component: MainInfoComponent
      },
      {
        path: 'photos',
        component: FormSavingPhotosComponent
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
  { path: '', component: MainComponent, pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
