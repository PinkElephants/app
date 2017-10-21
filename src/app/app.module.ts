import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WindowRefService} from './services/window.service';
import {UtilsService} from './services/utils.service';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatAutocompleteModule} from '@angular/material';
import {HomePageComponent} from './components/home-page.component/home-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HackinderService} from './services/hackinder.service';
import {ApiService} from './services/api.service';
import {SkillComponent} from './components/skill-tag.component/skill-tag.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SkillComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [WindowRefService, UtilsService, HackinderService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
