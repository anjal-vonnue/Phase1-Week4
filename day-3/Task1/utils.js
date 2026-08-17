/// from week 3

let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
let numbers = [1, 2, 3, 4, 5];

export function chunk(arr, size) {
  if (size <= 0) {
    throw new Error("size must be greater than 0");
  }
  const chunkedArray = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArray.push(arr.slice(i, i + size));
  }
  return chunkedArray;
}

const letterChunks = chunk(letters, 2);

export function zip(...arrays) {
  const length = arrays[0].length;

  return arrays[0].map((e, i) => arrays.map((arr) => arr[i]));
}
const zippedArr = zip(letterChunks, numbers);
console.log("zipped Arr", zippedArr);

export const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 9 },
  { name: "bananas", type: "fruit", quantity: 5 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 12 },
  { name: "fish", type: "meat", quantity: 22 },
];

export function checkStock(obj) {
  return obj.quantity < 6 ? "restock" : "sufficient";
}

export function groupBy(arr, keyFn) {
  if (!keyFn) {
    throw new Error("there is no key function");
  }
  const newArr = {};
  arr.forEach((element) => {
    let key = keyFn(element);
    if (!newArr[key]) newArr[key] = [];
    newArr[key].push(element);
  });

  return newArr;
}
const result = groupBy(inventory, checkStock);

console.log(result);

// from week 4

export function pipe(...fns) {
  return function (num) {
    // console.log("num in pipe: ", num);

    let result = num;
    fns.forEach((fn) => {
      if (!fn) {
        throw new Error("function cann't be null");
      }
      //   console.log("result before: ", result);
      result = fn(result);
      //   console.log("result after: ", result);
    });
    return result;
  };
}

export function double(num) {
  return num * 2;
}

export function addOne(num) {
  return num + 1;
}

console.log("====== PIPE ======");
console.log(pipe(double, addOne)(5));
console.log(pipe(double, addOne, double, addOne)(5));
console.log(pipe(addOne, addOne, double, double)(10));

export function compose(...fns) {
  return function (num) {
    let result = num;
    for (let i = fns.length - 1; i >= 0; i--) {
      if (!fns[i]) {
        throw new Error("function can't be null");
      }
      //   console.log("result before: ", result);
      result = fns[i](result);
      //   console.log("result after: ", result);
    }

    return result;
  };
}

console.log("====== COMPOSE ======");
console.log(compose(double, addOne)(5));
console.log(compose(double, addOne, double, addOne)(5));
console.log(compose(addOne, addOne, double, double)(10));

export function curry(fn) {
  if (!fn) {
    throw new Error("function can be null");
  }
  return function (a) {
    return function (b) {
      return function (c) {
        return fn(a, b, c);
      };
    };
  };
}

console.log("====== CURRY ======");
export const addFn = (a, b, c) => a + b + c;
console.log(curry(addFn)(1)(2)(3));
console.log(curry(addFn)(5)(5)(5));
console.log(curry(addFn)(10)(11)(5));

console.log("====== PARTIAL ======");

export function partial(fn, ...presentArgs) {
  if (!fn) {
    throw new Error("funtion can't be null");
  }
  console.log("present args: ", presentArgs);

  return function (...remainingArgs) {
    console.log("remaining args: ", remainingArgs);
    return fn(...presentArgs, ...remainingArgs);
  };
}

const firstPartial = partial(addFn, 3);
console.log(firstPartial(4, 3));

const secondPartial = partial(addFn, 1, 1);
console.log(secondPartial(1, 3));

const thirdPartial = partial(addFn);
console.log(thirdPartial(1, 2, 3));

console.log("=====");
zip([1, 2, 3], ["a"]);
