import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";

import { ConnectionsService } from "../../services/connections.service";
import { Connection } from "../../models/connection";

@Component({
  selector: "app-database",
  templateUrl: "./database.component.html",
  styleUrls: ["./database.component.css"]
})
export class DatabaseComponent implements OnInit {
  private connection: Connection;
  private infos$ = new BehaviorSubject<object>(null);
  private infos: Object;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private connectionsService: ConnectionsService
  ) {
    this.infos$.subscribe(infos => {
      if (infos) {
        this.infos = infos;
      }
    });
  }

  ngOnInit() {
    this.connectionsService.connection.subscribe(connection => {
      if (connection == null) {
        this.router.navigate(["../home"], { relativeTo: this.route });
      } else {
        this.connection = connection;
        this.connectionsService
          .infos(connection)
          .subscribe(infos => {
            return this.infos$.next(infos);
          });
      }
    });
  }
}
