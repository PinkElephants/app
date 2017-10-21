import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
export class HackinderService {

  public userSkills$: BehaviorSubject<any[]> = new BehaviorSubject(null);
  public addSkill(skill: string) {
    this.user.skills.push(skill);
    this.userSkills$.next(this.user.skills.slice());
  }
  private user =  {
    skills: []
  };

  public getUser(id){
    //return this.api.fetchUser(id);
  }
}
