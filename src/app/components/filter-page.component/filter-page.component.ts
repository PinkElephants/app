import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {HackinderService} from "../../services/hackinder.service";
import {SearchSettings} from "../../app.interfaces";

@Component({
  selector: 'filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPageComponent {
private _initialSettings: SearchSettings = Object.assign({}, this.hackingService.user$.getValue().settings);
  constructor(public hackingService: HackinderService){
  }
  public deleteSkill(index: number){
    const settings = Object.assign({}, this.hackingService.user$.getValue().settings);
    const _cache = settings.desiredSkills.slice();
    _cache.splice(index, 1);
    settings.desiredSkills = _cache;
    this.hackingService.updateSearchSettings(settings);
  }
  public addSkill(skill: string){
    const settings = Object.assign({}, this.hackingService.user$.getValue().settings);
    const _cache = settings.desiredSkills ? settings.desiredSkills.slice() : [];
    _cache.push(skill);
    settings.desiredSkills = _cache;
    this.hackingService.updateSearchSettings(settings);
  }
  public submitSearchSettings(){
    this.hackingService.submitSearchSettings().subscribe();
    this.close.emit();
  }
  public resetSearchSettings(){
    this.hackingService.updateSearchSettings(this._initialSettings);
  }
  @Output() close = new EventEmitter();

}
