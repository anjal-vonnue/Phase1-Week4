export async function fetchJSON(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("failed to fetch the response");
    }

    const result = response.json();
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}

export function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

export function debounce(fn, delay = 300) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
