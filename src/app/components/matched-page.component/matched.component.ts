import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HackinderService} from "../../services/hackinder.service";
import {FavouriteMatch} from "../../models/favourite-match";
import {Router} from "@angular/router";

@Component({
  selector: 'matched-page',
  templateUrl: './matched.component.html',
  styleUrls: ['./matched.component.less']
})
export class MatchedPageComponent implements AfterViewInit {
  matches: FavouriteMatch[] = [];

  constructor(private hackService: HackinderService,
              public router:Router) {
  }

  public redirect(): void{
    this.router.navigate(['find']);
  }
  ngAfterViewInit(): void {
    this.hackService
      .getFavouriteMatches()
      .subscribe(fetched => {
        debugger;
        this.matches = fetched;
      });

  }
}
