import { Component, ViewEncapsulation } from '@angular/core';
import {WindowRefService} from './services/window.service';
import { UtilsService} from './services/utils.service';
import {userAuthKeyUrl, userKeyUrl} from './app.constants';
import {AuthService} from "./services/auth.service";
import {HackinderService} from "./services/hackinder.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'style': 'height: 100%; display: block',
  }
})
export class AppComponent {
  public userID: string;
  public authKey: string;
  constructor(windowRef: WindowRefService, utils: UtilsService, auth: AuthService, hack: HackinderService) {
    const q2ajx = utils.q2ajx(<any>windowRef.nativeWindow.location.search.replace(/^\?/, ''));
    this.userID = q2ajx[userKeyUrl];
    this.authKey = q2ajx[userAuthKeyUrl];
    this.authKey = '3698302d5f1b2b85ad948ecbbdf18db0';
    this.userID = '17864153';
    auth.storeCredentials(this.authKey, this.userID);

  }
}
