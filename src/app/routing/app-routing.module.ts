import { NgModule } from "@angular/core";
import { RouterModule, Routes, OutletContext } from "@angular/router";

import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { AppTemplateComponent } from "../app-template/app-template.component";
import { HomeComponent } from "../home/home.component";
import { DatabaseComponent } from "../database/database.component";
import { SqlEditorComponent } from "../sql-editor/sql-editor.component";
import { DatabaseBrowserComponent } from "../database-browser/database-browser.component";
import { DatabaseMonitoringComponent } from "../database-monitoring/database-monitoring.component";
import { DatabaseCompareComponent } from "../database-compare/database-compare.component";
import { DatabaseVisualisationComponent } from "../database-visualisation/database-visualisation.component";

import { LoginGuard } from "../login.guard";
import { DatabaseConnectionGuard } from "../database-connection.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "app",
    component: AppTemplateComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "database",
        component: DatabaseComponent,
        canActivate: [DatabaseConnectionGuard]
      },
      {
        path: "editor",
        component: SqlEditorComponent,
        canActivate: [DatabaseConnectionGuard]
      },
      {
        path: "browse",
        component: DatabaseBrowserComponent,
        canActivate: [DatabaseConnectionGuard]
      },
      {
        path: "monitoring",
        component: DatabaseMonitoringComponent,
        canActivate: [DatabaseConnectionGuard]
      },
      {
        path: "compare",
        component: DatabaseCompareComponent,
        canActivate: [DatabaseConnectionGuard]
      },
      {
        path: "visualisation",
        component: DatabaseVisualisationComponent,
        canActivate: [DatabaseConnectionGuard]
      },
      { path: "**", redirectTo: "home" }
    ]
  },

  { path: "**", redirectTo: "login" }
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
