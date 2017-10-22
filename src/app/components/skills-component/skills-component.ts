import {
  Component, ElementRef, ChangeDetectionStrategy, Renderer, AfterViewInit, Renderer2, ViewChild,
  Input, Output, EventEmitter
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {HackinderService} from "../../services/hackinder.service";

@Component({
  selector: 'skills',
  templateUrl: './skills-component.html',
  styleUrls: ['./skills.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent implements AfterViewInit{
  @Input() public  skills: string[];
  @Input() public  hasShadow: boolean = false;
  @Output() public onDelete  = new EventEmitter();
  @Output() public onAdd  = new EventEmitter();
  constructor(private renderer: Renderer2, private hackService: HackinderService){
    this.skillsCtrl = new FormControl();
  }
  skillsCtrl: FormControl;
  @ViewChild('skillsInput') skillInput: ElementRef;
  ngAfterViewInit() {
    this.renderer.listen(this.skillInput.nativeElement, 'keypress', (evt) => {
      if (evt.charCode === 13) {
        this.onAdd.emit(this.skillsCtrl.value);

        this.skillsCtrl.setValue('');
      }
    });
  }
}
