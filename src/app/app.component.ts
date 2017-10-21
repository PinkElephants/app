import { Component, ViewEncapsulation } from '@angular/core';
import {WindowRefService} from './services/window.service';
import { UtilsService} from './services/utils.service';
import {userAuthKeyUrl, userKeyUrl} from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public userID: number;
  public authKey: string;
  constructor(windowRef: WindowRefService, utils: UtilsService) {
    const q2ajx = utils.q2ajx(<any>windowRef.nativeWindow.location.search.replace(/^\?/, ''));
    this.userID = q2ajx[userKeyUrl];
    this.authKey = q2ajx[userAuthKeyUrl];
  }
}
