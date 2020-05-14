import { NgModule } from '@angular/core';
import { LmbaseAdapterModule } from '@likelymindslm/lmbase-adapter';
import { LmbaseChangestreamsModule } from '@likelymindslm/lmbase-changestreams';
import { LmbaseLivequeryModule } from '@likelymindslm/lmbase-livequery';
import { LmbaseStoreModule } from '@likelymindslm/lmbase-store';
import { LmbaseSyncModule } from '@likelymindslm/lmbase-sync';

@NgModule({
  imports: [
    LmbaseAdapterModule,
    LmbaseChangestreamsModule,
    LmbaseLivequeryModule,
    LmbaseStoreModule,
    LmbaseSyncModule
  ]
})
export class LmbaseModule {}
