export function Card({ title, description, children = [] }) {
  const article = document.createElement("article");

  const titleEl = document.createElement("h3");
  titleEl.className = "card-title";
  titleEl.textContent = title;

  const pEl = document.createElement("p");
  pEl.className = "card-desc";
  pEl.textContent = description;

  article.appendChild(titleEl);
  article.appendChild(pEl);

  children.forEach((child) => {
    article.appendChild(child);
  });

  return article;
}
