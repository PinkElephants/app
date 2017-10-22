import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPageComponent {
  public skillsValues$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  @Output() close = new EventEmitter();
  private _skills: string[] = [];
  public deleteSkill(index: number) {
    this._skills.splice(index, 1);
    this.skillsValues$.next(this._skills.slice());
  }
}
