import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";

import { IAlert } from "../models";
import { v4 } from "uuid";

@Injectable()
export class AlertService {
  alerts: IAlert[] = [];

  constructor() {}

  private pushAlert(message: string, type: string) {
    let alert: IAlert = {
      id: v4(),
      type: type,
      message: message
    };
    if (this.alerts.length >= 4) {
      this.alerts.pop();
    }
    this.alerts.push(alert);

    setTimeout(_ => {
      this.removeAlert(alert);
    }, 10000);
  }

  success(message: string) {
    this.pushAlert(message, "success");
  }

  error(message: string) {
    this.pushAlert(message, "error");
  }

  removeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  removeAll() {
    this.alerts.splice(0, this.alerts.length);
  }

  getAlerts(): IAlert[] {
    return this.alerts;
  }
}
