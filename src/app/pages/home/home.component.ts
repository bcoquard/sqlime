import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "../../models/user";
import { Database } from "../../models/database";
import { DatabasesService } from "../../services/databases.service";
import { DatabaseConnectionService } from "../../services/database-connection.service";
import { TranslateService } from "@ngx-translate/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HomeConnectionModalComponent } from "./home-connection.modal.component";

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
    private router: Router,
    private translate: TranslateService,
    private modalService: NgbModal
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

  private openFormModal(database: Database) {
    const modalForm = this.modalService.open(HomeConnectionModalComponent);
    modalForm.componentInstance.connection = database;

    return modalForm.result;
  }

  createDatabase() {
    this.openFormModal(new Database()).then(database => {
      this.upsertDatabase(database);
    });
  }

  connectDatabase(database: Database) {
    this.databaseConnectionService.connect(database).subscribe(_ => {
      this.router.navigate(["../database"], { relativeTo: this.route });
    });
  }

  editDatabase(database: Database) {
    this.openFormModal(database).then(database => {
      this.upsertDatabase(database);
    });
  }

  upsertDatabase(database: Database) {
    this.databasesService.upsertDatabase(database).subscribe(_ => {
      this.loadAllDatabasesConnection();
    });
  }

  deleteDatabase(database: Database) {
    this.translate.get("CONFIRM.DELETE").subscribe((res: string) => {
      if (confirm("Are you sure to delete " + name)) {
        this.databasesService
          .deleteDatabase(database.id.toString())
          .subscribe(_ => {
            this.loadAllDatabasesConnection();
          });
      }
    });
  }
}
