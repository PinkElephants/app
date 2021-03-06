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
  constructor(private renderer: Renderer2,
              public hackService: HackinderService,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService) {

  }

  public loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  ngOnInit(){
    this.route.params.subscribe((params)=>{
        this.hackService.getUser(this.auth.getCredentials()[userKeyUrl]).subscribe((data)=>{
          if(!params['edit']){
            setTimeout(()=>{
              this.router.navigate(['/find']);},
              1000);
          } else {
            this.loading$.next(false);
          }
        }, (error)=>{
          this.loading$.next(false);
        });
    });
  }
  submitUser(){
    this.hackService.updateUser().subscribe((response)=>{
     this.hackService.getUser(this.auth.getCredentials()[userKeyUrl]).subscribe(()=>{
       this.router.navigate(['/find']);
     });
    });
  }
}

