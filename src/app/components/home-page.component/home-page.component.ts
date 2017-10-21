import {Component, ElementRef, ChangeDetectionStrategy, Renderer, AfterViewInit, Renderer2, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {HackinderService} from '../../services/hackinder.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'style': 'height: 100%; display: block'
  }
})
export class HomePageComponent implements AfterViewInit{
  skillsCtrl: FormControl;
  @ViewChild('skills') skillInput: ElementRef;
  constructor(private renderer: Renderer2, private hackService: HackinderService) {
    this.skillsCtrl = new FormControl();
    this.skillsValues = hackService.userSkills$;
  }

  public skillsValues: any;

  skillOnDelete(index: number){
    this.hackService.deleteSkill(index);
  }
  ngAfterViewInit() {
    this.renderer.listen(this.skillInput.nativeElement, 'keypress', (evt) => {
      if (evt.charCode === 13) {
        this.hackService.addSkill(this.skillsCtrl.value);
        this.skillsCtrl.setValue('');
      }
    });
  }

}

