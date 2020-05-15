import { Injectable } from '@angular/core';
import { Lmbase } from '@likelymindslm/lmbase';

@Injectable({
  providedIn: 'root'
})
export class LmbaseService {
  constructor(lmbase: Lmbase) {}
}
