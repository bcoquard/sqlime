import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { UsersInMemoryDataService } from "./helpers/users-in-memory-data.service";
import { DatabasesInMemoryDataService } from "./helpers/databases-in-memory-data.service";

import { AppRoutingModule } from "./routing/app-routing.module";

import { AppComponent } from "./app.component";
import { AlertComponent } from "./alert/alert.component";
import { fakeBackendProvider } from "./helpers/fake-backend.interceptor";
import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { LoginGuard } from "./login.guard";
import { AlertService } from "./services/alert.service";
import { AuthenticationService } from "./services/authentication.service";
import { UserService } from "./services/user.service";
import { DatabaseRegisterComponent } from "./database-register/database-register.component";
import { HeaderComponent } from "./header/header.component";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { DatabaseComponent } from "./database/database.component";
import { AppTemplateComponent } from "./app-template/app-template.component";
import { SqlEditorComponent } from "./sql-editor/sql-editor.component";
import { DatabaseBrowserComponent } from "./database-browser/database-browser.component";
import { DatabaseMonitoringComponent } from "./database-monitoring/database-monitoring.component";
import { DatabaseCompareComponent } from "./database-compare/database-compare.component";
import { DatabaseVisualisationComponent } from "./database-visualisation/database-visualisation.component";

import { CodemirrorModule } from "@ctrl/ngx-codemirror";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CodemirrorModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(UsersInMemoryDataService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true
    }),
    HttpClientInMemoryWebApiModule.forRoot(DatabasesInMemoryDataService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true
    })
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DatabaseRegisterComponent,
    HeaderComponent,
    SideNavComponent,
    DatabaseComponent,
    AppTemplateComponent,
    SqlEditorComponent,
    DatabaseBrowserComponent,
    DatabaseMonitoringComponent,
    DatabaseCompareComponent,
    DatabaseVisualisationComponent
  ],
  providers: [
    LoginGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
