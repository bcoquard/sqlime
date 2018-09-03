import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";

import { ConnectionsService } from "../../services/connections.service";
import { Connection } from "../../models/connection";

@Component({
  selector: "app-database-browser",
  templateUrl: "./database-browser.component.html",
  styleUrls: ["./database-browser.component.css"]
})
export class DatabaseBrowserComponent implements OnInit {
  private connection: Connection;
  private treeview$ = new BehaviorSubject<Object>(null);

  treeviewTables: Object = {};
  listSchemas: Object = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private connectionsService: ConnectionsService
  ) {
    this.treeview$.subscribe(treeview => {
      if (treeview) {
        this.listSchemas = treeview["SCHEMAS"];
        this.treeviewTables = treeview["TABLES"];
        console.log(this.listSchemas);
        console.log(this.treeviewTables);
      }
    });
  }

  ngOnInit() {
    this.connectionsService.connection.subscribe(connection => {
      if (connection == null) {
        this.router.navigate(["../home"], { relativeTo: this.route });
      } else {
        this.connection = connection;
        this.connectionsService.treeview(connection).subscribe(treeview => {
          return this.treeview$.next(treeview);
        });
      }
    });
  }
}
