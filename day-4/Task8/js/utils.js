export async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("errow while fetching posts");
  }
  const result = await response.json();
  return result;
}

export function debounce(callback, delay) {
  let timer;
  return function () {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback();
    }, delay);
  };
}

export function showToast() {
  const toastDiv = document.getElementById("toast");
  toastDiv.classList.add("show");
  setTimeout(() => {
    toastDiv.classList.remove("show");
  }, 2500);
}

// fetchJson();
