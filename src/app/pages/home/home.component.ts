import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { User } from "../../models/user";
import { Database } from "../../models/database";
import { DatabasesService } from "../../services/databases.service";
import { DatabaseConnectionService } from "../../services/database-connection.service";
import { AlertService } from "../../services/alert.service";
import { Route } from "../../../../node_modules/@angular/compiler/src/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  currentUser: User;
  databases: Database[] = [];

  constructor(
    private databasesService: DatabasesService,
    private databaseConnectionService: DatabaseConnectionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.loadAllDatabasesConnection();
  }

  private loadAllDatabasesConnection() {
    this.databasesService.getDatabases().subscribe(databases => {
      this.databases = databases;
    });
  }

  deleteDatabase(id: string) {
    this.databasesService.deleteDatabase(id).subscribe(_ => {
      this.loadAllDatabasesConnection();
    });
  }

  connectDatabase(database: Database) {
    this.databaseConnectionService.connect(database).subscribe(_ => {
      this.router.navigate(["../database"], { relativeTo: this.route });
    });
  }
}
