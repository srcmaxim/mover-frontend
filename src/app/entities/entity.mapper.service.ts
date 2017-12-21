/**
 * Interface for creating a mapper.
 * Works as a mediator for mapping REST API entity
 * to Angular entity and vice versa.
 */
export interface EntityMapper {
  /**
   * Maps REST API entity to Angular entity
   *
   * @param value REST API entity
   * @returns {any} Angular entity
   */
  fromServiceToEntity(value: any): any;

  /**
   * Maps Angular entity to REST API entity
   *
   * @param value Angular entity
   * @returns {any} REST API entity
   */
  fromEntityToService(value: any): any;
}
