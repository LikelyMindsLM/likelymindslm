import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { IDocument, ICollectionsMetadata, Intercom } from './adapter.models';

@Injectable({
  providedIn: 'root'
})
export class DexieService extends Dexie {
  /**
   * Declare implicit table properties.
   * (just to inform Typescript. Instanciated by Dexie in stores() method)
   */

  local_cache: Dexie.Table<IDocument, string>;
  collections_metadata: Dexie.Table<ICollectionsMetadata, string>;
  intercom: Dexie.Table<Intercom, string>;

  constructor() {
    super('likelymindslm');

    const db = this;

    db.version(1).stores({
      local_cache: '_id,[metadata.collection_name+metadata.sort_by_value]',
      collections_metadata: 'collection_name',
      intercom: 'document_id,[collection_name+is_broadcasted]'
    });
  }
}
