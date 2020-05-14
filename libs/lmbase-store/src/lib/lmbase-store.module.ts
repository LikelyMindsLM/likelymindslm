import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromViews from './+state/views/views.reducer';
import { ViewsEffects } from './+state/views/views.effects';
import { ViewsFacade } from './+state/views/views.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromViews.VIEWS_FEATURE_KEY, fromViews.reducer),
    EffectsModule.forFeature([ViewsEffects])
  ],
  providers: [ViewsFacade]
})
export class LmbaseStoreModule {}
