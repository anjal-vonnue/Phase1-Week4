//link: https://sayhitosumit.medium.com/what-you-need-to-know-about-pipe-and-compose-function-in-javascript-241b00df7e9a

function pipe(...fns) {
  return function (num) {
    // console.log("num in pipe: ", num);

    let result = num;
    fns.forEach((fn) => {
      //   console.log("result before: ", result);
      result = fn(result);
      //   console.log("result after: ", result);
    });
    return result;
  };
}

function double(num) {
  return num * 2;
}

function addOne(num) {
  return num + 1;
}

console.log("====== PIPE ======");
console.log(pipe(double, addOne)(5));
console.log(pipe(double, addOne, double, addOne)(5));
console.log(pipe(addOne, addOne, double, double)(10));

function compose(...fns) {
  return function (num) {
    let result = num;
    for (let i = fns.length - 1; i >= 0; i--) {
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

function curry(fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return fn(a, b, c);
      };
    };
  };
}

console.log("====== CURRY ======");
const addFn = (a, b, c) => a + b + c;
console.log(curry(addFn)(1)(2)(3));
console.log(curry(addFn)(5)(5)(5));
console.log(curry(addFn)(10)(11)(5));

console.log("====== PARTIAL ======");

function partial(fn, ...presentArgs) {
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
