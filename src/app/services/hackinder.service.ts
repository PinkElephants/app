import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {FavouriteMatch} from "../models/favourite-match";
import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
@Injectable()
export class HackinderService {
  constructor(private api: ApiService){}
  public userSkills$: BehaviorSubject<any[]> = new BehaviorSubject(null);
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
  public mergeUser(hackData, vkData){

  }
  public possibleMatches$: BehaviorSubject<any[]> =  new BehaviorSubject<any[]>([]);
  public getPossibleMatches(){
    this.api.getPossibleMatches()
      .subscribe((response: any[]) => {
        if(response && response.length) {
          this.api.fetchUsers(response.map((data: any) => data.user_id))
            .subscribe((response2)=>{
              const merge = response.map((item)=>{
                debugger;
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
    //favouriteMatches$.next(new FavouriteMatch())
    return null;
  }
}
