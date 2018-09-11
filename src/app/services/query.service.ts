import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Connection } from "../models/connection";
import { AlertService } from "./alert.service";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: "root" })
export class QueryService {
  private url = "http://localhost:8080/api/query";

  constructor(private http: HttpClient, private alertService: AlertService) {}

  run(connectionId: String, query: String) {
    console.log(connectionId, query);

    //return this.http.get("google.fr");

    return this.http
      .post(this.url, {
        query: query,
        connectionId: connectionId
      })
      .pipe(
        tap(_ => this.alertService.success("Success running query")),
        catchError(this.handleError("run"))
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
