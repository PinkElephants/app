import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() user:any
}

