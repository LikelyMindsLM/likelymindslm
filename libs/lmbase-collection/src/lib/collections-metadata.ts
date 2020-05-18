import { Injectable } from '@angular/core';
import { ICollectionsMetadata } from '@likelymindslm/lmbase-shared-types';

@Injectable({
  providedIn: 'root',
})
export class CollectionsMetadata {
  /**
   * make the collections_metadata objectstore available for use
   *
   */ private _collectionsMetaData = new Map<string, ICollectionsMetadata>();

  constructor() {}

  upsert(name: string, meta: ICollectionsMetadata) {
    this._collectionsMetaData.set(name, meta);
  }

  remove(name: string) {
    this._collectionsMetaData.delete(name);
  }

  checkCollectionExists(name: string) {
    return this._collectionsMetaData.has(name);
  }

  getSortByPropPath(name: string): string[] {
    if (!this.checkCollectionExists(name)) {
      throw new Error(
        `Collection '${name}' does not exist! Use the CollectionManager to create a new 
        collection named '${name}'`
      );
    }
    return this._collectionsMetaData.get(name).sort_by_prop_path;
  }

  getAllCollectionNames() {
    return Array.from(this._collectionsMetaData.keys());
  }
}
