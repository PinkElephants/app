import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'profile',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() user:any;
}

