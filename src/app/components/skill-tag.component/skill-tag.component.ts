import {
  Component, ElementRef, ChangeDetectionStrategy, Renderer, AfterViewInit, Renderer2, ViewChild,
  Input, Output, EventEmitter
} from '@angular/core';

@Component({
  selector: 'skill',
  templateUrl: './skill-tag.component.html',
  styleUrls: ['./skill-tag.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillComponent {
  @Input() public  value: string;
  @Input() public  hasShadow?: boolean;
  @Input() public  index: number;
  @Input() public  isRemovable = false;
  @Output() onDelete =  new EventEmitter();
}
