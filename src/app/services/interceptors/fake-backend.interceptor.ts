import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // array in local storage for registered users

    // wrap in delayed observable to simulate server api call
    return (
      of(null)
        .pipe(
          mergeMap(() => {
            console.log(request.url);

            // authenticate
            if (request.url.endsWith("/api/authenticate")) {
              return this.handleAuthentication(request);
            }

            if (request.url.endsWith("/api/connect")) {
              return this.handleConnect(request);
            }

            if (request.url.endsWith("/api/infos")) {
              return this.handleDatabaseInfos(request);
            }

            // pass through any requests not handled above
            return next.handle(request);
          })
        )

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize())
    );
  }

  handleAuthentication(request: HttpRequest<any>) {
    if (
      request.url.endsWith("/api/authenticate") &&
      request.method === "POST"
    ) {
      if (request.body.email == "test" && request.body.password == "test") {
        let body = {
          id: 1,
          email: request.body.email,
          token: "fake-jwt-token"
        };

        return of(new HttpResponse({ status: 200, body: body }));
      } else {
        // else return 400 bad request
        return throwError("email or password is incorrect");
      }
    }
  }

  handleConnect(request: HttpRequest<any>) {
    if (request.method === "POST") {
      return of(new HttpResponse({ status: 200, body: {} }));
    } else {
      // else return 400 bad request
      return throwError("email or password is incorrect");
    }
  }

  handleDatabaseInfos(request: HttpRequest<any>) {
    if (request.method === "GET") {
      let response = {
        currentConnection: Math.floor(Math.random() * 100) + 1,
        ramUsage: Math.floor(Math.random() * 100) + 1 + "%",
        cpuUsage: Math.floor(Math.random() * 100) + 1 + "%",
        diskUsage: Math.floor(Math.random() * 100) + 1 + "%",
        tables: Math.floor(Math.random() * 100) + 1
      };
      return of(new HttpResponse({ status: 200, body: response }));
    } else {
      // else return 400 bad request
      return throwError("email or password is incorrect");
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
