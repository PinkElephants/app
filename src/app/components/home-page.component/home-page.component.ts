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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements AfterViewInit{
  skillsCtrl: FormControl;
  @ViewChild('skills') skillInput: ElementRef;

  states: any[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  constructor(private renderer: Renderer2, private hackService: HackinderService) {
    this.skillsCtrl = new FormControl();
    this.skillsValues = hackService.userSkills$;
  }

  public skillsValues: any;
  filterStates(name: string) {
    return this.states.filter(state =>
    state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
skillOnDelete(index: number){
    console.log(index, 'delete');
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

