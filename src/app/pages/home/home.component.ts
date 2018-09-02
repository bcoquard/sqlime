import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "../../models/user";
import { Connection } from "../../models/connection";
import { ConnectionsService } from "../../services/connections.service";
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
  conectionsList: Connection[] = [];

  constructor(
    private connectionsService: ConnectionsService,
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
    this.connectionsService.get().subscribe(conectionsList => {
      this.conectionsList = conectionsList;
    });
  }

  private openFormModal(connection: Connection) {
    const modalForm = this.modalService.open(HomeConnectionModalComponent);
    modalForm.componentInstance.inputConnection = connection;

    return modalForm.result;
  }

  createConnection() {
    this.openFormModal(new Connection()).then(
      connection => {
        this.upsertConnection(connection);
      },
      function() {}
    );
  }

  connect(connection: Connection) {
    this.connectionsService.connect(connection).subscribe(_ => {
      this.router.navigate(["../database"], { relativeTo: this.route });
    });
  }

  editConnection(connection: Connection) {
    this.openFormModal(connection).then(
      connection => {
        this.upsertConnection(connection);
      },
      function() {}
    );
  }

  upsertConnection(connection: Connection) {
    this.connectionsService.upsert(connection).subscribe(_ => {
      this.loadAllDatabasesConnection();
    });
  }

  deleteConnection(connection: Connection) {
    this.translate.get("CONFIRM.DELETE").subscribe((res: string) => {
      if (confirm("Are you sure to delete " + name)) {
        this.connectionsService
          .delete(connection.id.toString())
          .subscribe(_ => {
            this.loadAllDatabasesConnection();
          });
      }
    });
  }
}
