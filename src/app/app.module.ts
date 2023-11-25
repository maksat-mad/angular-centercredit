import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FaceRecogComponent } from './components/face-recog/face-recog.component';
import { HomeComponent } from './components/home/home.component';
import { PayComponent } from './components/pay/pay.component';

@NgModule({
  declarations: [
    AppComponent,
    FaceRecogComponent,
    HomeComponent,
    PayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
