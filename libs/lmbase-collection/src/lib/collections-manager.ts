import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CollectionsManager {
  constructor() {}

  /**
   * Add new collection
   *
   * @param collectionName name of the collection to add
   * @param sortByPropPath The primary field to sort by
   *
   * The value coresponding to `sortByPropPath` will be copied over to the `metadata` object of the document.
   * Indexeddb sorts the documents stored using the value corresponding to this key.
   *
   * For nested paths, provide the keys sequentially in the array
   *
   */
  add(collectionName: string, sortByPropPath: string[]) {}
}
