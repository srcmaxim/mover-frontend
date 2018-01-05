import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

/**
 * The main class for working with single and multi casting
 * for collection of elements or single values.
 */
export class EntityCast<T> {

  private collection: BehaviorSubject<T[]> = new BehaviorSubject([]);
  private singleton: BehaviorSubject<T> = new BehaviorSubject(null);

  public multiCast: Observable<T[]> = this.collection.asObservable();
  public singleCast: Observable<T> = this.singleton.asObservable();

  /**
   * Adds created entity to collection
   * and evicts multiChange and singleChange events.
   *
   * @param {T} entity to create
   */
  public create(entity: T) {
    this.singleton.next(entity);

    const entities: T[] = this.collection.getValue();
    entities.push(entity);
    this.collection.next(entities);
  }

  /**
   * Updates entity in collection
   * and evicts multiChange and singleChange events.
   *
   * @param {T} entity to update
   */
  public update(entity: T) {
    this.singleton.next(entity);

    const entities: T[] = this.collection.getValue();
    for (let i = 0; i < entities.length; i++) {
      if (entities[i]['id'] == entity['id']) {
        entities[i] = entity;
        break;
      }
    }
    this.collection.next(entities);
  }

  /**
   * Evicts singleChange event with given entity.
   *
   * @param {T} entity to find
   */
  public find(entity: T) {
    this.singleton.next(entity);
  }

  /**
   * Evicts multiChange event with given entities
   * and singleChange event if there is only one entity.
   *
   * @param {T[]} entities to query
   */
  public query(entities: T[]) {
    if (entities.length == 1) {
      this.singleton.next(entities[0]);
    } else if (entities.length == 0) {
      this.singleton.next(null);
    }

    this.collection.next(entities);
  }

  /**
   * Deletes entity in collection
   * and evicts multiChange and singleChange events.
   *
   * @param {number} id of the entity to delete
   */
  public delete(id: number) {
    this.singleton.next(null);

    let entities: T[] = this.collection.getValue();
    entities = entities.filter((entity: T) => entity['id'] != id);
    this.collection.next(entities);
  }
}
