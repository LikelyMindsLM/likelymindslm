import { NgModule } from '@angular/core';
import { LmbaseStoreModule } from '@likelymindslm/lmbase-store';
import { LmbaseBatchedOpsModule } from '@likelymindslm/lmbase-batched-ops';
import { LmbaseChangeStreamsModule } from '@likelymindslm/lmbase-change-streams';
import { LmbaseIdbAdapterModule } from '@likelymindslm/lmbase-idb-adapter';
import { LmbaseLiveQueryModule } from '@likelymindslm/lmbase-live-query';
import { LmbaseRemoteSyncModule } from '@likelymindslm/lmbase-remote-sync';
import { LmbaseCollectionModule } from '@likelymindslm/lmbase-collection';

@NgModule({
  imports: [
    LmbaseStoreModule,
    LmbaseBatchedOpsModule,
    LmbaseChangeStreamsModule,
    LmbaseIdbAdapterModule,
    LmbaseLiveQueryModule,
    LmbaseRemoteSyncModule,
    LmbaseCollectionModule,
  ],
})
export class LmbaseModule {}
