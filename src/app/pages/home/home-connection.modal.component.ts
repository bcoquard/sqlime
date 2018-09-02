import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Connection } from "../../models";

@Component({
  selector: "app-home-connection-modal",
  templateUrl: "./home-connection.modal.component.html",
  styleUrls: ["./home-connection.modal.component.css"]
})
export class HomeConnectionModalComponent implements OnInit {
  @Input()
  inputConnection: Connection;

  connection: Connection;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.connection = { ...this.inputConnection };

  }

  close() {
    this.activeModal.dismiss();
  }

  validate() {
    this.activeModal.close(this.connection);
  }
}
