import {AfterViewInit, Component, Input, OnInit} from "@angular/core";



@Component({
  selector: 'detailed-info',
  templateUrl: './detailed-info.component.html',
  styleUrls: ['./detailed-info.component.less']
})
export class DetailedInfo implements OnInit {
  @Input() skills: string[] = [];
  @Input() idea: string;
  ngOnInit(): void {
    // this.route.queryParams
    //   .map(params => params["id"])
    //   .mergeMap(id => this.hackService.getMatch(id))
    //   .subscribe(user => {
    //     this.skills = user.skills;
    //     this.idea = user.idea;
    //   })
  }
}
