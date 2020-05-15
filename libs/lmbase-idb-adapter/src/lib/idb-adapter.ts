import { Injectable, OnDestroy } from '@angular/core';
import Dexie, { Table } from 'dexie';
import {
  IDocument,
  ICollectionsMetadata,
  Intercom,
} from '@likelymindslm/lmbase-shared-types';

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

  local_cache: Dexie.Table<IDocument, string>;
  collections_metadata: Dexie.Table<ICollectionsMetadata, string>;
  intercom: Dexie.Table<Intercom, string>;

  /**
   * read the collections_metadata objectstore and make it available for use
   *
   */ collectionsMetaData = new Map<string, ICollectionsMetadata>();

  constructor() {
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
      local_cache: '_id,[metadata.collection_name+metadata.sort_by_value]',
      collections_metadata: 'collection_name',
      intercom: 'document_id,[collection_name+is_broadcasted]',
    });

    db.transaction('readonly', db.collections_metadata, async (tx) => {
      await tx
        .table<ICollectionsMetadata, string>('collections_metadata')
        .each((collection) => {
          this.collectionsMetaData.set(collection.collection_name, collection);
        });
    })
      .then(() => {
        console.log('Read collection_metadata');
      })
      .catch((error) => {
        console.error(error);
        /**
         * Need to throw since we are not handling it.
         * @todo use ngrx generic error handler here...
         */
        throw error;
      });
  }

  ngOnDestroy() {}
}
