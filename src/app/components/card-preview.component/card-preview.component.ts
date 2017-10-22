import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {User} from '../../app.interfaces';
import {CARD_VIEW} from '../../app.constants';

@Component({
  selector: 'card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPreviewComponent {
  @Input() user: User;
}
