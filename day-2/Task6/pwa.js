//link: https://www.youtube.com/watch?v=mf3xYjK9kWI

const installBtn = document.getElementById("install-btn");
let defferdPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  defferdPrompt = e;
  console.log(defferdPrompt);
  installBtn.hidden = false;
});

installBtn.addEventListener("click", async (e) => {
  if (!defferdPrompt) {
    return;
  }

  defferdPrompt.prompt();

  const choice = await defferdPrompt.userChoice;
  console.log(choice.outcome);

  installBtn.hidden = true;
});
