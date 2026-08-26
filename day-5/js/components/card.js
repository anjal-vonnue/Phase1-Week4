export function Card({ title, description, createdAt, status, children = [] }) {
  const article = document.createElement("article");
  article.className = "task";

  // card content
  const cardContent = document.createElement("div");
  cardContent.className = "task-content";

  const cardTitle = document.createElement("h4");
  cardTitle.className = "task-title";
  cardTitle.textContent = title;

  const cardDescription = document.createElement("h5");
  cardDescription.className = "task-desc";
  cardDescription.textContent = description;

  const createdAtP = document.createElement("p");
  createdAtP.textContent = `Created at: ${createdAt}`;

  const statusP = document.createElement("p");
  statusP.textContent = `status: ${status}`;

  cardContent.appendChild(cardTitle);
  cardContent.appendChild(cardDescription);
  cardContent.appendChild(createdAtP);
  cardContent.appendChild(statusP);

  //buttons
  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "task-buttons";

  children.forEach((child) => {
    buttonsDiv.appendChild(child);
  });

  article.appendChild(cardContent);
  article.appendChild(buttonsDiv);

  return article;
}
