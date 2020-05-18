import { Component, OnInit, OnDestroy } from '@angular/core';
import { LmbaseService } from './lmbase.service';

@Component({
  selector: 'likelymindslm-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  constructor(private lmbaseService: LmbaseService) {}

  async ngOnInit() {
    await this.lmbaseService.test();
  }

  async ngOnDestroy() {}
}
