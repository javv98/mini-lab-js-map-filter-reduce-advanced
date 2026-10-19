// =============================================================================
// Mini LAB | Map, Filter & Reduce — Avanzado
// =============================================================================

// =============================================================================
// ITERACION 1 — Operaciones basicas con arrays
// =============================================================================

// 1. chunk(array, size)
// Divide un array en sub-arrays de tamaño dado.
// Si el ultimo grupo tiene menos elementos, se incluye tal cual.
//
// Ejemplo:
//   chunk([1, 2, 3, 4, 5], 2) → [[1, 2], [3, 4], [5]]
//   chunk(["a", "b", "c", "d"], 3) → [["a", "b", "c"], ["d"]]
function chunk(array, size) {
  let arrAux = []

  return array.reduce((acc, el, index, arr) => {
    arrAux.push(el)
   if (arrAux.length === size || index === arr.length - 1) {
      acc.push(arrAux)
      arrAux = []
    }
    return acc
  },[])
}

// 2. zip(arr1, arr2)
// Combina dos arrays en pares, elemento por elemento.
// Si los arrays tienen distinto tamaño, se usa la longitud del mas corto.
//
// Ejemplo:
//   zip(["a", "b", "c"], [1, 2, 3]) → [["a", 1], ["b", 2], ["c", 3]]
//   zip([1, 2], ["x", "y", "z"]) → [[1, "x"], [2, "y"]]
function zip(arr1, arr2) {
  let defArr = []
  for (let i = 0; i < arr1.length && i < arr2.length; i++) {
    defArr.push([arr1[i], arr2[i]])
  }
  return defArr
}

// 3. intersection(arr1, arr2)
// Devuelve los elementos comunes entre dos arrays, sin duplicados.
//
// Ejemplo:
//   intersection([1, 2, 3, 4], [3, 4, 5, 6]) → [3, 4]
//   intersection([1, 1, 2, 2], [2, 2, 3, 3]) → [2]
function intersection(arr1, arr2) {
  return arr1.reduce((acc, el) => {
    if (arr2.includes(el) && !(acc.includes(el))) {
      acc.push(el)
    }
    return acc
  },[])
}

// =============================================================================
// ITERACION 2 — Conteo y extraccion
// =============================================================================

// 4. frequencies(array)
// Cuenta las ocurrencias de cada elemento y devuelve un array de objetos
// { value, count } ordenado por count de mayor a menor.
//
// Ejemplo:
//   frequencies(["js", "py", "js", "go", "js", "py"])
//   → [{ value: "js", count: 3 }, { value: "py", count: 2 }, { value: "go", count: 1 }]
function frequencies(array) {
  return array.reduce((acc, el, i, arr) => {
    if (i === arr.indexOf(el)) {
      let count = 0
      for (let element of arr) {
        if (element === el) {
          count += 1
        }
      }
    acc.push({value: el, count: count})
    }
  return acc
  }, [])
}

// 5. pluck(array, path)
// Extrae valores de un array de objetos usando dot notation para acceder
// a propiedades anidadas.
//
// Ejemplo:
//   pluck([{ user: { name: "Ana" } }, { user: { name: "Luis" } }], "user.name")
//   → ["Ana", "Luis"]
//   pluck([{ a: 1 }, { a: 2 }, { a: 3 }], "a") → [1, 2, 3]
function pluck(array, path) {
  let newPath = path.split(".") // ["user", "name"]
  return array.map(obj => { // obj en i = 1 => {user: {name: "Ana"}}
    
    if (path.includes(".")) {
    return obj[newPath[0]][newPath[1]]
    } else {
      return obj[path]
    }
  })
}

// 6. mapValues(obj, fn)
// Aplica una funcion a cada valor de un objeto y devuelve un nuevo objeto
// con las mismas claves pero con los valores transformados.
//
// Ejemplo:
//   mapValues({ a: 1, b: 2, c: 3 }, x => x * 10) → { a: 10, b: 20, c: 30 }
//   mapValues({ name: "ana", city: "madrid" }, s => s.toUpperCase()) → { name: "ANA", city: "MADRID" }
function mapValues(obj, fn) {
  let values = Object.values(obj).map(value => fn(value)) // [10, 20, 30]
  let keys = Object.keys(obj) // ["a", "b", "c"]
  return values.reduce((acc, el, i)=> {
    acc[keys[i]] = el
    return acc
  }, {})
}

// =============================================================================
// ITERACION 3 — Transformaciones
// =============================================================================

// 7. transformKeys(obj, fn)
// Transforma las claves de un objeto aplicando una funcion a cada clave.
// Devuelve un nuevo objeto con las claves transformadas y los mismos valores.
//
// Ejemplo:
//   transformKeys({ firstName: "Ana", lastName: "Garcia" }, key => key.toLowerCase())
//   → { firstname: "Ana", lastname: "Garcia" }
function transformKeys(obj, fn) {
  let values = Object.values(obj)
  let keys = Object.keys(obj).map(value => fn(value))
  return values.reduce((acc, el, i)=> {
    acc[keys[i]] = el
    return acc
  }, {})
}

// 8. getStatistics(numbers)
// Recibe un array de numeros y devuelve un objeto con las siguientes
// propiedades: min, max, sum, average, count.
//
// Ejemplo:
//   getStatistics([2, 4, 6, 8, 10])
//   → { min: 2, max: 10, sum: 30, average: 6, count: 5 }
function getStatistics(numbers) {
  return numbers.reduce((acc, el) => {
    acc.sum += el
    acc.count += 1
      if (el > acc.max) {
        acc.max = el
      } else if (el < acc.min) {
        acc.min = el
      }
    acc.average = acc.sum / acc.count
    return acc
    },{min: numbers[0], max: numbers[0], sum: 0, average: 0, count: 0})
}

// 9. partitionBy(array, fn)
// Divide un array en dos sub-arrays: el primero con los elementos que
// cumplen la condicion (fn devuelve true) y el segundo con los que no.
//
// Ejemplo:
//   partitionBy([1, 2, 3, 4, 5, 6], n => n % 2 === 0)
//   → [[2, 4, 6], [1, 3, 5]]
function partitionBy(array, fn) {
  return array.reduce((acc, el) => {
    if (fn(el) === true) {
      acc[0].push(el)
    } else {
      acc[1].push(el)
    }
    return acc
  }, [[], []])
}

// =============================================================================
// ITERACION 4 — Agrupacion y estructuras
// =============================================================================

// 10. groupBy(array, key)
// Agrupa un array de objetos por el valor de una propiedad.
// Devuelve un objeto donde cada clave es un valor unico de esa propiedad
// y cada valor es un array con los objetos que comparten ese valor.
//
// Ejemplo:
//   groupBy(
//     [
//       { type: "fruta", name: "manzana" },
//       { type: "verdura", name: "zanahoria" },
//       { type: "fruta", name: "pera" }
//     ],
//     "type"
//   )
//   → {
//       fruta: [{ type: "fruta", name: "manzana" }, { type: "fruta", name: "pera" }],
//       verdura: [{ type: "verdura", name: "zanahoria" }]
//     }
function groupBy(array, key) {
  return array.reduce((acc, el, index, arr) => {
    let arrAux = []
    arr.forEach(el2 => {
      if (el[key] === el2[key]) {
        arrAux.push(el2)
      }
    })
    acc[el[key]] = arrAux
    return acc
  }, {})
}

// 11. buildLookupTable(array, key)
// Crea un objeto indexado por el valor de una propiedad dada.
// Cada clave del objeto resultado es el valor de esa propiedad en cada elemento.
//
// Ejemplo:
//   buildLookupTable([{ id: 1, name: "Ana" }, { id: 2, name: "Luis" }], "id")
//   → { 1: { id: 1, name: "Ana" }, 2: { id: 2, name: "Luis" } }
function buildLookupTable(array, key) {
  return array.reduce((acc, el) => {
    acc[el[key]] = el
    return acc
  }, {})
}

// 12. pivot(array)
// Transforma un array de objetos en un objeto de arrays.
// Cada clave del resultado contiene un array con todos los valores
// correspondientes a esa clave en los objetos originales.
//
// Ejemplo:
//   pivot([{ name: "Ana", age: 25 }, { name: "Luis", age: 30 }])
//   → { name: ["Ana", "Luis"], age: [25, 30] }
function pivot(array) {
  return array.reduce ((acc, el, i, arr) => {
    let keys = Object.keys(el) // ["name", "age"]
    let values = Object.values(el) // ["Ana", 25]

    for (let i = 0; i < keys.length; i++) {
      if (!(keys[i] in acc)) {
        acc[keys[i]] = []
        acc[keys[i]].push(values[i])
      } else {
        acc[keys[i]].push(values[i])
      }
    }

    return acc
  }, {})
}

// =============================================================================
// ITERACION 5 — Avanzado (combinando metodos)
// =============================================================================

// 13. flatMap(array, fn)
// Aplica una funcion a cada elemento del array y aplana el resultado un nivel.
// Es equivalente a hacer .map(fn) seguido de .flat() o [].concat(...resultado).
//
// Ejemplo:
//   flatMap([[1, 2], [3, 4]], arr => arr.map(n => n * 2)) → [2, 4, 6, 8]
//   flatMap(["hola mundo", "foo bar"], s => s.split(" ")) → ["hola", "mundo", "foo", "bar"]
function flatMap(array, fn) {
  let result = array.reduce((acc, el, i, arr) => {
    acc.push(fn(el))
    return acc
  }, [])

  let resultFlat = result.flat(Infinity)
  return resultFlat
}

// 14. topN(array, key, n)
// Devuelve los N objetos con mayor valor en la propiedad indicada,
// ordenados de mayor a menor.
//
// Ejemplo:
//   topN(
//     [{ name: "A", score: 80 }, { name: "B", score: 95 }, { name: "C", score: 70 }],
//     "score",
//     2
//   )
//   → [{ name: "B", score: 95 }, { name: "A", score: 80 }]
function topN(array, key, n) {
  return array
  .sort((a, b) => b[key] - a[key])
  .filter((obj, i, arr) => {
    return i < n
  })
}

// 15. summarizeBy(array, groupKey, valueKey)
// Agrupa los elementos por groupKey y suma los valores de valueKey para cada grupo.
// Devuelve un objeto donde cada clave es un valor unico de groupKey
// y cada valor es la suma correspondiente.
//
// Ejemplo:
//   summarizeBy(
//     [
//       { seller: "Ana", amount: 100 },
//       { seller: "Luis", amount: 200 },
//       { seller: "Ana", amount: 150 }
//     ],
//     "seller",
//     "amount"
//   )
//   → { Ana: 250, Luis: 200 }
function summarizeBy(array, groupKey, valueKey) {
  return array.reduce((acc, el, i, arr) => {
    if (!(el[groupKey] in acc)) {
      acc[el[groupKey]] = el[valueKey]
    } else {
      acc[el[groupKey]] += el[valueKey]
    }

    return acc
  }, {})
}
