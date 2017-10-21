import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HackinderService} from "../../services/hackinder.service";
import {FavouriteMatch} from "../../models/favourite-match";

@Component({
  selector: 'favourite-page',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.less']
})
export class FavouritePageComponent implements AfterViewInit {
  matches: FavouriteMatch[] = [];

  constructor(private hackService: HackinderService) {
  }

  ngAfterViewInit(): void {
    this.hackService
      .getFavouriteMatches()
      .subscribe(match => {
        this.matches.push(match)
      });

  }
}
