import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { CodemirrorModule } from "@ctrl/ngx-codemirror";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// Components
import { HeaderComponent } from "../components/header/header.component";
import { SideNavComponent } from "../components/side-nav/side-nav.component";
import { AppComponent } from "./app.component";
import { AlertComponent } from "../components/alert/alert.component";

// Services
import { fakeBackendProvider } from "../services/interceptors/fake-backend.interceptor";
import { JwtInterceptor } from "../services/interceptors/jwt.interceptor";
import { AlertService } from "../services/alert.service";
import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";

// Guards
import { LoginGuard } from "../guards/login.guard";

// Pages
import { AppRoutingModule } from "../main/app-routing.module";
import { HomeComponent } from "../pages/home/home.component";
import { HomeConnectionModalComponent } from "../pages/home/home-connection.modal.component";

import { LoginComponent } from "../pages/login/login.component";
import { DatabaseRegisterComponent } from "../pages/register/database-register.component";
import { DatabaseComponent } from "../pages/database/database.component";
import { AppTemplateComponent } from "../pages/template/app-template.component";
import { SqlEditorComponent } from "../pages/query/sql-editor.component";
import { DatabaseBrowserComponent } from "../pages/browser/database-browser.component";
import { DatabaseMonitoringComponent } from "../pages/monitoring/database-monitoring.component";
import { DatabaseCompareComponent } from "../pages/compare/database-compare.component";
import { DatabaseVisualisationComponent } from "../pages/visualisation/database-visualisation.component";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgbModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CodemirrorModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    DatabaseRegisterComponent,
    HeaderComponent,
    SideNavComponent,
    DatabaseComponent,
    AppTemplateComponent,
    SqlEditorComponent,
    DatabaseBrowserComponent,
    DatabaseMonitoringComponent,
    DatabaseCompareComponent,
    DatabaseVisualisationComponent,
    HomeConnectionModalComponent
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
  bootstrap: [AppComponent],
  entryComponents: [HomeConnectionModalComponent]
})
export class AppModule {}
