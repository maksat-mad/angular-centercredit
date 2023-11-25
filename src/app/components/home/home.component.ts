import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  show = false;

  handleFaceClick() {
    this.show = !this.show;
  }

  handleBack() {
    this.show = !this.show;
  }
}
