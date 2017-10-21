import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {userAuthKeyUrl, userKeyUrl} from "../app.constants";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authKey: string;
  private viewerId: string;
  constructor(private auth: AuthService){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authKey =  this.auth.getCredentials()[userAuthKeyUrl];
    this.viewerId =  this.auth.getCredentials()[userKeyUrl];
      const changedReq = req.clone(
        {
          headers: req.headers
            .set('auth_key', this.authKey)
            .set('viewer_id', this.viewerId)
        });
      return next.handle(changedReq);
  }
}
