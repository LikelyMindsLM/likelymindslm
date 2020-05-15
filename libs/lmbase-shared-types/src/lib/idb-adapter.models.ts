/**
 * Describes the model of a document  in the `local_cache` objectstore.
 * `local_cache` contains all the documents stored locally in `indexeddb` indexed by the metadata: `collection_name`, sorted by `sort_by_value`.
 *
 * Any local CRUD must be first comitted on the `local_cache` objectstore `pessimistically`. Ie. writes must be succesful in the `local_cache`
 * objectstore before the query view is updated. Communicating to the server however, is done `optimistically`. Ie. the query view is updated right after
 * the write executes on the `local_cache` objectstore, and the change is broadcasted to server later depending upon availablity of network.
 *
 * Incomming server changestreams must first update the `local_cache` objectstore, and write to the `intercom` inside the same `indexeddb` `transaction`.
 * The query view will then update reactively based on changestream broadcasted from the entry in the intercom
 *
 * The timing of these is handled using RXJS Observable patterns and operators, and the query view is built using NGRX store.
 */

export interface IDocument {
  /**
   * Primary Key
   * Automerge Actor ID
   *
   */ _id: string;

  /**
   * Automerge Document
   * The state is not indexed as it will be a large string containing multiple revision trees of the state
   *
   */ serialized_state: string;

  /**
   * Additional necessary info about the document
   *
   */ metadata: IDocumentMetadata;
}

/**
 * A compound index is created in the `indexeddb` objectstore to query by `collection_name`, sorted by `sort_by_value`.
 * All documents are stored in the `local_cache` `indexeddb` objectstore, and the index acts as having multiple collection stores.
 * Document reads are paginated and only a small batch of the sorted documents are read from the index. Any further sorting
 * and filtering is then performed in-memory on that batch.
 */

export interface IDocumentMetadata {
  /**
   * Name of the collection that the document belongs to.
   *
   */ collection_name: string;

  /**
   * Value of `sort_by_prop_path` field is replicated in the document metadata.
   * Indexeddb sorts the documents stored using this value.
   * Lmbase relies on the indexeddb sort order as primary sorting for creating infinite scrolling views.
   *
   */ sort_by_prop_value: string;
}

/**
 * Describes the model of a document  in the `collections_metadata` objectstore
 */

export interface ICollectionsMetadata {
  /**
   * Name of a registered collection
   * Primary key in the objectstore
   * Additionally enforces uniqueness of collection names when registering a new collection
   *
   */ collection_name: string;

  /**
   * The primary field to sort by
   * The value coresponding to this key will be copied over to the `metadata` object of the document.
   * Indexeddb sorts the documents stored using the value corresponding to this key.
   * Will be a dot deliminated string for nested paths
   *
   */ sort_by_prop_path: string[];
}

/**
 * Describes the model of a document  in the `intercom` objectstore.
 * Any CRUD operations to the `local_cache` must be accompanied by a document in the intercom inside the same `indexeddb` `transaction`.
 *
 * Objects added to the intercom store will generate a database changelog which will be pushed to the changestream, and then be broadcasted
 * across all connected browser tabs.
 *
 * Query views are updated using this broadcasted information. The CRUD in `local_cache` could be due to a local database operation,
 * or a change in the server database
 *
 * The document IDs present in the intercom will determine whether a document changed since the last sync with the server.
 * A document will be removed from intercom once sync with the server is succesful
 */

export interface Intercom {
  /**
   * The `_id` field on the document.
   * Primary key in the objecstore.
   * Indexeddb `put` method must be used to upsert data since using `add` will fail if id already exists.
   *
   */ document_id: string;

  /**
   * Automerge Document
   * The changelog will be based on the `serialized_state`, which will have the latest state after the database change.
   * The previous state (before the database update) can be extracted using AutoMerge.undo() since the revision tree is preserved.
   * The livequery engine uses the state of the doc before and after the change to update the query view reactively.
   *
   */ serialized_state: string;

  /**
   * Name of the collection that the document belongs to.
   * Live Queries will react to the broadcasted changestream based on the collection that they are listening to for changes.
   *
   */ collection_name: string;

  /**
   * When adding new documents to the intercom, the `is_broadcasted` field must be false.
   * The flag will be set to true once all connected broadcast listeners recieve the change.
   * This field is indexed to get new documents inserted to the intercom, right after an `indexeddb`
   * `transaction` promise resolves succesfully.
   *
   */ is_broadcasted: BOOL;
}

/**
 * Booelan is implemented as 0 = false, 1 = true since some `indexeddb` implementations have issues.
 *
 */ export enum BOOL {
  TRUE = 1,
  FALSE = 0,
}
