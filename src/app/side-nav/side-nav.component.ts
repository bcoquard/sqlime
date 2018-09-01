import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { DatabaseConnectionService } from "../services/database-connection.service";
import { Database } from "../models/database";

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.css"]
})
export class SideNavComponent implements OnInit {
  private isConnected$: Observable<boolean>;
  private database: Database;

  constructor(private databaseConnectionService: DatabaseConnectionService) {}

  ngOnInit() {
    this.isConnected$ = this.databaseConnectionService.isConnected;
    this.databaseConnectionService.database.subscribe(database => {
      this.database = database;
    });
  }
}
