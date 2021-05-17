import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthorizationComponent } from './common/authorization/authorization.component';
import { RegistrationComponent } from './common/registration/registration.component';

const routes: Routes = [
  { path: 'authorization', component: AuthorizationComponent },
  { path: 'registration', component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
