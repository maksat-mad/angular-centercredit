import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { FaceRecogComponent } from './components/face-recog/face-recog.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'qr',
    component: QrCodeComponent,
  },
  {
    path: 'face',
    component: FaceRecogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
