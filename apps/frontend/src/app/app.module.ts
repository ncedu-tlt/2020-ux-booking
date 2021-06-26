import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from './common/common.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { I18NextModule } from 'angular-i18next';
import { I18N_PROVIDERS } from './i18n/i18next';
import { LangModule } from './lang/lang.module';
import { HotelDataService } from './services/hotel-data.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    I18NextModule.forRoot(),
    LangModule,
    AppRoutingModule
  ],
  providers: [I18N_PROVIDERS, HotelDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
