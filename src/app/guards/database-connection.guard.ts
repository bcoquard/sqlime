import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { DatabaseConnectionService } from "../services/database-connection.service";

@Injectable({
  providedIn: "root"
})
export class DatabaseConnectionGuard implements CanActivate {
  constructor(
    private router: Router,
    private databaseConnectionService: DatabaseConnectionService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Observable<boolean> | Promise<boolean> | boolean{
    return this.databaseConnectionService.isConnected.pipe(
      take(1),
      map((isConnected: boolean) => {
        if (!isConnected) {
          this.router.navigate(["app/home"]);
          return false;
        }
        return true;
      })
    );
  }
}
