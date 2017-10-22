import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import * as Rx from  "rxjs"
import {FavouriteMatch} from "../models/favourite-match";
import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/switchMap';
import "rxjs/add/operator/mergeMap";
import {User} from "../app.interfaces";

@Injectable()
export class HackinderService {
  constructor(private api: ApiService){}
  public userSkills$: BehaviorSubject<any[]> = new BehaviorSubject(null);
  public user$: BehaviorSubject<User> =  new BehaviorSubject(<User>{});
  public filtersOpened$: BehaviorSubject<boolean> =  new BehaviorSubject(false);
  public possibleMatches$: BehaviorSubject<any[]> =  new BehaviorSubject<any[]>([]);
  public favouriteMatches$: BehaviorSubject<FavouriteMatch[]> = new BehaviorSubject(null);
  public loading$: BehaviorSubject<boolean> =  new BehaviorSubject(true);
  public addSkill(skill: string) {
    const skills  = this.user$.getValue().skills.slice();
    skills.push(skill);
    this.user$.next(Object.assign({}, this.user$.getValue(), {skills: skills}));
  }
  public deleteSkill(index: number){
    const skills = this.user$.getValue().skills;
    skills.splice(1, index);
    this.user$.next(Object.assign({}, this.user$.getValue(), {skills: skills.slice()}));
  }

  public setIdea(idea:string){
    this.user$.next(Object.assign({}, this.user$.getValue(), {idea: idea}));
  }
  public setSummary(summary:string){
    this.user$.next(Object.assign({}, this.user$.getValue(), {summary: summary}));
  }
  public openFilters(){
    this.filtersOpened$.next(true);
  }

  public closeFilters(){
    this.filtersOpened$.next(false);
  }



  public updateUser(){
    return this.api.updateUser(this.user$.getValue());
  }

  public getUser(id){
    return this.api.getUser(id).mergeMap(user => this.api.fetchUsers([id]), (hackUser: User, vkUser) => {
      this.user$.next(Object.assign({}, hackUser, vkUser));
    });
  }
  public setLoading(bool: boolean){
    this.loading$.next(bool);
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

  public getMatch(userId:string){
    return this.api.getFavouriteMatches()
      .map(users => {
        debugger;
        return users.filter(x => x.user_id == userId)
      })
      .first()
  }

  public getFavouriteMatches(): Observable<FavouriteMatch[]> {
    return this.api.getFavouriteMatches()
      .map(users => users.map(x => x.user_id))
      .mergeMap((ids: any) => this.api.fetchUsers(ids))
      .map(items => items.response)
      .map((items: any) => {
        return items.map(item => {
          const match: FavouriteMatch = {
            id: item.uid,
            firstName: item.first_name,
            lastName: item.last_name,
            photoUrl: item.photo_max_orig
          };
          return match;
        });
      });
  }

  public doLike(user_id:string){
    return this.api.doMatch(user_id, true);
  }

  public doDislike(user_id:string){
    return this.api.doMatch(user_id, false);
  }
}
