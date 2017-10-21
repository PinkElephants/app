import {
  Component, ElementRef, ChangeDetectionStrategy, Renderer, AfterViewInit, Renderer2, ViewChild,
  OnInit
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {HackinderService} from '../../services/hackinder.service';
import {AuthService} from "../../services/auth.service";
import {userKeyUrl} from "../../app.constants";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'style': 'height: 100%; display: block'
  }
})
export class HomePageComponent implements  OnInit {
  constructor(private renderer: Renderer2, private hackService: HackinderService,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService) {
    this.skillsValues$ = hackService.userSkills$;
  }
  public skillsValues$: any;

  public loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  ngOnInit(){
    this.route.params.subscribe((params)=>{
      if(params['edit']){
        this.hackService.getUser(this.auth.getCredentials()[userKeyUrl]).subscribe((data)=>{
          debugger;
          setTimeout(()=>{
            this.router.navigate(['/find']);}, 3000)
        }, (error)=>{ //404
          this.loading$.next(false);
        });
      } else {
        this.loading$.next(false);
      }
    });
  }
  submitUser(){
    this.hackService.updateUser().subscribe((response)=>{
      this.router.navigate(['/find']);
    }, (response)=>{
      this.router.navigate(['/find']);
    });
  }
  skillOnDelete(index: number){
    debugger
    this.hackService.deleteSkill(index);
  }


}

