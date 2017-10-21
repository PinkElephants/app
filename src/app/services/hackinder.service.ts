import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {FavouriteMatch} from "../models/favourite-match";
export class HackinderService {

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
    //return this.api.fetchUser(id);
  }

  public favouriteMatches$: BehaviorSubject<FavouriteMatch[]> = new BehaviorSubject(null);
  public getFavouriteMatches(): Observable<FavouriteMatch>{
    //favouriteMatches$.next(new FavouriteMatch())
    return null;
  }
}
