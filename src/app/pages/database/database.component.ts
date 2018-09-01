import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";

import { DatabaseConnectionService } from "../../services/database-connection.service";
import { Database } from "../../models/database";

@Component({
  selector: "app-database",
  templateUrl: "./database.component.html",
  styleUrls: ["./database.component.css"]
})
export class DatabaseComponent implements OnInit {
  private database: Database;
  private infos$ = new BehaviorSubject<object>(null);
  private infos: Object;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private databaseConnectionService: DatabaseConnectionService
  ) {
    this.infos$.subscribe(infos => {
      if (infos) {
        this.infos = infos;
      }
    });
  }

  ngOnInit() {
    this.databaseConnectionService.database.subscribe(database => {
      if (database == null) {
        this.router.navigate(["../home"], { relativeTo: this.route });
      } else {
        this.database = database;
        this.databaseConnectionService
          .infos()
          .subscribe(infos => this.infos$.next(infos));
      }
    });
  }
}
