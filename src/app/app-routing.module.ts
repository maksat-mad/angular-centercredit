import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaceRecogComponent } from './components/face-recog/face-recog.component';
import { HomeComponent } from './components/home/home.component';
import { PayComponent } from './components/pay/pay.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'pay',
    component: PayComponent,
  },
  {
    path: 'pay/face',
    component: FaceRecogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
