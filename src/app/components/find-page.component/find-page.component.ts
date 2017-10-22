import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {HackinderService} from "../../services/hackinder.service";
import {style, trigger, query, stagger, state, animate, transition} from "@angular/animations";
@Component({
  selector: 'find-page',
  templateUrl: './find-page.component.html',
  styleUrls: ['./find-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'style': 'height: 100%; display: block'
  }
})
export class FindPageComponent implements OnInit, OnDestroy{
  constructor(private hackinderService: HackinderService, private _ref: ChangeDetectorRef){
  }

  public possibleMatches: any[] = [];
  public like(){
    this.hackinderService.doLike(this.possibleMatches[0].user_id).subscribe();
    this.possibleMatches.shift();
  }
  public dislike(){
    this.hackinderService.doDislike(this.possibleMatches[0].user_id).subscribe();
    this.possibleMatches.shift();
  }
  private _subscriptions: any = [];
  ngOnInit(){
    this.hackinderService.getPossibleMatches();
    this._subscriptions.push(this.hackinderService.possibleMatches$.subscribe((matches)=>{
      this.possibleMatches =  this.possibleMatches.concat(matches);
      this._ref.detectChanges();
    }));

  }
  public showDetailed: boolean =  false;
  openDetailed(){
    this.showDetailed =  true;
     }
  ngOnDestroy(){
    this._subscriptions.map((item)=> item.unsubscribe())
  }
}

