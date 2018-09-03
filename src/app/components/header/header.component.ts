import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { AuthenticationService } from "../../services/authentication.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  currentLang: string;
  language: string;

  constructor(
    private authService: AuthenticationService,
    private translate: TranslateService
  ) {
    this.whenSelectLang(translate.currentLang);
  }

  isLoggedIn$: Observable<boolean>;

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout();
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    this.whenSelectLang(lang);
  }

  private whenSelectLang(lang: string) {
    this.currentLang = lang.toUpperCase();
    this.translate
      .get("LABEL." + this.currentLang.toUpperCase())
      .subscribe((res: string) => {
        this.language = res;
      });
  }
}
