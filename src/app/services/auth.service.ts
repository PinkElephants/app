
import {Injectable} from "@angular/core";
import {userAuthKeyUrl, userKeyUrl} from "../app.constants";

@Injectable()
export class AuthService {

  private _authKey: string;
  private _viewerId: string;

  public storeCredentials(auth, viewerId){
    this._authKey = auth;
    this._viewerId = viewerId;
  }

  public getCredentials(){
    return {
      [userAuthKeyUrl]: this._authKey,
      [userKeyUrl]: this._viewerId
    };
  }
}
