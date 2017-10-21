import {Component, ElementRef, ChangeDetectionStrategy, Renderer, AfterViewInit, Renderer2, ViewChild} from '@angular/core';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
@Component({
  selector: 'find-page',
  templateUrl: './find-page.component.html',
  styleUrls: ['./find-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FindPageComponent{
}

