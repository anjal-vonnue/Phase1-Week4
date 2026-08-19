import { describe, expect, test } from "vitest";
import { FormValidator, rules } from "./formValidator";
import { accordionFn } from "./accordion";
import { mobileNavFn } from "./mobileNav";
import userEvent from "@testing-library/user-event";

describe("testing form validator", () => {
  document.body.innerHTML = `<form id="reg-form">
  <p id="test">
    <label for="name">Name: </label>
    <input id="first-name" type="text" name="name" />
    <span id="message"></span>
  </p>
  <button id="submit-btn" type="submit">submit form</button>
</form>`;
  const formEl = document.getElementById("reg-form");
  const inputEl = document.getElementById("first-name");
  const spanEl = document.getElementById("message");
  const buttonEl = document.getElementById("submit-btn");
  const formChecker = new FormValidator(formEl, rules);
  test("--- testing error msg", () => {
    formChecker.validateAll(inputEl);

    expect(spanEl.textContent).toContain("error");
  });

  test("--- testing correct msg", () => {
    inputEl.value = "john";
    formChecker.validateAll(inputEl);
    expect(spanEl.textContent).toContain("correct");
  });
});

describe("testing accordion", () => {
  document.body.innerHTML = `<div id="accordion">
                                <header id="header">hellow</header>
                                <p id="panel" class="close" aria-expanded="false">this is anjal.</p>
                            </div>`;

  const headerEl = document.getElementById("header");
  const panelEl = document.getElementById("panel");
  accordionFn(headerEl, panelEl);
  test("--- testing aria expanded", () => {
    headerEl.click();
    // headerEl.click();
    expect(panelEl.getAttribute("aria-expanded")).toBe("true");
  });
});

describe("testing mobile nav", () => {
  document.body.innerHTML = `<header>
                                <div id="drawer" class="close">
                                    <a href="/home">HOME</a>
                                    <a href="/shop">SHOP</a>
                                    <a href="/cart">CART</a>
                                    <a href="/profile">PROFILE</a>
                                </div>
                                <button id="hamburger">HAM</button>
                                <button id="close-btn">X</button>
                            </header>`;

  const drawerEl = document.getElementById("drawer");
  const hamBtn = document.getElementById("hamburger");
  const closeBtn = document.getElementById("close-btn");
  const links = drawerEl.querySelectorAll("a");
  mobileNavFn(drawerEl, hamBtn, closeBtn);
  test("--- hamburger click", () => {
    hamBtn.click();
    expect(drawerEl.classList).toContain("open");
  });

  test("--- focus trap", async () => {
    const user = userEvent.setup();
    hamBtn.click();
    expect(drawerEl.classList).toContain("open");

    await user.tab();
    expect(document.activeElement).toBe(links[0]);
    await user.tab();
    expect(document.activeElement).toBe(links[1]);
  });
});
