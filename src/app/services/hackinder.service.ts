import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import * as Rx from  "rxjs"
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
