import { NgModule } from "@angular/core";
import { RouterModule, Routes, OutletContext } from "@angular/router";

import { LoginComponent } from "../pages/login/login.component";
import { AppTemplateComponent } from "../pages/template/app-template.component";
import { HomeComponent } from "../pages/home/home.component";
import { DatabaseComponent } from "../pages/database/database.component";
import { SqlEditorComponent } from "../pages/query/sql-editor.component";
import { DatabaseBrowserComponent } from "../pages/browser/database-browser.component";
import { DatabaseMonitoringComponent } from "../pages/monitoring/database-monitoring.component";
import { DatabaseCompareComponent } from "../pages/compare/database-compare.component";
import { DatabaseVisualisationComponent } from "../pages/visualisation/database-visualisation.component";

import { LoginGuard } from "../guards/login.guard";
import { DatabaseConnectionGuard } from "../guards/database-connection.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent },
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
