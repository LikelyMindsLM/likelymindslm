import { Injectable, OnDestroy } from '@angular/core';
import Dexie, { Table } from 'dexie';
import {
  IDocument,
  ICollectionsMetadata,
  Intercom,
} from '@likelymindslm/lmbase-shared-types';

import { CollectionsMetadata } from '@likelymindslm/lmbase-collection';

@Injectable({
  providedIn: 'root',
})
export class IdbAdapter extends Dexie implements OnDestroy {
  /**
   * Declare implicit table properties.
   * (just to inform Typescript. Instanciated by Dexie in stores() method).
   *
   * A dexie `Table` is an `indexeddb` `objectstore`.
   */

  local_cache: Table<IDocument, string>;
  intercom: Table<Intercom, string>;
  collections_metadata: Table<ICollectionsMetadata, string>;
  client_metadata: Table<ICollectionsMetadata, string>;

  constructor(private collectionsMetadata: CollectionsMetadata) {
    /**
     * `indexeddb` Database name, and other dexie config.
     *
     */ super('likelymindslm');
    const db = this;

    /**
     * `indexeddb` `objectstores` schema used by dexie.
     * Provide the schema for each database version number, along with any database version upgrade transactions.
     */

    db.version(1).stores({
      local_cache: '_id,[metadata.collection_name+metadata.sort_by_prop_value]',
      intercom: 'document_id,[collection_name+is_broadcasted]',
      collections_metadata: 'collection_name',
      client_metadata: '',
    });
  }

  ngOnDestroy() {}
}
