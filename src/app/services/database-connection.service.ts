import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of, BehaviorSubject } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Database } from "../models/database";
import { AlertService } from "./alert.service";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class DatabaseConnectionService {
  private url = "/api";
  private connectedDatabase = new BehaviorSubject<Database>(null); // {1}
  private connected = new BehaviorSubject<boolean>(null); // {1}

  constructor(private http: HttpClient, private alertService: AlertService) { }

  get isConnected() {
    return this.connected.asObservable();
  }

  get database() {
    return this.connectedDatabase.asObservable();
  }

  connect(database: Database) {
    return this.http.post("/api/connect", database).pipe(
      tap(_ => this.alertService.success("Connection to database: " + database)),
      tap(_ => this.connected.next(true)),
      tap(_ => this.connectedDatabase.next(database)),
      catchError(this.handleError("connectDatabase"))
    );
  }

  infos() {
    return this.http.get("/api/infos");
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.error("${operation} failed: ${error.message}"); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
