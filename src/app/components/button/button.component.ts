import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input()textButton:string ='Login';
  @Input()size: string ='auto';
}
