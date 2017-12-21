import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

/**
 * The main class for working with single and multi reactive updates
 * for collection of elements.
 */
export class EntityUpdater<T> {

  private collection: BehaviorSubject<T[]> = new BehaviorSubject([]);
  private first: BehaviorSubject<T> = new BehaviorSubject(null);

  public multiChange: Observable<T[]> = this.collection.asObservable();
  public singleChange: Observable<T> = this.first.asObservable();

  /**
   * Adds created entity to collection
   * and evicts multiChange and singleChange events.
   *
   * @param {T} entity to create
   */
  public create(entity: T) {
    this.first.next(entity);

    const entities: T[] = this.collection.getValue();
    entities.push(entity);
    this.collection.next(entities);
  }

  /**
   * Updates entity in collection
   * and evicts multiChange and singleChange events.
   *
   * @param {T} entity
   */
  public update(entity: T) {
    this.first.next(entity);

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
   * @param {T} entity
   */
  public findSingle(entity: T) {
    this.first.next(entity);
  }

  /**
   * Evicts multiChange event with given entities
   * and singleChange event if there is only one entity.
   *
   * @param {T[]} entities
   */
  public query(entities: T[]) {
    if (entities.length == 1) {
      this.first.next(entities[0]);
    }
    this.collection.next(entities);
  }

  /**
   * Deletes entity in collection
   * and evicts multiChange and singleChange events.
   *
   * @param {number} id of the entity
   */
  public delete(id: number) {
    this.first.next(null);

    let entities: T[] = this.collection.getValue();
    entities = entities.filter((entity: T) => entity['id'] != id);
    this.collection.next(entities);
  }
}
