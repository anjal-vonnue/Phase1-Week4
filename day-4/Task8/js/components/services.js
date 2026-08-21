import { fetchJson } from "../utils.js";

function showSkeleton(visible) {
  const skeletonContainer = document.getElementById("skeleton-services");
  visible
    ? (skeletonContainer.style.display = "block")
    : (skeletonContainer.style.display = "none");
}

function showError(visible, error = "") {
  const errorContainer = document.getElementById("error-services");
  const errorText = document.getElementById("error-text");

  if (visible) {
    errorContainer.style.display = "block";
    errorText.textContent = error;
  } else {
    errorContainer.style.display = "none";
    errorText.textContent = error;
  }
}

export async function fetchPosts() {
  try {
    showError(false);
    showSkeleton(true);
    console.log("inside fetch posts");

    const result = await fetchJson(
      "https://jsonplaceholder.typicode.com/posts",
    );

    const posts = result.slice(0, 20);
    const fictionalServices = document.getElementById("fictional-services");

    posts.forEach((post) => {
      const div = document.createElement("div");
      div.classList.add("fictional-cards");
      post.id % 2 == 0
        ? div.classList.add("art")
        : div.classList.add("science");
      div.innerHTML = `<p>${post.title}</p>
                       <p>${post.body}</p>
                       <p>${post.id % 2 == 0 ? "art" : "science"}</p>`;
      fictionalServices.appendChild(div);
    });
  } catch (error) {
    showSkeleton(false);
    console.log("error while fetching posts");
    showError(true, error);
  } finally {
    showSkeleton(false);
  }
}

export function filterPosts(searchInput) {
  console.log("inside filterPosts");

  const fictionalCards = document.querySelectorAll(".fictional-cards");
  fictionalCards.forEach((card) => {
    // console.log("include: ", card);

    if (card.textContent.includes(searchInput)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

export function searchPost() {
  console.log("clicked searhawe");

  const fictionalInput = document
    .getElementById("fictional-search")
    .value.trim();

  if (fictionalInput) {
    console.log("above filterPosts");

    filterPosts(fictionalInput);
  } else {
    console.log("inside else of main fictional");

    const fictionalCards = document.querySelectorAll(".fictional-cards");
    fictionalCards.forEach((card) => {
      card.style.display = "block";
    });
  }
}

export function filterByCategory(category) {
  const fictionalCards = document.querySelectorAll(".fictional-cards");
  fictionalCards.forEach((card) => {
    if (category.trim()) {
      if (card.classList.contains(category)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    } else {
      card.style.display = "block";
    }
  });
}
