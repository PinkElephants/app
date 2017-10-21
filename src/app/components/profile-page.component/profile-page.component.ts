import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {
  constructor(private route: ActivatedRoute) {

  }
  ngOnInit() {
    const user = this.route.params.subscribe(params => {
     //
    });
  }
}

