import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {HackinderService} from "../../services/hackinder.service";

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
    this.hackinderService.doLike(this.possibleMatches[0].user_id);
    this.possibleMatches.pop();
  }
  private _subscriptions: any = [];
  ngOnInit(){
    this.hackinderService.getPossibleMatches();
    this._subscriptions.push(this.hackinderService.possibleMatches$.subscribe((matches)=>{
      this.possibleMatches =  this.possibleMatches.concat(matches);
      this._ref.detectChanges();
    }));
  }
  ngOnDestroy(){
    this._subscriptions.map((item)=> item.unsubscribe(); )
  }
}

