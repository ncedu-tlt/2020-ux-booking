import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './common/page/page.component';
import { DistanceFormComponent } from './common/distance-form/distance-form.component';
import { MainInfoFormComponent } from './common/main-info-form/main-info-form.component';

const routes: Routes = [
  { path: 'page', component: PageComponent },
  { path: 'main-info-form', component: MainInfoFormComponent },
  { path: 'distance-form', component: DistanceFormComponent },
  { path: '', redirectTo: 'page', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
