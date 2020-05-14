import { Component } from '@angular/core';
import { LmbaseService } from './lmbase.service';

@Component({
  selector: 'likelymindslm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(lmbaseService: LmbaseService) {}
}
