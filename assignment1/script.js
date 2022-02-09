class Utils {
  isNull = (value) => {
    // write logic to find whether value is null
    return value === null;
  };

  isUndefined = (value) => {
    // write logic to find whether value is undefined
    return value === undefined;
  };

  isNumber = (value) => {
    // write logic to find whether value is number
    return typeof(value) === "number" && !isNaN(value);
  };

  isString = (value) => {
    return typeof(value) === "string"
  };

  isBoolean = (value) => {
    return typeof(value) === "boolean"
  };

  isObject = (value) => {
    return typeof(value) === "object" && !this.isNull(value)
  };

  isArray = (value) => {
    // write logic to find whether value is an Array
    return Array.isArray(value);
  };

  isTruthy = (value) => {
    // Write logic to find whether value is truthy
    if(value)
      return true;

    return false;
  };

  isFalsy = (value) => {
    // Write logic to find whether value is falsy
    return !this.isTruthy(value);
  };

  isFunction = (value) => {
    return typeof value === "function";
  };

  keys = (value) => {
    /**
     * Write logic to only extract keys from an object and create an array of keys
     * value: {'animal': 'lion', 'age': 6}
     * output: ['animal', 'age']
     */
    
    return Object.keys(value);
  };

  values = (value) => {
    /**
     * Write logic to only extract values from an object and create an array of values
     * value: {'animal': 'lion', 'age': 6}
     * output: ['lion', 6]
     */
     return Object.values(value);
  };

  size = (value) => {
    /**
     * Find the size of value
     * value: array
     */

    return value.length;
  };

  filter = (collection, predicate) => {
    /**
     * collection: array
     * predicate: function
     * usage: filter([1,2,3,4], (item) => { return item !== 2})
     */

    if (!this.isArray(collection)) {
      return [];
    }

    if (!this.isFunction(predicate)) {
      return collection;
    }

    const result = [];
    for (const item of collection) {
      const truthy = predicate(item);

      if (truthy) {
        result.push(item);
      }
    }    
    return this.size(result);
  };
}

async function fetchDefinition() {
  /**
   * Write code to make an api call to get json
   * URL: https://raw.githubusercontent.com/karthik-hr/js-utils/master/definition.json;
   */

  let response = await fetch('https://raw.githubusercontent.com/karthik-hr/js-utils/master/definition.json');
  let data = await response.json();

  return data.data;
}

function findStats(definition) {
  const instance = new Utils();

  const stats = {
    numberOfItems: 0,
    null: 0,
    undefined: 0,
    numbers: 0,
    strings: 0,
    boolean: 0,
    objects: 0,
    array: 0,
    truthy: 0,
    falsy: 0,
  };

  /**
   * Write loop here to update stats
   *
   *
   */
  stats.numberOfItems = instance.size(definition);

  for(let i= 0; i < stats.numberOfItems; i++){
    let data = definition[i];

    let coll = instance.values(data);

    stats.null += instance.filter(coll, instance.isNull);
    stats.undefined += instance.filter(coll, instance.isUndefined);
    stats.numbers += instance.filter(coll, instance.isNumber);
    stats.strings += instance.filter(coll, instance.isString);
    stats.boolean += instance.filter(coll, instance.isBoolean);
    stats.objects += instance.filter(coll, instance.isObject);
    stats.array += instance.filter(coll, instance.isArray);
    stats.truthy += instance.filter(coll, instance.isTruthy);
    stats.falsy += instance.filter(coll, instance.isFalsy);
  }

  return stats;
}

function render(stats) {
  const items = Object.keys(stats);
  const ul = document.createElement("ul");
  for (const item of items) {
    const li = document.createElement("li");
    li.innerHTML = `${item}: ${stats[item]}`;
    ul.appendChild(li);
  }
  const root = document.getElementById("stats");
  if (root) {
    root.innerHTML = "";
    root.append(ul);
  }
}

async function main() {
  const definition = await fetchDefinition();
  // console.log(definition);

  const stats = findStats(definition);
  render(stats);
}

main();
