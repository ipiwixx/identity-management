import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() type: string;
  cssClass: string[] = ['alert', 'alert-dismissible', 'fade'];

  constructor() {
    this.type = 'info';
  }

  ngOnInit() {
    let alerte = 'alert-info';
    switch (this.type) {
      case 'succes': alert = 'alert-success'; break;
      case 'danger': alert = 'alert-danger'; break;
      case 'warning': alert = 'alert-warning'; break;
    }
  }

  removeAlert() {
    this.cssClass = ['alert-hide'];
  }
}
