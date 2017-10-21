import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import * as Rx from  "rxjs"
import {FavouriteMatch} from "../models/favourite-match";
import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
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
  public favouriteMatches$: BehaviorSubject<FavouriteMatch[]> = new BehaviorSubject(null);
  public getFavouriteMatches(): Observable<FavouriteMatch>{

    var matches:FavouriteMatch[] = [
      {id : 1, firstName: "First", lastName:"Last", photoUrl : "https://pp.userapi.com/c836333/v836333001/31189/8To0r3d-6iQ.jpg"},
      {id : 1, firstName: "First", lastName:"Last", photoUrl : "https://pp.userapi.com/c836333/v836333001/31189/8To0r3d-6iQ.jpg"},
      {id : 1, firstName: "First", lastName:"Last", photoUrl : "https://pp.userapi.com/c836333/v836333001/31189/8To0r3d-6iQ.jpg"},
      {id : 1, firstName: "First", lastName:"Last", photoUrl : "https://pp.userapi.com/c836333/v836333001/31189/8To0r3d-6iQ.jpg"},
      {id : 1, firstName: "First", lastName:"Last", photoUrl : "https://pp.userapi.com/c836333/v836333001/31189/8To0r3d-6iQ.jpg"},
      {id : 1, firstName: "First", lastName:"Last", photoUrl : "https://pp.userapi.com/c836333/v836333001/31189/8To0r3d-6iQ.jpg"},
      {id : 1, firstName: "First", lastName:"Last", photoUrl : "https://pp.userapi.com/c836333/v836333001/31189/8To0r3d-6iQ.jpg"},
      {id : 1, firstName: "First", lastName:"Last", photoUrl : "https://pp.userapi.com/c836333/v836333001/31189/8To0r3d-6iQ.jpg"},
    ];

    return Rx.Observable.from(matches)
  }
}
