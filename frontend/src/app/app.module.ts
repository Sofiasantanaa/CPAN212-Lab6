import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { ClientsPageComponent } from './pages/clients-page/clients-page.component';
import { ClientDetailsPageComponent } from './pages/client-details-page/client-details-page.component';
import { ClientFormPageComponent } from './pages/client-form-page/client-form-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomePageComponent,
    ClientsPageComponent,
    ClientDetailsPageComponent,
    ClientFormPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
