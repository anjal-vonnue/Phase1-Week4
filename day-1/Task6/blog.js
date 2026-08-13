let votes = {};

document.addEventListener("DOMContentLoaded", () => {
  const savedHTML = localStorage.getItem("savedHTML");
  const savedVotes = localStorage.getItem("voted");

  if (savedHTML) {
    document.body.innerHTML = savedHTML;
  }

  if (savedVotes) {
    votes = JSON.parse(savedVotes);
  }

  addEventListeners();
  const articleContainer = document.getElementById("blog");

  //// interesction observer

  const articleObserser = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("article-visible");
      }
    });
  });

  articleContainer.querySelectorAll("article").forEach((article) => {
    articleObserser.observe(article);
  });

  ////floating pannel mutation
  const closeBtn = document.getElementById("closeBtn");
  const overlay = document.getElementById("overlay");

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.classList.remove("active");
    }
  });

  const mutationObserver = new MutationObserver((entries) => {
    console.log(entries);

    entries.forEach((entry) => {
      if (entry.type === "childList" && entry.addedNodes.length > 0) {
        entry.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            showFloat("added", `Element Added: ${node.tagName.toLowerCase()}`);
          }

          if (node.matches("article")) {
            articleObserser.observe(node);
          }
        });
      }
    });
  });

  mutationObserver.observe(articleContainer, {
    subtree: true,
    childList: true,
    attributes: true,
  });
});

function showFloat(type, msg) {
  const overlay = document.getElementById("overlay");
  console.log(overlay);

  const heading = document.getElementById("float_heading");
  const p = document.getElementById("float_message");
  console.log(heading);

  overlay.classList.add("active");
  heading.textContent = type;
  p.textContent = msg;
  setTimeout(() => {
    overlay.classList.remove("active");
  }, 1500);
}

function saveState() {
  const bodyContainer = document.querySelector("body");
  localStorage.setItem("savedHTML", bodyContainer.innerHTML);
  localStorage.setItem("voted", JSON.stringify(votes));
}

function addComment(container, text) {
  let div = document.createElement("div");
  div.classList.add("single-reply");
  div.id = `id-${crypto.randomUUID()}`;
  console.log(div.id);

  votes[div.id] = false;

  let p = document.createElement("p");
  p.textContent = text;

  let upvote = document.createElement("button");
  upvote.textContent = "upvote";
  upvote.classList.add("upvote");

  let reply = document.createElement("button");
  reply.textContent = "reply";
  reply.classList.add("reply-button");

  let pInput = document.createElement("p");
  pInput.classList.add("reply-hidden", "submit-p");
  pInput.innerHTML = `<input class="submit" />
                    <button class="submit-button">submit</button>`;

  let nestedDiv = document.createElement("div");
  nestedDiv.classList.add("nested-reply");

  div.appendChild(p);
  div.appendChild(upvote);
  div.appendChild(reply);
  div.appendChild(pInput);
  div.appendChild(nestedDiv);
  return div;
}

function addEventListeners() {
  const replyContainer = document.querySelectorAll(".comment-container");
  console.log(replyContainer);

  replyContainer.forEach((container) => {
    console.log(container);

    container.addEventListener("click", (e) => {
      let commentButton = e.target.classList.contains("comment-button");
      let inputValue = container.querySelector(".comment-input").value.trim();
      let replyButton = e.target.classList.contains("reply-button");
      let submitButton = e.target.classList.contains("submit-button");
      let upVoteButton = e.target.classList.contains("upvote");

      if (commentButton) {
        if (inputValue) {
          const newComment = addComment(container, inputValue);
          container.querySelector(".reply-container").prepend(newComment);
          container.querySelector(".comment-input").value = "";
        }
        saveState();
      }

      if (replyButton) {
        let submitP = e.target
          .closest(".single-reply")
          .querySelector(".submit-p");
        console.log(replyContainer);

        if (submitP.classList.contains("reply-hidden")) {
          submitP.classList.remove("reply-hidden");
          submitP.classList.add("reply-visible");
        } else {
          submitP.classList.remove("reply-visible");
          submitP.classList.add("reply-hidden");
        }

        saveState();
      }

      if (submitButton) {
        console.log("clicked");
        let replyValue = e.target
          .closest(".submit-p")
          .querySelector("input")
          .value.trim();

        if (replyValue) {
          console.log("reply: ", replyValue);

          addReply(e, replyValue);
          e.target.closest(".submit-p").querySelector("input").value = "";
        }
        saveState();
      }

      if (upVoteButton) {
        console.log("upvoted");

        const randomId = e.target.closest(".single-reply").getAttribute("id");
        const keys = Object.keys(votes);
        if (keys.includes(randomId) && votes[randomId] === false) {
          console.log("hello");
          upVotedReply(e, randomId);
          console.log(votes);
        } else {
          const upVotedDiv = document.getElementById(randomId);
          votes[randomId] = false;
          const upVotedBtn = upVotedDiv.querySelector(".upvote");
          upVotedBtn.textContent = "upvote";
          console.log(votes);
        }

        saveState();
      }
    });
  });
}

function upVotedReply(e, randomId) {
  const upVotedDiv = document.getElementById(randomId);
  console.log(upVotedDiv);
  votes[randomId] = true;
  const upVotedBtn = upVotedDiv.querySelector(".upvote");
  console.log(upVotedBtn);
  upVotedBtn.textContent = "upvoted";
}

function addReply(e, text) {
  let nestedReply = e.target
    .closest(".single-reply")
    .querySelector(".nested-reply");

  let newReply = addComment(nestedReply, text);
  nestedReply.prepend(newReply);

  if (e.target.closest(".submit-p").classList.contains("reply-hidden")) {
    e.target.closest(".submit-p").classList.remove("reply-hidden");
    e.target.closest(".submit-p").classList.add("reply-visible");
  } else {
    e.target.closest(".submit-p").classList.remove("reply-visible");
    e.target.closest(".submit-p").classList.add("reply-hidden");
  }
}
