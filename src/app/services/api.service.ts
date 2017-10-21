import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Jsonp} from "@angular/http";
import {Observable} from "rxjs/Observable";
const HICKTINDER_ENDPOINT = 'http://hackinder.com/api/';
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
  public fetchUserss(ids: string[]):Observable<any>{
    return Observable.from([1,2,3]);
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
}
