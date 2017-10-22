import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'detailed-info',
  templateUrl: './detailed-info.component.html',
  styleUrls: ['./detailed-info.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedInfoComponent{
  @Input() skills: string[] = [];
  @Input() idea: string;
  @Output() close = new EventEmitter();
}
