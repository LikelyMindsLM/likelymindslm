import { Injectable, OnDestroy } from '@angular/core';
import { Adapter } from '@likelymindslm/lmbase-adapter';

@Injectable({
  providedIn: 'root'
})
export class Lmbase implements OnDestroy {
  constructor(adapter: Adapter) {}

  ngOnDestroy() {}
}
