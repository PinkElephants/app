import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {User} from '../../app.interfaces';
import {CARD_VIEW} from '../../app.constants';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'style': 'height: 100%; display: block'
  }
})
export class CardComponent {
  @Input() user: User;
  @Input() view: CARD_VIEW;
  @Output() onLike =  new EventEmitter();
  @Output() onDislike =  new EventEmitter();
}

