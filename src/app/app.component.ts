import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { AuthenticationService } from "./services/authentication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}
  ngOnInit() {}
}
