import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from './common/common.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { I18NextModule } from 'angular-i18next';
import { I18N_PROVIDERS } from './i18n/i18next';
import { LangModule } from './lang/lang.module';
import { HotelDataService } from './services/hotel-data.service';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { RouterModule } from '@angular/router';
import { AuthHttpInterceptor } from './interceptors/auth-http.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { I18NextPipe } from './stories.helpers';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, UserProfileComponent, UserInfoComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    I18NextModule.forRoot(),
    LangModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    I18N_PROVIDERS,
    HotelDataService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
