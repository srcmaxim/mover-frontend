import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

/**
 * The main class for working with multi casting
 * for collection of elements.
 */
export class EmbeddedCast<T> {

  private collection: BehaviorSubject<T[]> = new BehaviorSubject([]);

  public multiCast: Observable<T[]> = this.collection.asObservable();

  /**
   * Adds created entity to collection
   * and evicts multiChange event.
   *
   * @param {T} entity to create
   */
  public create(entity: T): Observable<T[]> {
    const entities: T[] = this.collection.getValue();
    entities.push(entity);
    this.collection.next(entities);
    return this.multiCast;
  }

  /**
   * Updates entity in collection
   * and evicts multiChange event.
   *
   * @param {T} entity to update
   */
  public update(index: number, entity: T): Observable<T[]> {
    const entities: T[] = this.collection.getValue();
    entities[index] = entity;
    this.collection.next(entities);
    return this.multiCast;
  }

  /**
   * Evicts multiChange event with given entities.
   *
   * @param {T[]} entities to query
   */
  public query(entities: T[]): Observable<T[]> {
    this.collection.next(entities);
    return this.multiCast;
  }

  /**
   * Deletes entity in collection
   * and evicts multiChange event.
   *
   * @param {number} index of the entity to delete
   */
  public delete(index: number): Observable<T[]> {
    let entities: T[] = this.collection.getValue();
    entities.splice(index, 1);
    this.collection.next(entities);
    return this.multiCast;
  }
}
