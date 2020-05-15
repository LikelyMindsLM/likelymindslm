import { NgModule } from '@angular/core';
import { LmbaseBatchedOpsModule } from '@likelymindslm/lmbase-batched-ops';
import { LmbaseChangeStreamsModule } from '@likelymindslm/lmbase-change-streams';
import { LmbaseIdbAdapterModule } from '@likelymindslm/lmbase-idb-adapter';
import { LmbaseLiveQueryModule } from '@likelymindslm/lmbase-live-query';
import { LmbaseRemoteSyncModule } from '@likelymindslm/lmbase-remote-sync';

@NgModule({
  imports: [
    LmbaseBatchedOpsModule,
    LmbaseChangeStreamsModule,
    LmbaseIdbAdapterModule,
    LmbaseLiveQueryModule,
    LmbaseRemoteSyncModule
  ]
})
export class LmbaseModule {}
