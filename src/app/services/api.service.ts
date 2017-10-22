import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Jsonp} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {SearchSettings} from "../app.interfaces";
const HICKTINDER_ENDPOINT = 'https://hackinder.com/api/';
//const HICKTINDER_ENDPOINT = 'http://localhost/api/';
const VK_ENDPOINT = 'https://api.vk.com/method/';
@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private _jsonp: Jsonp) {}
  public getUser(id: number) {
    return this.http.get(HICKTINDER_ENDPOINT + 'user');
  }

  public updateUser(user){
    return this.http.post(HICKTINDER_ENDPOINT + 'user',  user);
  }
  public submitSearchSettings(settings: SearchSettings){
    return this.http.post(HICKTINDER_ENDPOINT + 'user/settings', settings);
  }
  public fetchUsers(ids: number[]){
    return this._jsonp.get(VK_ENDPOINT + 'users.get?user_ids=' + ids.join(',') + '&fields=photo_max_orig&callback=JSONP_CALLBACK')
      .map((response) => response.json());
  }
  public getPossibleMatches(){
    return this.http.get(HICKTINDER_ENDPOINT + 'newmatches');
  }

  public getFavouriteMatches() : Observable<any>{
    return this.http.get(HICKTINDER_ENDPOINT + 'matches');
  }

  public doMatch(user_id:string, isLiked:boolean) : Observable<any>{
    return this.http.post(HICKTINDER_ENDPOINT + 'match', {user_id : user_id, isLike: isLiked});
  }
}
