import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";

import { ConnectionsService } from "../../services/connections.service";
import { QueryService } from "../../services/query.service";

import { Connection } from "../../models/connection";

import "codemirror/mode/sql/sql";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/sql-hint";

@Component({
  selector: "app-sql-editor",
  templateUrl: "./sql-editor.component.html",
  styleUrls: ["./sql-editor.component.css"]
})
export class SqlEditorComponent implements OnInit {
  private connection: Connection;
  content: string;
  config: Object;

  rows$ = new BehaviorSubject<object[]>(null);
  columns$ = new BehaviorSubject<object[]>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private connectionsService: ConnectionsService,
    private queryService: QueryService
  ) {
    this.content = "SHOW PROCESSLIST;";

    this.config = {
      lineNumbers: true,
      theme: "darcula",
      mode: "text/x-mysql",
      extraKeys: { "Ctrl-Space": "autocomplete" }
    };
  }

  ngOnInit() {
    this.connectionsService.connection.subscribe(connection => {
      if (connection == null) {
        this.router.navigate(["../home"], { relativeTo: this.route });
      } else {
        this.connection = connection;
      }
    });
  }

  executeAll() {
    this.queryService
      .run(this.connection.id, this.content)
      .subscribe(result => {
        if (result["columns"] && result["rows"]) {
          this.columns$.next(result["columns"]);
          this.rows$.next(result["rows"]);
        }
      });
  }
}
