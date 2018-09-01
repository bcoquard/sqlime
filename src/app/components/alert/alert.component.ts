import { Component, OnInit } from "@angular/core";
import { Observable, Observer } from "rxjs";

import { Subscription } from "rxjs";

import { AlertService } from "../../services/alert.service";
import { IAlert } from "../../models";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"]
})
export class AlertComponent implements OnInit {
  alerts: IAlert[];

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alerts = this.alertService.getAlerts();
  }

  closeAlert(alert: IAlert) {
    this.alertService.removeAlert(alert);
  }

  closeAllAlerts() {
    this.alertService.removeAll();
  }
}
