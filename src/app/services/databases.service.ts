import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Database } from "../models/database";
import { AlertService } from "./alert.service";
import { Data } from "@angular/router";

import { v4 } from "uuid";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: "root" })
export class DatabasesService {
  private url = "http://localhost:8080/api/databases";

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getDatabases(): Observable<Database[]> {
    return this.http.get<Database[]>(this.url).pipe(
      tap(databases => this.alertService.success("Retrieved databases")),
      catchError(this.handleError("getDatabases", []))
    );
  }

  upsertDatabase(database: Database) {
    if (!database.id) {
      return this.createDatabase(database);
    } else {
      return this.updateDatabase(database);
    }
  }

  createDatabase(database: Database) {
    return this.http.post(this.url, database).pipe(
      tap(_ => this.alertService.success("Added new database connection")),
      catchError(this.handleError("connectDatabase"))
    );
  }

  updateDatabase(database: Database) {
    return this.http.put(this.url + "/" + database.id, database).pipe(
      tap(_ => this.alertService.success("Udpate database connection")),
      catchError(this.handleError("updateDatabase"))
    );
  }

  deleteDatabase(id: string) {
    return this.http.delete(this.url + "/" + id).pipe(
      tap(_ => this.alertService.success("Deleted database connection")),
      catchError(this.handleError("deleteDatabase"))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.error("${operation} failed: ${error.message}"); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
