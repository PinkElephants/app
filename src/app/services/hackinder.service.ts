import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import * as Rx from  "rxjs"
import {FavouriteMatch} from "../models/favourite-match";
import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/switchMap';
import "rxjs/add/operator/mergeMap";

import {userAuthKeyUrl, userKeyUrl} from "../app.constants";
@Injectable()
export class HackinderService {
  constructor(private api: ApiService){}
  public userSkills$: BehaviorSubject<any[]> = new BehaviorSubject(null);
  public user$: Subject<{}> =  new Subject();
  public possibleMatches$: BehaviorSubject<any[]> =  new BehaviorSubject<any[]>([]);
  public favouriteMatches$: BehaviorSubject<FavouriteMatch[]> = new BehaviorSubject(null);

  public addSkill(skill: string) {
    this.user.skills.push(skill);
    this.userSkills$.next(this.user.skills.slice());
  }
  public deleteSkill(index: number){
    this.user.skills.splice(index, 1);
    this.userSkills$.next(this.user.skills.slice());
  }
  private user =  {
    skills: []
  };

  public getUser(id){
    return this.api.getUser(id);
  }

  public getPossibleMatches(){
    this.api.getPossibleMatches()
      .subscribe((response: any[]) => {
        if(response && response.length) {
          this.api.fetchUsers(response.map((data: any) => data.user_id))
            .subscribe((response2)=>{
              const merge = response.map((item)=>{
                for(let i = 0; i< response2.response.length; ++i){
                  if(response2.response[i].uid +'' === item.user_id){
                    return Object.assign({}, item, response2.response[i], {user_id: +item.user_id});
                  }
                }
                return null;
              }).filter((item) => item !== null);
              this.possibleMatches$.next(merge);
            });
        }
        return response;
      });
  }

  public getFavouriteMatches(): Observable<FavouriteMatch> {
    return this.api.getFavouriteMatches()
      .map(users => users.map(x => x.user_id))
      .mergeMap((ids:any) => this.api.fetchUsers(ids))
      .mergeMap(items => Rx.Observable.of(items))
      .map((item:any) => {
        var match: FavouriteMatch = {
          id: item.id,
          firstName: item.first_name,
          lastName: item.last_name,
          photoUrl: item.photo_max_orig
        };
        return match;
      });
  }
}
