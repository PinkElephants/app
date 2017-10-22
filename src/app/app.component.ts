import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {WindowRefService} from './services/window.service';
import { UtilsService} from './services/utils.service';
import {userAuthKeyUrl, userKeyUrl} from './app.constants';
import {AuthService} from "./services/auth.service";
import {HackinderService} from "./services/hackinder.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'style': 'height: 100%; display: block',
  }
})
export class AppComponent implements OnInit {
  public userID: string;
  public authKey: string;
  constructor(private windowRef: WindowRefService, private router: Router, utils: UtilsService, auth: AuthService, hack: HackinderService) {
    const q2ajx = utils.q2ajx(<any>windowRef.nativeWindow.location.search.replace(/^\?/, ''));
    this.userID = q2ajx[userKeyUrl];
    this.authKey = q2ajx[userAuthKeyUrl];
    this.authKey = '3698302d5f1b2b85ad948ecbbdf18db0';
    this.userID = '667976';
    auth.storeCredentials(this.authKey, this.userID);
  }
    ngOnInit(){
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        this.windowRef.nativeWindow.scrollTo(0, 0);
      });
    }
}
