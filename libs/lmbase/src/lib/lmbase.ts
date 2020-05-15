import { Injectable, OnDestroy } from '@angular/core';
import { IdbAdapter } from '@likelymindslm/lmbase-idb-adapter';

@Injectable({
  providedIn: 'root'
})
export class Lmbase implements OnDestroy {
  constructor(idbAdapter: IdbAdapter) {}

  ngOnDestroy() {}
}
