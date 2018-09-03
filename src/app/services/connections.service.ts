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
export class ConnectionsService {
  private url = "http://localhost:8080/api/connections";
  private inUseConnection = new BehaviorSubject<Connection>(null); // {1}
  private connected = new BehaviorSubject<boolean>(null); // {1}

  constructor(private http: HttpClient, private alertService: AlertService) {}

  get isConnected() {
    return this.connected.asObservable();
  }

  get connection() {
    return this.inUseConnection.asObservable();
  }

  get(): Observable<Connection[]> {
    return this.http.get<Connection[]>(this.url).pipe(
      tap(connections => this.alertService.success("Retrieved connections")),
      catchError(this.handleError("get", []))
    );
  }

  upsert(connection: Connection) {
    if (!connection.id) {
      return this.create(connection);
    } else {
      return this.update(connection);
    }
  }

  create(connection: Connection) {
    return this.http.post(this.url, connection).pipe(
      tap(_ => this.alertService.success("Added new connection")),
      catchError(this.handleError("create"))
    );
  }

  update(connection: Connection) {
    return this.http.put(this.url + "/" + connection.id, connection).pipe(
      tap(_ => this.alertService.success("Udpate connection")),
      catchError(this.handleError("update"))
    );
  }

  delete(id: string) {
    return this.http.delete(this.url + "/" + id).pipe(
      tap(_ => this.alertService.success("Deleted connection")),
      catchError(this.handleError("delete"))
    );
  }

  connect(connection: Connection) {
    return this.http.post(this.url + "/connect/" + connection.id, null).pipe(
      tap(_ => this.alertService.success("Connected to : " + connection)),
      tap(_ => this.connected.next(true)),
      tap(_ => this.inUseConnection.next(connection)),
      catchError(this.handleError("connect"))
    );
  }

  infos(connection: Connection) {
    return this.http.get(this.url + "/infos/" + connection.id);
  }

  treeview(connection: Connection) {
    return this.http.get(this.url + "/treeview/" + connection.id);
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.error("${operation} failed: ${error.message}"); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
