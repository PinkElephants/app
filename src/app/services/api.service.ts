import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Jsonp} from "@angular/http";
const HICKTINDER_ENDPOINT = 'http://hackinder.com/api/';
const VK_ENDPOINT = 'https://api.vk.com/method/';
@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private _jsonp: Jsonp) {}
  public getUser(id: number) {
    return this.http.get(HICKTINDER_ENDPOINT + 'user').subscribe((response) => {
      return response;
    }, () => {
      //..
    });
  }
  public fetchUsers(ids: number[]){
    return this._jsonp.get(VK_ENDPOINT + 'users.get?user_ids=' + ids.join(',') + '&fields=photo_max_orig&callback=JSONP_CALLBACK')
      .map((response) => response.json());
  }
  public getPossibleMatches(){
    return this.http.get(HICKTINDER_ENDPOINT + 'newmatches');
  }
}
