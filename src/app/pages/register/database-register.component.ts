import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Database } from "../../models/database";

@Component({
  selector: "app-database-register",
  templateUrl: "./database-register.component.html",
  styleUrls: ["./database-register.component.css"]
})
export class DatabaseRegisterComponent implements OnInit {
  databaseConnectionForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.databaseConnectionForm = this.formBuilder.group({
      connectionName: ["", Validators.required],
      jdbcConnectionUrl: ["", Validators.required],
      jdbcConnectionPort: ["", Validators.required],
      databaseName: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get f() {
    return this.databaseConnectionForm.controls;
  }

  onSubmit() {
    console.log("created new db");
  }
}
