import {
  accordionOnLoad,
  addChangeEventToAccordion,
  addKeyboardtToAccordion,
} from "./components/accordion.js";
import { themeToggle } from "./components/darkMode.js";
import { formValidator } from "./components/form.js";
import { addLightBox } from "./components/lightbox.js";
import { navigationDrawer } from "./components/nav.js";
import {
  addBackToTop,
  addScrollAnimationToIndex,
} from "./components/progress.js";
import { fetchRecentPost } from "./components/recentPost.js";
import {
  fetchPosts,
  filterByCategory,
  searchPost,
} from "./components/services.js";
import { fetchTeam } from "./components/team.js";
import { debounce, showToast } from "./utils.js";

let htmlRoot;
let localTheme;

document.addEventListener("DOMContentLoaded", () => {
  htmlRoot = document.querySelector("html");
  localTheme = localStorage.getItem("theme");
  if (localTheme) {
    htmlRoot.setAttribute("data-theme", localTheme);
  }

  const themeBtn = document.getElementById("theme-btn");
  themeBtn.addEventListener("click", themeToggle);
});

addScrollAnimationToIndex();

addBackToTop();

navigationDrawer();

addLightBox();

const form = document.getElementById("form-container");

if (form) {
  const inputs = document.querySelectorAll("input.input-field");
  const textArea = document.querySelector("textarea.input-field");

  for (const input of inputs) {
    input.addEventListener("blur", () => {
      formValidator.validate(input);
    });
  }
  textArea.addEventListener("blur", () => {
    formValidator.validate(textArea);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formValidator.validateAll(inputs);
    const formBtn = document.getElementById("form-button");
    formBtn.textContent = "loading..";
    setTimeout(() => {
      console.log("submit after 1.5 seconds");
      formBtn.textContent = "Submit";
      form.reset();
      showToast();
      const msgSpan = document.querySelectorAll(".msg-span");
      for (const span of msgSpan) {
        console.log(span);

        span.textContent = "";
      }
    }, 1500);
  });
}

const fictionalSection = document.getElementById("fictional-container");

accordionOnLoad();

addChangeEventToAccordion();

addKeyboardtToAccordion();

if (fictionalSection) {
  fetchPosts();

  const fictionalSearch = document.getElementById("fictional-search");
  const debounceSearch = debounce(searchPost, 300);

  fictionalSearch.addEventListener("input", () => {
    debounceSearch();
  });

  const filterButton = document.getElementById("filter-category");
  filterButton.addEventListener("change", (e) => {
    console.log(e.target.value);
    filterByCategory(e.target.value);
  });

  const fictionalRetryButton = document.getElementById("retry-button");
  fictionalRetryButton.addEventListener("click", () => {
    fetchPosts();
  });
}

const currentPage = window.location.href;
console.log(currentPage);

if (currentPage.includes("/team.html")) {
  console.log("inside team");
  fetchTeam();

  const teamRetryButton = document.getElementById("retry-button");
  teamRetryButton.addEventListener("click", () => {
    fetchTeam();
  });
}

if (
  currentPage.includes("/index.html") ||
  currentPage === "http://127.0.0.1:5500/day-5/"
) {
  fetchRecentPost();

  const recentRetryButton = document.getElementById("retry-button");
  console.log("retry-buton:", recentRetryButton);

  recentRetryButton.addEventListener("click", () => {
    console.log("cliked");

    fetchRecentPost();
  });
}
