import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HackinderService} from "../../services/hackinder.service";
import {FavouriteMatch} from "../../models/favourite-match";

@Component({
  selector: 'matched-page',
  templateUrl: './matched.component.html',
  styleUrls: ['./matched.component.less']
})
export class MatchedPageComponent implements AfterViewInit {
  matches: FavouriteMatch[] = [];

  constructor(private hackService: HackinderService) {
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
