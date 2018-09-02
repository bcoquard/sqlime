import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { ConnectionsService } from "../../services/connections.service";
import { Connection } from "../../models/connection";

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.css"]
})
export class SideNavComponent implements OnInit {
  isConnected$: Observable<boolean>;
  connection: Connection;

  constructor(private connectionsService: ConnectionsService) {}

  ngOnInit() {
    this.isConnected$ = this.connectionsService.isConnected;
    this.connectionsService.connection.subscribe(connection => {
      this.connection = connection;
    });
  }
}
