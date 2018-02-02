/**
 * LocalStorage for storing object values
 */
export function LocalStorage(
  target: Object, // The prototype of the class
  decoratedPropertyName: string // The name of the property
) {

  // get and set methods
  Object.defineProperty(target, decoratedPropertyName, {
    get: function () {
      const stringValue = localStorage.getItem(decoratedPropertyName);
      return stringValue? JSON.parse(stringValue): null;
    },
    set: function (objectValue) {
      const stringValue = JSON.stringify(objectValue);
      localStorage.setItem(decoratedPropertyName, stringValue);
    }
  });
}
