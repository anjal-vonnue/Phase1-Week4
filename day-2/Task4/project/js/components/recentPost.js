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

export async function fetchRecentPost() {
  try {
    showError(false);
    showSkeleton(true);
    const post = await fetchJson("https://jsonplaceholder.typicode.com/posts");

    const threePost = post.slice(0, 3);

    const recentPostContainer = document.getElementById(
      "recent-post-container",
    );

    showSkeleton(false);

    threePost.forEach((post, i) => {
      const article = document.createElement("article");
      article.classList.add("animation-task");
      article.innerHTML = `<header>
                  <h3>Post: ${i + 1}</h3>
                </header>
                <p>
                  ${post.title}
                </p>
                <p>
                  ${post.body}
                </p>`;
      recentPostContainer.appendChild(article);
    });
  } catch (error) {
    console.log("error while fetching recent posts", error);
    showSkeleton(false);
    showError(true, "errow while fetching recent posts");
  }
}
