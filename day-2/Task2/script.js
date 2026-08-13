const codeText = document.getElementById("code").textContent;
const copyBtn = document.getElementById("copy-btn");

async function copyCode() {
  try {
    console.log(codeText);
    await navigator.clipboard.writeText(codeText);
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy Code";
    }, 2000);
  } catch (error) {
    copyBtn.textContent = "unable to copy";
    setTimeout(() => {
      copyBtn.textContent = "Copy Code";
    }, 2000);
  }
}

async function requestNotification() {
  if ("Notification" in window) {
    console.log("notifications are supported");
    const permission = await Notification.requestPermission();
    console.log(permission);
    if (permission === "granted") {
      console.log("permission granted");
    } else {
      console.log("permission denied");
    }
  }
}

requestNotification();

function showNotification(title, body) {
  new Notification(title, { body: body });
}

const form = document.getElementById("form");

form.addEventListener("submit", () => {
  event.preventDefault();

  if ("Notification" in window && Notification.permission === "granted") {
    showNotification("Success", "form submitted successfully");
    locationInput.value = "";
  }
});

const locationInput = document.getElementById("location-input");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFn, errorFn);
  } else {
    showNotification("error", "Geolocation is not supported by this browser");
  }
}

function successFn(position) {
  locationInput.value = `lat: ${position.coords.latitude} long: ${position.coords.longitude}`;
}

function errorFn() {
  showNotification("sorry", "no position availbale");
}

getLocation();

const shareData = {
  title: "Clipboard Demonstration",
  text: "clipboard clipboard clipborad",
  url: window.location.href,
};

const shareBtn = document.getElementById("share-btn");

async function sharePage() {
  console.log("navigator: ", navigator.share);

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      shareBtn.textContent = "shared";
      setTimeout(() => {
        shareBtn.textContent = "Share";
      }, 2000);
    } catch (error) {
      showNotification("error", "share cancelled");
    }
  } else {
    try {
      await navigator.clipboard.writeText(shareData.url);
      showNotification(
        "substitue",
        "share doesn't work therefore page link copied",
      );
    } catch (error) {
      showNotification("sorry", "you are unlucky");
    }
  }
}
