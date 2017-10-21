import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
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
export class FindPageComponent{
  constructor(private hackinderService: HackinderService, private _ref: ChangeDetectorRef){
  }
  public possibleMatches: any[] = [];
  public like(){
    this.hackinderService.doLike(this.possibleMatches[0].user_id).subscribe()
    this.possibleMatches.pop();
  }
  ngOnInit(){
    this.hackinderService.getPossibleMatches();
    this.hackinderService.possibleMatches$.subscribe((matches)=>{
      this.possibleMatches =  this.possibleMatches.concat(matches);
      this._ref.detectChanges();
    });
  }
}

