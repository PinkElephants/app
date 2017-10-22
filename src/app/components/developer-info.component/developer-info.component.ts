import {AfterViewInit, Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HackinderService} from "../../services/hackinder.service";
import "rxjs/add/operator/mergeMap";


@Component({
  selector: 'developer-info-page',
  templateUrl: './developer-info.component.html',
  styleUrls: ['./developer-info.component.less']
})
export class DeveloperInfoPageComponent implements OnInit {
  id: string;
  skills: string[] = []
  idea: string = ""

  constructor(private hackService: HackinderService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .map(params => params["id"])
      .mergeMap(id => this.hackService.getMatch(id))
      .subscribe(user => {
        this.skills = user.skills;
        this.idea = user.idea;
      })
  }
}
